package token

import (
	"crypto/rsa"
	"github.com/dgrijalva/jwt-go"
	"time"
)

type JWTTokenGen struct {
	privatekey *rsa.PrivateKey
	issuer     string
	nowFunc    time.Time
}

func NewJWTTokenGEn(issure string, privatekey *rsa.PrivateKey) *JWTTokenGen {
	return &JWTTokenGen{
		issuer:     issure,
		nowFunc:    time.Now(),
		privatekey: privatekey,
	}
}

func (t *JWTTokenGen) GenerateToken(accountID string, expire time.Duration) (string, error) {
	now := t.nowFunc.Unix()
	tkn := jwt.NewWithClaims(jwt.SigningMethodRS512, jwt.StandardClaims{
		Issuer:    t.issuer,
		IssuedAt:  now,
		ExpiresAt: now + int64(expire.Seconds()),
		Subject:   accountID,
	})

	return tkn.SignedString(t.privatekey)
}
