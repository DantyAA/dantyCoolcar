package token

import (
	"github.com/dgrijalva/jwt-go"
	"testing"
	"time"
)

const priviteKey = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDVAqIdsSPlTfVF
C7gvEU84QsGkbxNdxMgpButbw4T9ymdzmpaYylrlQn8t/Uft7JATHmbCsHGzV/wd
TpzehP3Ap6ZFmXYKW4+2FzwhThXO3kn6HYZZ7+Boz34hKKvZ3GFxB1MWlTXh1jCK
gNo27LYImOjNqD4S9wM3VkJHvwc2SpMV2nca+/P+MN7jggdfNF0b+1tU318y/VUj
W5KbTwpDZzuL2389HtNhljmkDLkAVPx07n76oGhdNM2t2DroBMLWC6PSMKSEW2wv
aSC8k/ArGKP1/poglHLgoIm4Ok+kfuUW58Qheho48uCnmraJ0wMHR3gOY79i0xlO
9nycvyGBAgMBAAECggEAXx/c6+uWfymQVbRFHWfae+J7/YXJHT/qrz+yzXkEJB5G
kr6/cB4191n517zbaWoScSdLdrg7Hn81TJU1wr2bYHS98Sj2KOv4wrWfmbP4Uzi7
yqFyxSk1izjWN9Kk5BbhwQsnVNdvh5oSdVfTm2GcbTx0ApuWlPuQiR7RXJ73hot4
kALWA/c29Pn7Vcd0vFBzXHcCNiJ+xHn3kwT83ZWsJVtD04DihpX57lu99EhRwgdv
5fppOezr/eY9MwAE+IYwMpaz08xbeAVcYJHnj5dPJ6TzmstnN6HbvDCGdRyEa/hL
LB5rfHxGlmp8ntNs1+M+00tRn/HlEyCozrY23UrtAQKBgQDqcvxnVspYhXhqAxz/
tfLdGxW2htdWM5+AfJy4Yi1w7m1niXIi+2asZy/UGd8O4JQCe2CfZunLc/6+U5RD
Dx8oEXNpk4XjihmIYfIu6dh3CMixKLQ5nhel2hv2TAsar0GXgubmgZONDMIs+x2w
Hb6ZAiYha3GGw3noll0ys7kMsQKBgQDolybRwGMFJJ4/Zi7COqOVZAqqBEz4tfRv
3jAr6Cnv765xyDPUAi0l+CMp/5Q0tZSTuhU290Mik4XkueLpPmD5td2P0BXMREbE
aPefElwJS2wqDO8cMeZ2Sg01OpAF+SkfUfL/EL+XaMxEkyFZoVKA09/S3lxAtpmz
TXb10gVV0QKBgQCB02jHxLzKJibW9aBiTZwOKkhsyeCGoJGLsfWK+PrW1YEJ24ez
rWlewMkwd58Yeu4bLb0EqBWBD1uag2fPdpk3M+qoJQP4S2n2Jt7Yca/nwpp31+Vt
HolT0yK20cc4YKI+x0Mbk9dkPRNtmyUGeIIp8pGw4fF8wdRJIrK7N+CaEQKBgQDF
d05l1cg7nZMckEwyakZnlr/XCD+xCAm20BRlsn2oTvzzbN1TqWVbTwfLqEjTVzYF
FX7dY5+Dw2txfL/A9kyutFCewDNBcNYD+noAez3YRkhWixSWA2d+FfCQuF9+MsNO
6+w50KZYjYiez6sIxYWeCkOEa3Q3HM/xAlt06BHPgQKBgQCrc5BHamrw8b2wIyNJ
WxO14L7CddiZtUTa8pTCcqCY9D6FJWyFKzRCZZses5gKcGgnCpEAD5Eenmc3knSX
DJ6d8m77x5pR8cEULtzNLKyIwA7bN+n1+Rw2IBgPYt2Pd0239BbkcFo1DOtHm9X+
tiy29lG7dWST4Zedzgtyiq8Lrw==
-----END PRIVATE KEY-----
`

func TestGenerateToken(t *testing.T) {
	key, err := jwt.ParseRSAPrivateKeyFromPEM([]byte(priviteKey))
	if err != nil {
		t.Fatal("cannot parse provate")
	}
	g := NewJWTTokenGEn("coolcar/auth", key)
	g.nowFunc = func() time.Time {
		return time.Unix(1516239022, 0)
	}()
	tkn, err := g.GenerateToken("hgk2j1g31g2kj3g1kj2hg3", 2*time.Second)

	if err != nil {
		t.Errorf("cannot generate token: %v", err)
	}
	want := `eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyMzkwMjQsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiaGdrMmoxZzMxZzJrajNnMWtqMmhnMyJ9.Y-gpSLmzbr0tDGyTO_Fln61C66yEGlqkUE8PvPhej45Q-oT1oMe1emQ9pxmstFdgSnp4SCcNDpDDnIZJFgmaO1PdFugtg31OGSZ1or3hS2E5lIGJLafIxbmYqHCP_ODWtIutg5sN9Q0TLxPXZCZKGE1eVHeu3AxDC2tNoWgPpNRIiIpgwiRX1guPBrl21eM2NMw55xRjx-ZFLsNQFAEVe0CmlaapmMXnjE5TC6-b4kQDezde5XVooR7HjP06zz2a6aabZ8lyVTvQ4l0BL9QnGl7j-fCktNpzuBnLIxvASf4RwETzKVOCYdZa2hTe5W5MG1hzYjy2MxcBGIk9dAtR6A`
	if tkn != want {
		t.Errorf("wrong token generated . want: %q ; got: %q", want, tkn)
	}

}
