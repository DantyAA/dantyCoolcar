package poi

import (
	"context"
	"github.com/golang/protobuf/proto"
	"hash/fnv"
	rentalpb "program/rental/api/gen/v1"
)

type Manager struct {
}

var poi = []string{
	"科兴科学园",
	"观澜碧桂园",
	"林和风景",
}

func (*Manager) Resolve(c context.Context, loc *rentalpb.Location) (string, error) {
	b, err := proto.Marshal(loc)
	if err != nil {
		return "", err
	}
	h := fnv.New32()
	_, err = h.Write(b)
	if err != nil {
		return "", err
	}
	return poi[int(h.Sum32())%len(poi)], nil
}
