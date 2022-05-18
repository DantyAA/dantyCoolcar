package car

import (
	"context"
	rentalpb "program/rental/api/gen/v1"
	"program/shared/id"
)

type Manger struct {
}

func (c *Manger) Verify(context.Context, id.CarID, *rentalpb.Location) error {
	return nil
}

func (c *Manger) Unlock(context.Context, id.CarID) error {
	return nil
}
