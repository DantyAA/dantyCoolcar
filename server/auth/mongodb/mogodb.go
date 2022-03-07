package main

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// 设置客户端连接配置
	clientOptions := options.Client().ApplyURI("mongodb://admin:951236@114.55.55.221:27017/?authSource=admin&readPreference=primary&ssl=false")

	// 连接到MongoDB
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	col := client.Database("coolcar").Collection("account")
	insterRows(context.Background(), col)
}

func insterRows(c context.Context, col *mongo.Collection) {
	res, err := col.InsertMany(context.Background(), []interface{}{
		bson.M{
			"open_id": "123",
		},
		bson.M{
			"opin_id": "456",
		},
	})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(res)
	findRows(c, col)
}

func findRows(c context.Context, col *mongo.Collection) {
	cur, err := col.Find(c, bson.M{
		"open_id": "123",
	})
	if err != nil {
		panic(err)
	}
	for cur.Next(c) {
		var row struct {
			ID     primitive.ObjectID `bson:"_id"`
			OpenID string             `bson:"open_id"`
		}
		err := cur.Decode(&row)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%+v\n", row)
	}

}
