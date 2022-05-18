package dao

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
	"program/shared/id"
	mgutil "program/shared/mongo"
	mongotesting "program/shared/mongo/testing"
	"testing"
)

var mongoURI string

func TestResolveAccountID(t *testing.T) {
	ctx := context.Background()

	mc, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://admin:admin@localhost:27017/?authSource=admin&readPreference=primary&ssl=false"))
	if err != nil {
		t.Fatalf("cannot connect mongodb: %v", err)
	}
	m := NewMongo(mc.Database("coolcar"))

	mgutil.NewObjIDWithValue(id.AccountID("62052081f721cf8797a9da73"))

	id, err := m.ResolveAccountID(ctx, "333")

	if err != nil {
		t.Errorf("faild resolve account id for 333: %v", err)
	} else {
		want := "62052081f721cf8797a9da73"
		if want != id.String() {
			t.Errorf("resolve account id : want : %q ,got: %q", want, id)
		}
	}
}

func TestMain(m *testing.M) {
	os.Exit(mongotesting.RunWithMongoInDocker(m))
}
