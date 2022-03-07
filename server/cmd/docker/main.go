package main

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"time"
)

func main() {
	c, err := client.NewClientWithOpts()
	if err != nil {
		panic(err)
	}
	ctx := context.Background()

	create, err := c.ContainerCreate(ctx, &container.Config{
		Image: "mongo",
		ExposedPorts: nat.PortSet{
			"27017/tcp": {},
		},
	}, &container.HostConfig{
		PortBindings: nat.PortMap{
			"27017/tcp": []nat.PortBinding{
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

	err = c.ContainerStart(ctx, create.ID, types.ContainerStartOptions{})
	if err != nil {
		panic("123")
	}

	fmt.Println("container started")
	time.Sleep(10 * time.Second)
	inspect, err := c.ContainerInspect(ctx, create.ID)
	if err != nil {
		panic(err)
	}
	fmt.Printf("listening at %+v\n", inspect.NetworkSettings.Ports["27017/tcp"][0])
	fmt.Println("killing container")
	err = c.ContainerRemove(ctx, create.ID, types.ContainerRemoveOptions{
		Force: true,
	})
	if err != nil {
		panic(err)
	}
}
