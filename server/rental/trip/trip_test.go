package trip

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	rentalpb "program/rental/api/gen/v1"
	"program/rental/trip/client/poi"
	"program/rental/trip/dao"
	"program/shared/auth"
	"program/shared/id"
	mgutil "program/shared/mongo"
	mongotesting "program/shared/mongo/testing"
	"program/shared/server"
	"testing"
)

func TestCreatTrip(t *testing.T) {
	c := auth.ContextWithAccountID(
		context.Background(), id.AccountID("account1"))
	mc, err := mongotesting.NewClient(c)
	if err != nil {
		t.Fatalf("connot creat mongo client:%v", err)
	}

	logger, err := server.NewZapLogger()
	if err != nil {
		t.Fatalf("cannot creat logger:%v", err)
	}

	pm := &profileManager{}
	cm := &carManager{}
	s := &Service{
		ProfileManager: pm,
		CarManager:     cm,
		POIManager:     &poi.Manager{},
		Mongo:          dao.NewMongo(mc.Database("coolcar")),
		Logger:         logger,
	}
	req := &rentalpb.CreateTripRequest{
		CarId: "car1",
		Start: &rentalpb.Location{
			Latitude:  32.123,
			Longitude: 114.2525,
		},
	}

	pm.iID = "identity1"
	golden := `{"account_id":"account1","car_id":"car1","start":{"loacation":{"latitude":32.123,"longitude":114.2525},"poi_name":"观澜碧桂园"},"current":{"loacation":{"latitude":32.123,"longitude":114.2525},"poi_name":"观澜碧桂园"},"status":1,"identity_id":"identity1"}`
	cases := []struct {
		name         string
		tripID       string
		profileErr   error
		carVerifyErr error
		carUnlockErr error
		want         string
		wantErr      bool
	}{
		{
			name:   "normal_creat",
			tripID: "62666360f95fe26f5466d233",
			want:   golden, //????
		},
		{
			name:       "profile_err",
			tripID:     "62666360f95fe26f5466d234",
			profileErr: fmt.Errorf("profile"),
			wantErr:    true,
		}, {
			name:         "car_verify_err",
			tripID:       "62666360f95fe26f5466d235",
			carVerifyErr: fmt.Errorf("verify"),
			wantErr:      true,
		}, {
			name:         "car_unlock_err",
			tripID:       "62666360f95fe26f5466d236",
			carUnlockErr: fmt.Errorf("unlock"),
			want:         golden,
		},
	}

	for _, cc := range cases {
		t.Run(cc.name, func(t *testing.T) {
			mgutil.NewObjIDWithValue(id.TripID(cc.tripID))
			pm.err = cc.profileErr
			cm.UnlockErr = cc.carUnlockErr
			cm.VerifyErr = cc.carVerifyErr
			res, err := s.CreateTrip(c, req)
			if cc.wantErr {
				if err == nil {
					t.Errorf("want error;got one")
				} else {
					return
				}
			}

			if err != nil {
				t.Errorf("error creating trip:%v", err)
				return
			}
			if res.Id != cc.tripID {
				t.Errorf("incorrect id;want %q,got %q", cc.tripID, res.Id)
			}
			b, err := json.Marshal(res.Trip)
			if err != nil {
				t.Errorf("")
			}

			tripStr := string(b)

			if cc.want != tripStr {
				t.Errorf("incorrect response:want:%s,got:%s", cc.want, tripStr)
			}
		})
	}
}

type profileManager struct {
	iID id.IdentityID
	err error
}

func (p profileManager) Verify(context.Context, id.AccountID) (id.IdentityID, error) {
	return p.iID, p.err
}

type carManager struct {
	VerifyErr error
	UnlockErr error
}

func (c *carManager) Verify(context.Context, id.CarID, *rentalpb.Location) error {
	return c.VerifyErr
}

func (c *carManager) Unlock(context.Context, id.CarID) error {
	return c.UnlockErr
}

func TestMain(m *testing.M) {
	os.Exit(mongotesting.RunWithMongoInDocker(m))
}
