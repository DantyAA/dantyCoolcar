package auth

import (
	"context"
	"crypto/rsa"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"io/ioutil"
	"os"
	"program/shared/auth/token"
	"program/shared/id"
	"strings"
)

const (
	authorizationHeader = "authorization"
	bearerPrefix        = "Bearer "
)

type tokenVerifier interface {
	Verify(token string) (string, error)
}

type interceptor struct {
	publicKey *rsa.PublicKey
	verrifier tokenVerifier
}

//blocker

func Interceptor(publicKeyfile string) (grpc.UnaryServerInterceptor, error) {
	f, err := os.Open(publicKeyfile)
	if err != nil {
		return nil, fmt.Errorf("cannot open public key file: %v", err)
	}
	b, err := ioutil.ReadAll(f)

	pubKey, err := jwt.ParseRSAPublicKeyFromPEM(b)
	if err != nil {
		return nil, fmt.Errorf("connot parse public key:%v", err)
	}
	i := &interceptor{
		publicKey: pubKey,
		verrifier: &token.JWTTokenVerifier{
			PublicKey: pubKey,
		},
	}
	return i.HundleReq, nil
}

func (i *interceptor) HundleReq(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
	tkn, err := tokenFromContext(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Unimplemented, "老子不服务你")
	}

	aid, err := i.verrifier.Verify(tkn)

	if err != nil {
		return nil, status.Errorf(codes.Unimplemented, "token not valid: %v", err)
	}

	return handler(ContextWithAccountID(ctx, id.AccountID(aid)), req)
}

func tokenFromContext(c context.Context) (string, error) {
	Unimplemented := status.Error(codes.Unimplemented, "error")
	m, ok := metadata.FromIncomingContext(c)
	if !ok {
		return "", Unimplemented
	}
	tkn := ""
	for _, v := range m[authorizationHeader] {
		if strings.HasPrefix(v, bearerPrefix) {
			tkn = v[len(bearerPrefix):]
		}
	}
	if tkn == "" {
		return "", Unimplemented
	}
	return tkn, nil
}

type accountIDKey struct {
}

func ContextWithAccountID(c context.Context, aid id.AccountID) context.Context {
	return context.WithValue(c, accountIDKey{}, aid)
}

func AccountIDFromContext(c context.Context) (id.AccountID, error) {
	v := c.Value(accountIDKey{})
	aid, ok := v.(id.AccountID)
	if !ok {
		return "", status.Errorf(codes.Unauthenticated, "")
	}

	return aid, nil
}
