package token

import (
	"github.com/dgrijalva/jwt-go"
	"testing"
	"time"
)

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1QKiHbEj5U31RQu4LxFP
OELBpG8TXcTIKQbrW8OE/cpnc5qWmMpa5UJ/Lf1H7eyQEx5mwrBxs1f8HU6c3oT9
wKemRZl2CluPthc8IU4Vzt5J+h2GWe/gaM9+ISir2dxhcQdTFpU14dYwioDaNuy2
CJjozag+EvcDN1ZCR78HNkqTFdp3Gvvz/jDe44IHXzRdG/tbVN9fMv1VI1uSm08K
Q2c7i9t/PR7TYZY5pAy5AFT8dO5++qBoXTTNrdg66ATC1guj0jCkhFtsL2kgvJPw
Kxij9f6aIJRy4KCJuDpPpH7lFufEIXoaOPLgp5q2idMDB0d4DmO/YtMZTvZ8nL8h
gQIDAQAB
-----END PUBLIC KEY-----
`

func TestVerify(t *testing.T) {
	pubkey, err := jwt.ParseRSAPublicKeyFromPEM([]byte(publicKey))
	if err != nil {
		t.Fatalf("cannot parse public key: %v", err)
	}

	v := &JWTTokenVerifier{
		PublicKey: pubkey,
	}
	var _ = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyMzkwMjQsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiaGdrMmoxZzMxZzJrajNnMWtqMmhnMyJ9.Y-gpSLmzbr0tDGyTO_Fln61C66yEGlqkUE8PvPhej45Q-oT1oMe1emQ9pxmstFdgSnp4SCcNDpDDnIZJFgmaO1PdFugtg31OGSZ1or3hS2E5lIGJLafIxbmYqHCP_ODWtIutg5sN9Q0TLxPXZCZKGE1eVHeu3AxDC2tNoWgPpNRIiIpgwiRX1guPBrl21eM2NMw55xRjx-ZFLsNQFAEVe0CmlaapmMXnjE5TC6-b4kQDezde5XVooR7HjP06zz2a6aabZ8lyVTvQ4l0BL9QnGl7j-fCktNpzuBnLIxvASf4RwETzKVOCYdZa2hTe5W5MG1hzYjy2MxcBGIk9dAtR6A"

	cases := []struct {
		name    string
		tkn     string
		now     time.Time
		want    string
		wantErr bool
	}{
		{name: "valid_token",
			tkn:     "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyMzkwMjQsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiaGdrMmoxZzMxZzJrajNnMWtqMmhnMyJ9.Y-gpSLmzbr0tDGyTO_Fln61C66yEGlqkUE8PvPhej45Q-oT1oMe1emQ9pxmstFdgSnp4SCcNDpDDnIZJFgmaO1PdFugtg31OGSZ1or3hS2E5lIGJLafIxbmYqHCP_ODWtIutg5sN9Q0TLxPXZCZKGE1eVHeu3AxDC2tNoWgPpNRIiIpgwiRX1guPBrl21eM2NMw55xRjx-ZFLsNQFAEVe0CmlaapmMXnjE5TC6-b4kQDezde5XVooR7HjP06zz2a6aabZ8lyVTvQ4l0BL9QnGl7j-fCktNpzuBnLIxvASf4RwETzKVOCYdZa2hTe5W5MG1hzYjy2MxcBGIk9dAtR6A",
			now:     time.Unix(1516239023, 0),
			want:    "hgk2j1g31g2kj3g1kj2hg3",
			wantErr: false,
		}, {
			name:    "token_expired",
			tkn:     "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyMzkwMjQsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiaGdrMmoxZzMxZzJrajNnMWtqMmhnMyJ9.Y-gpSLmzbr0tDGyTO_Fln61C66yEGlqkUE8PvPhej45Q-oT1oMe1emQ9pxmstFdgSnp4SCcNDpDDnIZJFgmaO1PdFugtg31OGSZ1or3hS2E5lIGJLafIxbmYqHCP_ODWtIutg5sN9Q0TLxPXZCZKGE1eVHeu3AxDC2tNoWgPpNRIiIpgwiRX1guPBrl21eM2NMw55xRjx-ZFLsNQFAEVe0CmlaapmMXnjE5TC6-b4kQDezde5XVooR7HjP06zz2a6aabZ8lyVTvQ4l0BL9QnGl7j-fCktNpzuBnLIxvASf4RwETzKVOCYdZa2hTe5W5MG1hzYjy2MxcBGIk9dAtR6A",
			now:     time.Unix(1516239128, 0),
			wantErr: true,
		},
		{
			name:    "bad_token",
			tkn:     "bad_token",
			now:     time.Unix(1516239023, 0),
			wantErr: true,
		},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			jwt.TimeFunc = func() time.Time {
				return c.now
			}
			accountID, err := v.Verify(c.tkn)

			if !c.wantErr && err != nil {
				t.Errorf("verification failed : %v", err)
			}
			if c.wantErr && err == nil {
				t.Errorf("want error :got no error")
			}
			if accountID != c.want {
				t.Errorf("Wrong account id : %q want: %q", accountID, c.want)
			}
		})
	}
}
