package main

import (
	"context"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"google.golang.org/grpc"
	"log"
	"net/http"
	authpb "program/auth/api/gen/v1"
	"program/shared/server"
)

func main() {
	lg, err := server.NewZapLogger()
	if err != nil {
		log.Fatalf("cannot creat zap logger : %v", err)
	}
	c := context.Background()
	c, cancel := context.WithCancel(c)
	defer cancel()
	mux := runtime.NewServeMux(runtime.WithMarshalerOption(
		runtime.MIMEWildcard, &runtime.JSONPb{
			OrigName:    true,
			EnumsAsInts: true,
		},
	))

	serverConfig := []struct {
		name         string
		addr         string
		registerFunc func(ctx context.Context, mux *runtime.ServeMux, endpoint string, opts []grpc.DialOption) (err error)
	}{
		{
			name:         "auth",
			addr:         "localhost:8081",
			registerFunc: authpb.RegisterAuthServiceHandlerFromEndpoint,
		},
		{
			name:         "rental",
			addr:         "localhost:8082",
			registerFunc: authpb.RegisterAuthServiceHandlerFromEndpoint,
		},
	}

	for _, s := range serverConfig {
		err := s.registerFunc(
			c, mux, s.addr, []grpc.DialOption{grpc.WithInsecure()})
		if err != nil {
			lg.Sugar().Fatalf("cannot register auth service : %v", s.name, err)
		}
	}
	addr := ":8080"
	lg.Sugar().Infof("grpc gateway start at %s", addr)
	lg.Sugar().Fatal(http.ListenAndServe(addr, mux))

}
