package main

import (
	"context"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/encoding/protojson"
	"log"
	"net"
	"net/http"
	trippb "program/proto/gen/go"
	trip "program/tripservice"
)

func main(){
	log.SetFlags(log.Lshortfile)
	go startGRPCGAtway()
	lis, err := net.Listen("tcp",":8081")
	if err != nil{
		log.Fatalf("faild to listen: %v", err)
	}

	s :=grpc.NewServer()
	trippb.RegisterTripServiceServer(s,&trip.Service{})
	log.Fatal(s.Serve(lis))

}

func startGRPCGAtway()  {
	c := context.Background()
	c ,cancel := context.WithCancel(c)
	defer cancel()

	mux := runtime.NewServeMux(runtime.WithMarshalerOption(
		runtime.MIMEWildcard,&runtime.JSONPb{
			MarshalOptions: protojson.MarshalOptions{
				UseEnumNumbers: true,
				UseProtoNames: true,
			},
		},
		))
	err := trippb.RegisterTripServiceHandlerFromEndpoint(
		c,
		//mux: multiplexer
		mux,
		":8081",
		[] grpc.DialOption{grpc.WithInsecure()},
	)
	if err != nil {
		log.Fatalf("connnot start grpc gatway:%v",err)
	}

	err = http.ListenAndServe(":8080", mux)
	if err != nil {
		log.Fatalf("connnot listen grpc gatway:%v",err)
	}
}