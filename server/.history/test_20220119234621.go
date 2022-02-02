package main

import (
	"fmt"
	"google.golang.org/protobuf/proto"
	trippb "program/proto/gen/go"
)

func main() {
	//零值
	var a int
	fmt.Println(a)

	trip := trippb.Trip{
		Start:       "abc",
		End:         "def",
		DurationSec: 3600,
		FeeCent:     10000,
		StartPos: &trippb.Location{
			Latitude: 30,
			Longitude: 120,
		},
		EndPos: &trippb.Location{
			Latitude: 35,
			Longitude: 130,
		},
		PathLocations: []*trippb.Location{
			{
				Latitude: 31,
				Longitude: 121,
			},{
				Latitude: 32,
				Longitude: 122,
			},
		},
		Status: trippb.TripStatus_IN_PROGRESS,
	}
	fmt.Println(&trip)
	b,err := proto.Marshal(&trip)
	if err != nil{
		panic(err)
	}
	fmt.Printf("%X\n",b)

	var trip2 trippb.Trip
	err = proto.Unmarshal(b,&trip2)
	fmt.Println(&trip2)
}
