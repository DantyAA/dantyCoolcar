package ObjectID

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"program/shared/id"
)

func FromObjID(id fmt.Stringer) (primitive.ObjectID, error) {
	return primitive.ObjectIDFromHex(id.String())
}

func ToAccountID(oid primitive.ObjectID) id.AccountID {
	return id.AccountID(oid.Hex())
}

func ToTripID(oid primitive.ObjectID) id.TripID {
	return id.TripID(oid.Hex())
}

func MustFromID(id fmt.Stringer) primitive.ObjectID {
	oid, err := FromObjID(id)
	if err != nil {
		panic(err)
	}
	return oid
}
