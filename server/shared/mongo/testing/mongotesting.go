package testing

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"testing"
	"time"
)

const (
	image         = "mongo"
	containerport = "27017/tcp"
)

var mongoURI string

const defaultMongoURI = "mongodb://localhost:27017"

func RunWithMongoInDocker(m *testing.M) int {
	c, err := client.NewClientWithOpts()
	if err != nil {
		panic(err)
	}
	ctx := context.Background()

	create, err := c.ContainerCreate(ctx, &container.Config{
		Image: image,
		ExposedPorts: nat.PortSet{
			containerport: {},
		},
	}, &container.HostConfig{
		PortBindings: nat.PortMap{
			containerport: []nat.PortBinding{
				{
					HostIP:   "127.0.0.1",
					HostPort: "0",
				},
			},
		},
	}, nil, nil, "")
	if err != nil {
		fmt.Println(err.Error())
		panic("222")
	}
	defer func() {
		err = c.ContainerRemove(ctx, create.ID, types.ContainerRemoveOptions{
			Force: true,
		})
		if err != nil {
			panic(err)
		}
	}()
	containerID := create.ID
	err = c.ContainerStart(ctx, containerID, types.ContainerStartOptions{})
	if err != nil {
		panic("123")
	}

	fmt.Println("container started")
	time.Sleep(2 * time.Second)
	inspect, err := c.ContainerInspect(ctx, containerID)
	if err != nil {
		panic(err)
	}

	hostPort := inspect.NetworkSettings.Ports[containerport][0]
	mongoURI = fmt.Sprintf("mongodb://%s:%s", hostPort.HostIP, hostPort.HostPort)

	return m.Run()
}

func NewClient(c context.Context) (*mongo.Client, error) {
	if mongoURI == "" {
		return nil, fmt.Errorf("mong uri not set,please run RunWithMongoInDocker in TestMain")
	}
	return mongo.Connect(c, options.Client().ApplyURI(mongoURI+"/?authSource=admin&readPreference=primary&ssl=false"))
}

func NewDefaultClient(c context.Context) (*mongo.Client, error) {
	return mongo.Connect(c, options.Client().ApplyURI(defaultMongoURI+"/?authSource=admin&readPreference=primary&ssl=false"))
}
func SetupIndexes(c context.Context, d *mongo.Database) error {

	_, err := d.Collection("account1").Indexes().CreateOne(c, mongo.IndexModel{
		Keys: bson.D{
			{Key: "open_id", Value: 1},
		},
		Options: options.Index().SetUnique(true),
	})
	if err != nil {
		return err
	}
	_, err = d.Collection("trip").Indexes().CreateOne(c, mongo.IndexModel{
		Keys: bson.D{
			{Key: "trip.accountid", Value: 1},
			{Key: "trip.status", Value: 1},
		},
		Options: options.Index().SetUnique(true).SetPartialFilterExpression(bson.M{
			"trip.status": 1,
		}),
	})
	return err
}
