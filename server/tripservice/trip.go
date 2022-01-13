package trip

import (
	"context"
	trippb "program/proto/gen/go"
)

// Service implements trip services
type Service struct {
}

func (*Service) GetTrip(c context.Context,
	req *trippb.GetTripRequest) (*trippb.GetTripResponse, error) {
	return &trippb.GetTripResponse{
		Id:   req.Id,
		Trip: &trippb.Trip{
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
		},
	}, nil
}

