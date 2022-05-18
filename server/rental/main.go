package main

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"log"
	rentalpb "program/rental/api/gen/v1"
	"program/rental/trip"
	"program/rental/trip/client/car"
	"program/rental/trip/client/poi"
	"program/rental/trip/client/profile"
	"program/rental/trip/dao"
	"program/shared/server"
)

func main() {
	logger, err := server.NewZapLogger()
	if err != nil {
		log.Fatalf("connot create logger: %v", err)
	}

	c := context.Background()
	mongoClient, err := mongo.Connect(c, options.Client().ApplyURI("mongodb://admin:admin@localhost:27017/?authSource=admin&readPreference=primary&ssl=false"))
	if err != nil {
		logger.Fatal("cannot connect mongodb", zap.Error(err))
	}

	logger.Sugar().Fatal(server.RunGRPCServer(&server.GRPCConfig{
		Name:              "rental",
		Addr:              ":8082",
		AuthPubilcKeyFile: "shared/auth/public.key",
		Logger:            logger,
		RegisterFunc: func(s *grpc.Server) {
			rentalpb.RegisterTripServiceServer(s, &trip.Service{
				CarManager:     &car.Manger{},
				ProfileManager: &profile.Manager{},
				POIManager:     &poi.Manager{},
				Mongo:          dao.NewMongo(mongoClient.Database("coolcar")),
				Logger:         logger,
			})
		},
	}))
}
