package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"log"
	trippb "program/proto/gen/go"
)

func main(){
	log.SetFlags(log.Lshortfile)
	conn ,err := grpc.Dial("localhost:8081",grpc.WithInsecure())
	if err != nil{
		log.Fatalf("connot connect server: %v", err)
	}
	tsclient :=  trippb.NewTripServiceClient(conn)
	r,err := tsclient.GetTrip(context.Background(),&trippb.GetTripRequest{
		Id:"trip456",
	})
	if err != nil{
		log.Fatalf("cannot call GetTrip: %v",err)
	}
	fmt.Println(r)
}
