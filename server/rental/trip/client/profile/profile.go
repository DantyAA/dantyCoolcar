package profile

import (
	"context"
	"program/shared/id"
)

type Manager struct {
}

func (m *Manager) Verify(context.Context, id.AccountID) (id.IdentityID, error) {
	return id.IdentityID("identity1"), nil
}
