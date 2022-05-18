package dao

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	rentalpb "program/rental/api/gen/v1"
	"program/shared/id"
	mgutil "program/shared/mongo"
	"program/shared/mongo/ObjectID"
)

const (
	tripField      = "trip"
	accountIDField = tripField + ".accountid"
	statusField    = tripField + ".status"
)

type Mongo struct {
	col *mongo.Collection
}

func NewMongo(db *mongo.Database) *Mongo {
	return &Mongo{
		col: db.Collection("account"),
	}
}

type TripRecord struct {
	mgutil.IDField        `bson:"inline"`
	mgutil.UpdatedAtField `bson:"inline"`
	Trip                  *rentalpb.Trip `bson:"trip"`
}

func (m *Mongo) CreateTrip(c context.Context, trip *rentalpb.Trip) (*TripRecord, error) {
	r := &TripRecord{
		Trip: trip,
	}
	r.ID = mgutil.NewObjID()
	r.UpdatedAt = mgutil.UpdateAt()
	_, err := m.col.InsertOne(c, r)
	//return {r.ID,r.UpdatedAt,r.Trip} , nil
	if err != nil {
		return nil, err
	}
	return r, nil
}

func (db *Mongo) GetTrip(c context.Context, id id.TripID, accountID id.AccountID) (*TripRecord, error) {
	objID, err := ObjectID.FromObjID(id)
	if err != nil {
		return nil, fmt.Errorf("incalid id : %v", err)
	}
	res := db.col.FindOne(c, bson.M{
		mgutil.IDFieldName: objID,
		accountIDField:     accountID,
	})

	if err := res.Err(); err != nil {
		return nil, err
	}
	var tr TripRecord
	err = res.Decode(&tr)
	if err != nil {
		return nil, fmt.Errorf("cannot decode : %v ", err)
	}
	return &tr, nil
}

func (m *Mongo) GetTrips(c context.Context, accountId id.AccountID, status rentalpb.TripStatus) ([]*TripRecord, error) {
	filter := bson.M{
		accountIDField: accountId.String(),
	}
	if status != rentalpb.TripStatus_IN_PROGERSS {
		filter[statusField] = status
	}
	res, err := m.col.Find(c, filter)
	if err != nil {
		return nil, err
	}
	var trips []*TripRecord
	for res.Next(c) {
		var trip TripRecord
		err := res.Decode(&trip)
		if err != nil {
			return nil, err
		}
		trips = append(trips, &trip)
	}
	return trips, nil
}

//UpdateTrip updates a trip
func (m *Mongo) UpdateTrip(c context.Context, tid id.TripID, aid id.AccountID, updateAt int64, trip *rentalpb.Trip) error {
	return nil
}
