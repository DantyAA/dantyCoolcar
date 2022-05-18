package trip

import (
	"context"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	rentalpb "program/rental/api/gen/v1"
	"program/rental/trip/dao"
	"program/shared/auth"
	"program/shared/id"
)

type Service struct {
	ProfileManager ProfileManager
	CarManager     CarManager
	POIManager     POIManager
	Mongo          *dao.Mongo
	Logger         *zap.Logger
}

type ProfileManager interface {
	Verify(context.Context, id.AccountID) (id.IdentityID, error)
}

type CarManager interface {
	Verify(context.Context, id.CarID, *rentalpb.Location) error
	Unlock(context.Context, id.CarID) error
}

// Point of Interest
type POIManager interface {
	Resolve(context.Context, *rentalpb.Location) (string, error)
}

func (s Service) CreateTrip(c context.Context, req *rentalpb.CreateTripRequest) (*rentalpb.TripEntity, error) {

	aid, err := auth.AccountIDFromContext(c)
	if err != nil {
		return nil, err
	}

	iID, err := s.ProfileManager.Verify(c, aid)

	if err != nil {
		return nil, status.Errorf(codes.FailedPrecondition, err.Error())
	}
	//Check vehicle status
	carID := id.CarID(req.CarId)
	err = s.CarManager.Verify(c, carID, req.Start)
	if err != nil {
		return nil, status.Error(codes.FailedPrecondition, err.Error())
	}
	//Create a trip：read-in database,start billing

	poi, err := s.POIManager.Resolve(c, req.Start)
	if err != nil {
		s.Logger.Info("cannot reslove poi", zap.Stringer("Location", req.Start), zap.Error(err))
	}
	ls := &rentalpb.LocationStatus{
		Location: req.Start,
		PoiName:  poi,
	}
	trip, err := s.Mongo.CreateTrip(c, &rentalpb.Trip{
		AccountId:  aid.String(),
		CarId:      carID.String(),
		IdentityId: iID.String(),
		Status:     rentalpb.TripStatus_IN_PROGERSS,
		Start:      ls,
		Current:    ls,
	})
	if err != nil {
		s.Logger.Warn("cannot creat trip", zap.Error(err))
		return nil, status.Error(codes.AlreadyExists, "")
	}
	go func() {
		err = s.CarManager.Unlock(context.Background(), carID)
		if err != nil {
			s.Logger.Error("cannot unlock car", zap.Error(err))
		}
	}()
	return &rentalpb.TripEntity{
		Id:   trip.ID.Hex(),
		Trip: trip.Trip,
	}, nil

	//s.Logger.Info("crate trip", zap.String("start", req.GetCarId()), zap.String("account_id", aid.String()))
	//return nil, status.Error(codes.Unimplemented, "")
}

func (s Service) GetTrip(c context.Context, req *rentalpb.GetTripRequest) (*rentalpb.Trip, error) {
	return nil, status.Error(codes.Unimplemented, "")
}

func (s Service) GetTrips(ctx context.Context, request *rentalpb.GetTripsRequest) (*rentalpb.GetTripsResponse, error) {
	return nil, status.Error(codes.Unimplemented, "")
}

func (s Service) UpdateTrip(ctx context.Context, request *rentalpb.UpdateTripRequest) (*rentalpb.Trip, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, status.Error(codes.Unauthenticated, "")
	}
	tid := id.TripID(request.Id)

	tr, err := s.Mongo.GetTrip(ctx, id.TripID(request.Id), aid)

	if request.Current != nil {
		tr.Trip.Current = s.calcCurrentStatus(tr.Trip, request.Current)
	}
	if request.EndTrip {
		tr.Trip.End = tr.Trip.Current
		tr.Trip.Status = rentalpb.TripStatus_FINISHED
	}
	err = s.Mongo.UpdateTrip(ctx, tid, aid, tr.UpdatedAt, tr.Trip)
	if err != nil {
		return nil, err
	}
	return nil, status.Error(codes.Unimplemented, "")
}

func (s *Service) calcCurrentStatus(trip *rentalpb.Trip, cur *rentalpb.Location) *rentalpb.LocationStatus {
	return nil
}
