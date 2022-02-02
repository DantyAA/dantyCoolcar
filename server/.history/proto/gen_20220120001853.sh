protoc -I=. --go_out=plugins=grpc,paths=source_relative:gen/go trip.proto
protoc -I=. --grpc-gateway_out=paths=source_relative,grpc_api_configuration=trip.yaml:gen/go trip.proto


PBTS_BIN_DIR=../../wx/miniprogram/node_modules/.bin
PBTS_OUT_DIR=../../wx/miniprogram/service/proto_gen
$PBTS_BIN_DIR/pbjs -t static -W es6 trip.proto -no-create --no-encode --no-verify --no-delimi
$PBTS_BIN_DIR/pbts -o $PBTS_OUT_DIR/trip_pb.d.ts $PBTS_OUT_DIR/trip_pb.js