package server

import (
	"fmt"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"net"
	"program/shared/auth"
)

type GRPCConfig struct {
	Name              string
	Addr              string
	AuthPubilcKeyFile string
	RegisterFunc      func(server *grpc.Server)
	Logger            *zap.Logger
}

func RunGRPCServer(c *GRPCConfig) error {
	nameField := zap.String("name", c.Name)
	addr := c.Addr
	fmt.Println(addr)
	lis, err := net.Listen("tcp", c.Addr)
	if err != nil {
		c.Logger.Fatal("connot listen", nameField, zap.Error(err))
	}

	var opts []grpc.ServerOption
	if c.AuthPubilcKeyFile != "" {
		in, err := auth.Interceptor("shared/auth/public.key")
		if err != nil {
			c.Logger.Fatal("cannot create auth interceptor", nameField, zap.Error(err))
		}
		opts = append(opts, grpc.UnaryInterceptor(in))
	}

	s := grpc.NewServer(opts...)
	c.RegisterFunc(s)

	c.Logger.Info("sever started", nameField, zap.String("addr", c.Addr))
	return s.Serve(lis)
}
