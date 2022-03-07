package main

import (
	"context"
	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"io/ioutil"
	"log"
	"net"
	"os"
	authpb "program/auth/api/gen/v1"
	"program/auth/auth/dao"
	"program/auth/auth/wechat"
	"program/auth/token"
	"time"

	"program/auth/auth"
)

func main() {
	logger, err := newZapLogger()
	if err != nil {
		log.Fatalf("connot create logger: %v", err)
	}
	lis, err := net.Listen("tcp", ":8081")
	if err != nil {
		logger.Fatal("connot listen", zap.Error(err))
	}

	c := context.Background()
	mongoClient, err := mongo.Connect(c, options.Client().ApplyURI("mongodb://admin:123456@localhost:27017/?authSource=admin&readPreference=primary&ssl=false"))
	if err != nil {
		logger.Fatal("cannot connect mongodb", zap.Error(err))
	}

	priFile, err := os.Open("auth/private.key")

	if err != nil {
		logger.Fatal("cannot open the file")
	}
	pkbytes, err := ioutil.ReadAll(priFile)
	if err != nil {
		logger.Fatal("cannot read private key")
	}

	privKey, err := jwt.ParseRSAPrivateKeyFromPEM(pkbytes)
	if err != nil {
		logger.Fatal("cannot parse private key", zap.Error(err))
	}

	s := grpc.NewServer()
	authpb.RegisterAuthServiceServer(s, &auth.Service{
		OpenIDResolver: &wechat.Service{
			AppID:     "wxac04b62e76fc56fe",
			AppSecret: "12c16bd4cd42242bfbbaa13273461f50",
		},
		Mongo:          dao.NewMongo(mongoClient.Database("coolcar")),
		Logger:         logger,
		TokenExpire:    2 * time.Hour,
		TokenGenerator: token.NewJWTTokenGEn("coolcar/suth", privKey),
	})

	err = s.Serve(lis)
	logger.Fatal("cannor server", zap.Error(err))
}

func newZapLogger() (*zap.Logger, error) {
	cfg := zap.NewDevelopmentConfig()
	cfg.EncoderConfig.TimeKey = ""
	return cfg.Build()

}
