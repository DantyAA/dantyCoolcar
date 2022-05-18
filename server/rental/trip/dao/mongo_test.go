package dao

import (
	"context"
	"fmt"
	"github.com/google/go-cmp/cmp"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/protobuf/testing/protocmp"
	"os"
	rentalpb "program/rental/api/gen/v1"
	"program/shared/id"
	mgutil "program/shared/mongo"
	"program/shared/mongo/ObjectID"
	mongotesting "program/shared/mongo/testing"
	"testing"
)

var mongoURI string

func TestCreatTrip(t *testing.T) {
	ctx := context.Background()
	mongoURI = "mongodb://admin:admin@localhost:27017"
	mc, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI+"/?authSource=admin&readPreference=primary&ssl=false"))
	if err != nil {
		t.Fatalf("cannot connect mongodb: %v", err)
	}
	db := mc.Database("coolcar")
	err = mongotesting.SetupIndexes(ctx, db)
	if err != nil {
		t.Fatalf("cannot setup indexes: %v", err)
	}
	m := NewMongo(db)
	cases := []struct {
		name       string
		tripID     string
		accountID  string
		tripStatus rentalpb.TripStatus
		wantErr    bool
	}{
		{
			name:       "finished",
			tripID:     "626653dc3ef47d4ede98ca9a",
			accountID:  "account1",
			tripStatus: rentalpb.TripStatus_FINISHED,
		},
		{
			name:       "another_finished",
			tripID:     "626653dc3ef47d4ede98ca9b",
			accountID:  "account1",
			tripStatus: rentalpb.TripStatus_FINISHED,
			wantErr:    true,
		},
		{
			name:       "in_progress",
			tripID:     "626653dc3ef47d4ede98ca9b",
			accountID:  "account1",
			tripStatus: rentalpb.TripStatus_IN_PROGERSS,
		},
		{
			name:       "another_in_progress",
			tripID:     "626653dc3ef47d4ede98ca9d",
			accountID:  "account1",
			tripStatus: rentalpb.TripStatus_IN_PROGERSS,
		},
		{
			name:       "in_progress_by_another_account",
			tripID:     "626653dc3ef47d4ede98ca9e",
			accountID:  "account2",
			tripStatus: rentalpb.TripStatus_IN_PROGERSS,
		},
	}

	for _, cc := range cases {

		mgutil.NewObjIDWithValue(id.TripID(cc.tripID))

		tr, err := m.CreateTrip(ctx, &rentalpb.Trip{
			AccountId: cc.accountID,
			Status:    cc.tripStatus,
		})
		if cc.wantErr {
			if err == nil {
				t.Errorf("error expected;got none")
				continue
			}
		}
		if err != nil {
			t.Errorf("error creating trip: %v", err)
			continue
		}
		if tr.ID.Hex() != cc.tripID {
			t.Errorf("incorrect trip id;want: %q;got: %q", cc.tripID, tr.ID.Hex())
		}
	}

}

func TestGetTrip(t *testing.T) {
	ctx := context.Background()
	mongoURI = "mongodb://admin:admin@localhost:27017"
	mc, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI+"/?authSource=admin&readPreference=primary&ssl=false"))
	if err != nil {
		t.Fatalf("cannot connect mongodb: %v", err)
	}
	m := NewMongo(mc.Database("coolcar"))
	acct := id.AccountID("account1")
	mgutil.NewObjID = primitive.NewObjectID
	tr, err := m.CreateTrip(ctx, &rentalpb.Trip{
		AccountId: acct.String(),
		CarId:     "car1",
		Start: &rentalpb.LocationStatus{
			Location: &rentalpb.Location{
				Latitude:  13,
				Longitude: 14,
			},
			PoiName: "startPoint",
		},
		End: &rentalpb.LocationStatus{
			Location: &rentalpb.Location{
				Latitude:  13.1,
				Longitude: 14.1,
			},
			FeeCent:   10000,
			KmDrivern: 35,
			PoiName:   "endPoint",
		},
		Status: rentalpb.TripStatus_FINISHED,
	})
	if err != nil {
		t.Errorf("cannot create trip; %v", err)
	}

	got, err := m.GetTrip(ctx, ObjectID.ToTripID(tr.ID), acct)
	if err != nil {
		t.Errorf("cannot get trip: %v ", err)
	}

	if diff := cmp.Diff(tr, got, protocmp.Transform()); diff != "" {
		t.Errorf("result differs: -want +got %s", diff)
	}
	fmt.Printf("got trip: %+v ", got)
}

func TestGetTrips(t *testing.T) {

	rows := []struct {
		id        id.TripID
		accountID id.AccountID
		status    rentalpb.TripStatus
	}{
		{
			id:        "62666360f95fe26f5466d231",
			accountID: "account_id_for_get_trips",
			status:    rentalpb.TripStatus_FINISHED,
		}, {
			id:        "62666360f95fe26f5466d23a",
			accountID: "account_id_for_get_trips",
			status:    rentalpb.TripStatus_FINISHED,
		}, {
			id:        "62666360f95fe26f5466d233",
			accountID: "account_id_for_get_trips",
			status:    rentalpb.TripStatus_FINISHED,
		}, {
			id:        "62666360f95fe26f5466d234",
			accountID: "account_id_for_get_trips",
			status:    rentalpb.TripStatus_IN_PROGERSS,
		}, {
			id:        "62666360f95fe26f5466d235",
			accountID: "account_id_for_get_trips_1",
			status:    rentalpb.TripStatus_TS_NOT_SPECIFIED,
		},
	}
	ctx := context.Background()
	mongoURI = "mongodb://admin:admin@localhost:27017"
	mc, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI+"/?authSource=admin&readPreference=primary&ssl=false"))
	if err != nil {
		t.Fatalf("cannot connect mongodb: %v", err)
	}
	m := NewMongo(mc.Database("coolcar"))
	for _, r := range rows {
		mgutil.NewObjIDWithValue(id.TripID(r.id))
		value, err := m.CreateTrip(ctx, &rentalpb.Trip{
			AccountId: string(r.accountID),
			Status:    r.status,
		})
		if err != nil {
			t.Fatalf("cannot creat rows: %v", err)
		}
		fmt.Println(value)
	}

	cases := []struct {
		name        string
		accoutid    id.AccountID
		status      rentalpb.TripStatus
		wantcount   int
		wantoOnlyID string
	}{
		{
			name:      "get_all",
			accoutid:  "account_id_for_get_trips",
			status:    rentalpb.TripStatus_FINISHED,
			wantcount: 3,
		},
		{
			name:        "get_in_progress",
			accoutid:    "account_id_for_get_trips_1",
			status:      rentalpb.TripStatus_TS_NOT_SPECIFIED,
			wantcount:   1,
			wantoOnlyID: "62666360f95fe26f5466d235",
		},
	}

	for _, cc := range cases {

		t.Run(cc.name, func(t *testing.T) {
			res, err := m.GetTrips(context.Background(),
				cc.accoutid,
				cc.status)

			if err != nil {
				t.Errorf("cannot get trip %v", err)
			}
			if cc.wantcount != len(res) {
				t.Errorf("incorrect result count; want: %d, got:%d", cc.wantcount, len(res))
			}
			if cc.wantoOnlyID != "" && len(res) > 0 {
				if cc.wantoOnlyID != res[0].ID.Hex() {
					t.Errorf("only_id incourrect; want: %q,got:%q",
						cc.wantoOnlyID, res[0].ID.Hex())
				}
			}
		})
	}
}

func TestUpdateTrip(t *testing.T) {
	ctx := context.Background()
	mongoURI = "mongodb://admin:admin@localhost:27017"
	mc, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI+"/?authSource=admin&readPreference=primary&ssl=false"))
	if err != nil {
		t.Fatalf("cannot connect mongodb: %v", err)
	}
	m := NewMongo(mc.Database("coolcar"))
	tid := id.TripID("62666360f95fe26f5466d23a")
	aid := id.AccountID("account_id_for_get_trips")

	var now int64 = 10000
	mgutil.NewObjIDWithValue(tid)
	mgutil.UpdateAt = func() int64 {
		return now
	}
	trip, err := m.CreateTrip(ctx, &rentalpb.Trip{
		AccountId: string(aid),
		Status:    rentalpb.TripStatus_IN_PROGERSS,
		Start: &rentalpb.LocationStatus{
			PoiName: "start_poi",
		},
	})
	if err != nil {
		return
	}
	if trip.UpdatedAt != 10000 {
		t.Fatalf("wrong uodateat;want:1000 ,got:%d", trip.UpdatedAt)
	}
	update := &rentalpb.Trip{
		AccountId: aid.String(),
		Status:    rentalpb.TripStatus_IN_PROGERSS,
		Start: &rentalpb.LocationStatus{
			PoiName: "start_poi_updated",
		},
	}
	cases := []struct {
		name         string
		now          int64
		withUpdateAt int64
		wanterr      bool
	}{
		{
			name:         "normal_update",
			now:          20000,
			withUpdateAt: 10000,
		},
		{
			name:         "update_with_stale_timestamp",
			now:          30000,
			withUpdateAt: 10000,
			wanterr:      true,
		},
		{
			name:         "update_with_refetch",
			now:          40000,
			withUpdateAt: 20000,
		},
	}

	for _, cc := range cases {
		now = cc.now
		err := m.UpdateTrip(ctx, tid, aid, cc.withUpdateAt, update)
		if cc.wanterr {
			if err == nil {
				t.Errorf("%s:want error;got none", cc.name)
			} else {
				continue
			}
		} else {
			if err != nil {
				t.Errorf("%s:cannot update:%v", cc.name, err)
			}
		}

		updatedTrip, err := m.GetTrip(ctx, tid, aid)
		if err != nil {
			t.Errorf("%s:cannot get trip after update:%v", cc.name, err)
		}

		if cc.now != updatedTrip.UpdatedAt {
			t.Errorf("%s:incorrect updatedat: want %d,got %d", cc.name, cc.now, updatedTrip.UpdatedAtField)
		}
	}
}

func TestMain(m *testing.M) {
	os.Exit(mongotesting.RunWithMongoInDocker(m))
}
