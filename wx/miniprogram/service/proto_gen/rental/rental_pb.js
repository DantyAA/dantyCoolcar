import * as $protobuf from "protobufjs";

// Common aliases
const $Reader = $protobuf.Reader, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const rental = $root.rental = (() => {

    /**
     * Namespace rental.
     * @exports rental
     * @namespace
     */
    const rental = {};

    rental.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof rental
         * @namespace
         */
        const v1 = {};

        v1.Location = (function() {

            /**
             * Properties of a Location.
             * @memberof rental.v1
             * @interface ILocation
             * @property {number|null} [latitude] Location latitude
             * @property {number|null} [longitude] Location longitude
             */

            /**
             * Constructs a new Location.
             * @memberof rental.v1
             * @classdesc Represents a Location.
             * @implements ILocation
             * @constructor
             * @param {rental.v1.ILocation=} [properties] Properties to set
             */
            function Location(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Location latitude.
             * @member {number} latitude
             * @memberof rental.v1.Location
             * @instance
             */
            Location.prototype.latitude = 0;

            /**
             * Location longitude.
             * @member {number} longitude
             * @memberof rental.v1.Location
             * @instance
             */
            Location.prototype.longitude = 0;

            /**
             * Decodes a Location message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.Location
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.Location} Location
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Location.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.Location();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.latitude = reader.double();
                        break;
                    case 2:
                        message.longitude = reader.double();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a Location message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.Location
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Location} Location
             */
            Location.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Location)
                    return object;
                let message = new $root.rental.v1.Location();
                if (object.latitude != null)
                    message.latitude = Number(object.latitude);
                if (object.longitude != null)
                    message.longitude = Number(object.longitude);
                return message;
            };

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Location
             * @static
             * @param {rental.v1.Location} message Location
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Location.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.latitude = 0;
                    object.longitude = 0;
                }
                if (message.latitude != null && message.hasOwnProperty("latitude"))
                    object.latitude = options.json && !isFinite(message.latitude) ? String(message.latitude) : message.latitude;
                if (message.longitude != null && message.hasOwnProperty("longitude"))
                    object.longitude = options.json && !isFinite(message.longitude) ? String(message.longitude) : message.longitude;
                return object;
            };

            /**
             * Converts this Location to JSON.
             * @function toJSON
             * @memberof rental.v1.Location
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Location.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Location;
        })();

        v1.LocationStatus = (function() {

            /**
             * Properties of a LocationStatus.
             * @memberof rental.v1
             * @interface ILocationStatus
             * @property {rental.v1.ILocation|null} [loacation] LocationStatus loacation
             * @property {number|null} [feeCent] LocationStatus feeCent
             * @property {number|null} [kmDrivern] LocationStatus kmDrivern
             * @property {string|null} [poiName] LocationStatus poiName
             */

            /**
             * Constructs a new LocationStatus.
             * @memberof rental.v1
             * @classdesc Represents a LocationStatus.
             * @implements ILocationStatus
             * @constructor
             * @param {rental.v1.ILocationStatus=} [properties] Properties to set
             */
            function LocationStatus(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LocationStatus loacation.
             * @member {rental.v1.ILocation|null|undefined} loacation
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.loacation = null;

            /**
             * LocationStatus feeCent.
             * @member {number} feeCent
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.feeCent = 0;

            /**
             * LocationStatus kmDrivern.
             * @member {number} kmDrivern
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.kmDrivern = 0;

            /**
             * LocationStatus poiName.
             * @member {string} poiName
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.poiName = "";

            /**
             * Decodes a LocationStatus message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.LocationStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.LocationStatus} LocationStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LocationStatus.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.LocationStatus();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.loacation = $root.rental.v1.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.feeCent = reader.int32();
                        break;
                    case 3:
                        message.kmDrivern = reader.double();
                        break;
                    case 4:
                        message.poiName = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a LocationStatus message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.LocationStatus
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.LocationStatus} LocationStatus
             */
            LocationStatus.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.LocationStatus)
                    return object;
                let message = new $root.rental.v1.LocationStatus();
                if (object.loacation != null) {
                    if (typeof object.loacation !== "object")
                        throw TypeError(".rental.v1.LocationStatus.loacation: object expected");
                    message.loacation = $root.rental.v1.Location.fromObject(object.loacation);
                }
                if (object.feeCent != null)
                    message.feeCent = object.feeCent | 0;
                if (object.kmDrivern != null)
                    message.kmDrivern = Number(object.kmDrivern);
                if (object.poiName != null)
                    message.poiName = String(object.poiName);
                return message;
            };

            /**
             * Creates a plain object from a LocationStatus message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.LocationStatus
             * @static
             * @param {rental.v1.LocationStatus} message LocationStatus
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LocationStatus.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.loacation = null;
                    object.feeCent = 0;
                    object.kmDrivern = 0;
                    object.poiName = "";
                }
                if (message.loacation != null && message.hasOwnProperty("loacation"))
                    object.loacation = $root.rental.v1.Location.toObject(message.loacation, options);
                if (message.feeCent != null && message.hasOwnProperty("feeCent"))
                    object.feeCent = message.feeCent;
                if (message.kmDrivern != null && message.hasOwnProperty("kmDrivern"))
                    object.kmDrivern = options.json && !isFinite(message.kmDrivern) ? String(message.kmDrivern) : message.kmDrivern;
                if (message.poiName != null && message.hasOwnProperty("poiName"))
                    object.poiName = message.poiName;
                return object;
            };

            /**
             * Converts this LocationStatus to JSON.
             * @function toJSON
             * @memberof rental.v1.LocationStatus
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LocationStatus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LocationStatus;
        })();

        /**
         * TripStatus enum.
         * @name rental.v1.TripStatus
         * @enum {number}
         * @property {number} TS_NOT_SPECIFIED=0 TS_NOT_SPECIFIED value
         * @property {number} IN_PROGERSS=1 IN_PROGERSS value
         * @property {number} FINISHED=2 FINISHED value
         */
        v1.TripStatus = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "TS_NOT_SPECIFIED"] = 0;
            values[valuesById[1] = "IN_PROGERSS"] = 1;
            values[valuesById[2] = "FINISHED"] = 2;
            return values;
        })();

        v1.TripEntity = (function() {

            /**
             * Properties of a TripEntity.
             * @memberof rental.v1
             * @interface ITripEntity
             * @property {string|null} [id] TripEntity id
             * @property {rental.v1.ITrip|null} [trip] TripEntity trip
             */

            /**
             * Constructs a new TripEntity.
             * @memberof rental.v1
             * @classdesc Represents a TripEntity.
             * @implements ITripEntity
             * @constructor
             * @param {rental.v1.ITripEntity=} [properties] Properties to set
             */
            function TripEntity(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TripEntity id.
             * @member {string} id
             * @memberof rental.v1.TripEntity
             * @instance
             */
            TripEntity.prototype.id = "";

            /**
             * TripEntity trip.
             * @member {rental.v1.ITrip|null|undefined} trip
             * @memberof rental.v1.TripEntity
             * @instance
             */
            TripEntity.prototype.trip = null;

            /**
             * Decodes a TripEntity message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.TripEntity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.TripEntity} TripEntity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TripEntity.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.TripEntity();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.trip = $root.rental.v1.Trip.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a TripEntity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.TripEntity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.TripEntity} TripEntity
             */
            TripEntity.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.TripEntity)
                    return object;
                let message = new $root.rental.v1.TripEntity();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.trip != null) {
                    if (typeof object.trip !== "object")
                        throw TypeError(".rental.v1.TripEntity.trip: object expected");
                    message.trip = $root.rental.v1.Trip.fromObject(object.trip);
                }
                return message;
            };

            /**
             * Creates a plain object from a TripEntity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.TripEntity
             * @static
             * @param {rental.v1.TripEntity} message TripEntity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TripEntity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.trip = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.trip != null && message.hasOwnProperty("trip"))
                    object.trip = $root.rental.v1.Trip.toObject(message.trip, options);
                return object;
            };

            /**
             * Converts this TripEntity to JSON.
             * @function toJSON
             * @memberof rental.v1.TripEntity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TripEntity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TripEntity;
        })();

        v1.Trip = (function() {

            /**
             * Properties of a Trip.
             * @memberof rental.v1
             * @interface ITrip
             * @property {string|null} [accountId] Trip accountId
             * @property {string|null} [carId] Trip carId
             * @property {rental.v1.ILocationStatus|null} [start] Trip start
             * @property {rental.v1.ILocationStatus|null} [end] Trip end
             * @property {rental.v1.ILocationStatus|null} [current] Trip current
             * @property {rental.v1.TripStatus|null} [status] Trip status
             * @property {string|null} [identityId] Trip identityId
             */

            /**
             * Constructs a new Trip.
             * @memberof rental.v1
             * @classdesc Represents a Trip.
             * @implements ITrip
             * @constructor
             * @param {rental.v1.ITrip=} [properties] Properties to set
             */
            function Trip(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Trip accountId.
             * @member {string} accountId
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.accountId = "";

            /**
             * Trip carId.
             * @member {string} carId
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.carId = "";

            /**
             * Trip start.
             * @member {rental.v1.ILocationStatus|null|undefined} start
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.start = null;

            /**
             * Trip end.
             * @member {rental.v1.ILocationStatus|null|undefined} end
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.end = null;

            /**
             * Trip current.
             * @member {rental.v1.ILocationStatus|null|undefined} current
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.current = null;

            /**
             * Trip status.
             * @member {rental.v1.TripStatus} status
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.status = 0;

            /**
             * Trip identityId.
             * @member {string} identityId
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.identityId = "";

            /**
             * Decodes a Trip message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.Trip
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.Trip} Trip
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Trip.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.Trip();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.accountId = reader.string();
                        break;
                    case 2:
                        message.carId = reader.string();
                        break;
                    case 3:
                        message.start = $root.rental.v1.LocationStatus.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.end = $root.rental.v1.LocationStatus.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.current = $root.rental.v1.LocationStatus.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.status = reader.int32();
                        break;
                    case 7:
                        message.identityId = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a Trip message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.Trip
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Trip} Trip
             */
            Trip.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Trip)
                    return object;
                let message = new $root.rental.v1.Trip();
                if (object.accountId != null)
                    message.accountId = String(object.accountId);
                if (object.carId != null)
                    message.carId = String(object.carId);
                if (object.start != null) {
                    if (typeof object.start !== "object")
                        throw TypeError(".rental.v1.Trip.start: object expected");
                    message.start = $root.rental.v1.LocationStatus.fromObject(object.start);
                }
                if (object.end != null) {
                    if (typeof object.end !== "object")
                        throw TypeError(".rental.v1.Trip.end: object expected");
                    message.end = $root.rental.v1.LocationStatus.fromObject(object.end);
                }
                if (object.current != null) {
                    if (typeof object.current !== "object")
                        throw TypeError(".rental.v1.Trip.current: object expected");
                    message.current = $root.rental.v1.LocationStatus.fromObject(object.current);
                }
                switch (object.status) {
                case "TS_NOT_SPECIFIED":
                case 0:
                    message.status = 0;
                    break;
                case "IN_PROGERSS":
                case 1:
                    message.status = 1;
                    break;
                case "FINISHED":
                case 2:
                    message.status = 2;
                    break;
                }
                if (object.identityId != null)
                    message.identityId = String(object.identityId);
                return message;
            };

            /**
             * Creates a plain object from a Trip message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Trip
             * @static
             * @param {rental.v1.Trip} message Trip
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Trip.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.accountId = "";
                    object.carId = "";
                    object.start = null;
                    object.end = null;
                    object.current = null;
                    object.status = options.enums === String ? "TS_NOT_SPECIFIED" : 0;
                    object.identityId = "";
                }
                if (message.accountId != null && message.hasOwnProperty("accountId"))
                    object.accountId = message.accountId;
                if (message.carId != null && message.hasOwnProperty("carId"))
                    object.carId = message.carId;
                if (message.start != null && message.hasOwnProperty("start"))
                    object.start = $root.rental.v1.LocationStatus.toObject(message.start, options);
                if (message.end != null && message.hasOwnProperty("end"))
                    object.end = $root.rental.v1.LocationStatus.toObject(message.end, options);
                if (message.current != null && message.hasOwnProperty("current"))
                    object.current = $root.rental.v1.LocationStatus.toObject(message.current, options);
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.rental.v1.TripStatus[message.status] : message.status;
                if (message.identityId != null && message.hasOwnProperty("identityId"))
                    object.identityId = message.identityId;
                return object;
            };

            /**
             * Converts this Trip to JSON.
             * @function toJSON
             * @memberof rental.v1.Trip
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Trip.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Trip;
        })();

        v1.CreateTripRequest = (function() {

            /**
             * Properties of a CreateTripRequest.
             * @memberof rental.v1
             * @interface ICreateTripRequest
             * @property {rental.v1.ILocation|null} [start] CreateTripRequest start
             * @property {string|null} [carId] CreateTripRequest carId
             */

            /**
             * Constructs a new CreateTripRequest.
             * @memberof rental.v1
             * @classdesc Represents a CreateTripRequest.
             * @implements ICreateTripRequest
             * @constructor
             * @param {rental.v1.ICreateTripRequest=} [properties] Properties to set
             */
            function CreateTripRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateTripRequest start.
             * @member {rental.v1.ILocation|null|undefined} start
             * @memberof rental.v1.CreateTripRequest
             * @instance
             */
            CreateTripRequest.prototype.start = null;

            /**
             * CreateTripRequest carId.
             * @member {string} carId
             * @memberof rental.v1.CreateTripRequest
             * @instance
             */
            CreateTripRequest.prototype.carId = "";

            /**
             * Decodes a CreateTripRequest message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.CreateTripRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.CreateTripRequest} CreateTripRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateTripRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.CreateTripRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.start = $root.rental.v1.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.carId = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a CreateTripRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.CreateTripRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.CreateTripRequest} CreateTripRequest
             */
            CreateTripRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.CreateTripRequest)
                    return object;
                let message = new $root.rental.v1.CreateTripRequest();
                if (object.start != null) {
                    if (typeof object.start !== "object")
                        throw TypeError(".rental.v1.CreateTripRequest.start: object expected");
                    message.start = $root.rental.v1.Location.fromObject(object.start);
                }
                if (object.carId != null)
                    message.carId = String(object.carId);
                return message;
            };

            /**
             * Creates a plain object from a CreateTripRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.CreateTripRequest
             * @static
             * @param {rental.v1.CreateTripRequest} message CreateTripRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateTripRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.start = null;
                    object.carId = "";
                }
                if (message.start != null && message.hasOwnProperty("start"))
                    object.start = $root.rental.v1.Location.toObject(message.start, options);
                if (message.carId != null && message.hasOwnProperty("carId"))
                    object.carId = message.carId;
                return object;
            };

            /**
             * Converts this CreateTripRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.CreateTripRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateTripRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateTripRequest;
        })();

        v1.GetTripRequest = (function() {

            /**
             * Properties of a GetTripRequest.
             * @memberof rental.v1
             * @interface IGetTripRequest
             * @property {string|null} [id] GetTripRequest id
             */

            /**
             * Constructs a new GetTripRequest.
             * @memberof rental.v1
             * @classdesc Represents a GetTripRequest.
             * @implements IGetTripRequest
             * @constructor
             * @param {rental.v1.IGetTripRequest=} [properties] Properties to set
             */
            function GetTripRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTripRequest id.
             * @member {string} id
             * @memberof rental.v1.GetTripRequest
             * @instance
             */
            GetTripRequest.prototype.id = "";

            /**
             * Decodes a GetTripRequest message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.GetTripRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.GetTripRequest} GetTripRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTripRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.GetTripRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a GetTripRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetTripRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetTripRequest} GetTripRequest
             */
            GetTripRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetTripRequest)
                    return object;
                let message = new $root.rental.v1.GetTripRequest();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a GetTripRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetTripRequest
             * @static
             * @param {rental.v1.GetTripRequest} message GetTripRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTripRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.id = "";
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                return object;
            };

            /**
             * Converts this GetTripRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.GetTripRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTripRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTripRequest;
        })();

        v1.GetTripsRequest = (function() {

            /**
             * Properties of a GetTripsRequest.
             * @memberof rental.v1
             * @interface IGetTripsRequest
             * @property {rental.v1.TripStatus|null} [status] GetTripsRequest status
             */

            /**
             * Constructs a new GetTripsRequest.
             * @memberof rental.v1
             * @classdesc Represents a GetTripsRequest.
             * @implements IGetTripsRequest
             * @constructor
             * @param {rental.v1.IGetTripsRequest=} [properties] Properties to set
             */
            function GetTripsRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTripsRequest status.
             * @member {rental.v1.TripStatus} status
             * @memberof rental.v1.GetTripsRequest
             * @instance
             */
            GetTripsRequest.prototype.status = 0;

            /**
             * Decodes a GetTripsRequest message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.GetTripsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.GetTripsRequest} GetTripsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTripsRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.GetTripsRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.status = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a GetTripsRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetTripsRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetTripsRequest} GetTripsRequest
             */
            GetTripsRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetTripsRequest)
                    return object;
                let message = new $root.rental.v1.GetTripsRequest();
                switch (object.status) {
                case "TS_NOT_SPECIFIED":
                case 0:
                    message.status = 0;
                    break;
                case "IN_PROGERSS":
                case 1:
                    message.status = 1;
                    break;
                case "FINISHED":
                case 2:
                    message.status = 2;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a GetTripsRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetTripsRequest
             * @static
             * @param {rental.v1.GetTripsRequest} message GetTripsRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTripsRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.status = options.enums === String ? "TS_NOT_SPECIFIED" : 0;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.rental.v1.TripStatus[message.status] : message.status;
                return object;
            };

            /**
             * Converts this GetTripsRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.GetTripsRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTripsRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTripsRequest;
        })();

        v1.GetTripsResponse = (function() {

            /**
             * Properties of a GetTripsResponse.
             * @memberof rental.v1
             * @interface IGetTripsResponse
             * @property {Array.<rental.v1.ITripEntity>|null} [trips] GetTripsResponse trips
             */

            /**
             * Constructs a new GetTripsResponse.
             * @memberof rental.v1
             * @classdesc Represents a GetTripsResponse.
             * @implements IGetTripsResponse
             * @constructor
             * @param {rental.v1.IGetTripsResponse=} [properties] Properties to set
             */
            function GetTripsResponse(properties) {
                this.trips = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTripsResponse trips.
             * @member {Array.<rental.v1.ITripEntity>} trips
             * @memberof rental.v1.GetTripsResponse
             * @instance
             */
            GetTripsResponse.prototype.trips = $util.emptyArray;

            /**
             * Decodes a GetTripsResponse message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.GetTripsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.GetTripsResponse} GetTripsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTripsResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.GetTripsResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.trips && message.trips.length))
                            message.trips = [];
                        message.trips.push($root.rental.v1.TripEntity.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a GetTripsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetTripsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetTripsResponse} GetTripsResponse
             */
            GetTripsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetTripsResponse)
                    return object;
                let message = new $root.rental.v1.GetTripsResponse();
                if (object.trips) {
                    if (!Array.isArray(object.trips))
                        throw TypeError(".rental.v1.GetTripsResponse.trips: array expected");
                    message.trips = [];
                    for (let i = 0; i < object.trips.length; ++i) {
                        if (typeof object.trips[i] !== "object")
                            throw TypeError(".rental.v1.GetTripsResponse.trips: object expected");
                        message.trips[i] = $root.rental.v1.TripEntity.fromObject(object.trips[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetTripsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetTripsResponse
             * @static
             * @param {rental.v1.GetTripsResponse} message GetTripsResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTripsResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.trips = [];
                if (message.trips && message.trips.length) {
                    object.trips = [];
                    for (let j = 0; j < message.trips.length; ++j)
                        object.trips[j] = $root.rental.v1.TripEntity.toObject(message.trips[j], options);
                }
                return object;
            };

            /**
             * Converts this GetTripsResponse to JSON.
             * @function toJSON
             * @memberof rental.v1.GetTripsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTripsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTripsResponse;
        })();

        v1.UpdateTripRequest = (function() {

            /**
             * Properties of an UpdateTripRequest.
             * @memberof rental.v1
             * @interface IUpdateTripRequest
             * @property {string|null} [id] UpdateTripRequest id
             * @property {rental.v1.ILocation|null} [current] UpdateTripRequest current
             * @property {boolean|null} [endTrip] UpdateTripRequest endTrip
             */

            /**
             * Constructs a new UpdateTripRequest.
             * @memberof rental.v1
             * @classdesc Represents an UpdateTripRequest.
             * @implements IUpdateTripRequest
             * @constructor
             * @param {rental.v1.IUpdateTripRequest=} [properties] Properties to set
             */
            function UpdateTripRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UpdateTripRequest id.
             * @member {string} id
             * @memberof rental.v1.UpdateTripRequest
             * @instance
             */
            UpdateTripRequest.prototype.id = "";

            /**
             * UpdateTripRequest current.
             * @member {rental.v1.ILocation|null|undefined} current
             * @memberof rental.v1.UpdateTripRequest
             * @instance
             */
            UpdateTripRequest.prototype.current = null;

            /**
             * UpdateTripRequest endTrip.
             * @member {boolean} endTrip
             * @memberof rental.v1.UpdateTripRequest
             * @instance
             */
            UpdateTripRequest.prototype.endTrip = false;

            /**
             * Decodes an UpdateTripRequest message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.UpdateTripRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.UpdateTripRequest} UpdateTripRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UpdateTripRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.UpdateTripRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.current = $root.rental.v1.Location.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.endTrip = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an UpdateTripRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.UpdateTripRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.UpdateTripRequest} UpdateTripRequest
             */
            UpdateTripRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.UpdateTripRequest)
                    return object;
                let message = new $root.rental.v1.UpdateTripRequest();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.current != null) {
                    if (typeof object.current !== "object")
                        throw TypeError(".rental.v1.UpdateTripRequest.current: object expected");
                    message.current = $root.rental.v1.Location.fromObject(object.current);
                }
                if (object.endTrip != null)
                    message.endTrip = Boolean(object.endTrip);
                return message;
            };

            /**
             * Creates a plain object from an UpdateTripRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.UpdateTripRequest
             * @static
             * @param {rental.v1.UpdateTripRequest} message UpdateTripRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UpdateTripRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.current = null;
                    object.endTrip = false;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.current != null && message.hasOwnProperty("current"))
                    object.current = $root.rental.v1.Location.toObject(message.current, options);
                if (message.endTrip != null && message.hasOwnProperty("endTrip"))
                    object.endTrip = message.endTrip;
                return object;
            };

            /**
             * Converts this UpdateTripRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.UpdateTripRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UpdateTripRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UpdateTripRequest;
        })();

        v1.TripService = (function() {

            /**
             * Constructs a new TripService service.
             * @memberof rental.v1
             * @classdesc Represents a TripService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function TripService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (TripService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = TripService;

            /**
             * Callback as used by {@link rental.v1.TripService#createTrip}.
             * @memberof rental.v1.TripService
             * @typedef CreateTripCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.TripEntity} [response] TripEntity
             */

            /**
             * Calls CreateTrip.
             * @function createTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.ICreateTripRequest} request CreateTripRequest message or plain object
             * @param {rental.v1.TripService.CreateTripCallback} callback Node-style callback called with the error, if any, and TripEntity
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.createTrip = function createTrip(request, callback) {
                return this.rpcCall(createTrip, $root.rental.v1.CreateTripRequest, $root.rental.v1.TripEntity, request, callback);
            }, "name", { value: "CreateTrip" });

            /**
             * Calls CreateTrip.
             * @function createTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.ICreateTripRequest} request CreateTripRequest message or plain object
             * @returns {Promise<rental.v1.TripEntity>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.TripService#getTrip}.
             * @memberof rental.v1.TripService
             * @typedef GetTripCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Trip} [response] Trip
             */

            /**
             * Calls GetTrip.
             * @function getTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripRequest} request GetTripRequest message or plain object
             * @param {rental.v1.TripService.GetTripCallback} callback Node-style callback called with the error, if any, and Trip
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.getTrip = function getTrip(request, callback) {
                return this.rpcCall(getTrip, $root.rental.v1.GetTripRequest, $root.rental.v1.Trip, request, callback);
            }, "name", { value: "GetTrip" });

            /**
             * Calls GetTrip.
             * @function getTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripRequest} request GetTripRequest message or plain object
             * @returns {Promise<rental.v1.Trip>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.TripService#getTrips}.
             * @memberof rental.v1.TripService
             * @typedef GetTripsCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.GetTripsResponse} [response] GetTripsResponse
             */

            /**
             * Calls GetTrips.
             * @function getTrips
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripsRequest} request GetTripsRequest message or plain object
             * @param {rental.v1.TripService.GetTripsCallback} callback Node-style callback called with the error, if any, and GetTripsResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.getTrips = function getTrips(request, callback) {
                return this.rpcCall(getTrips, $root.rental.v1.GetTripsRequest, $root.rental.v1.GetTripsResponse, request, callback);
            }, "name", { value: "GetTrips" });

            /**
             * Calls GetTrips.
             * @function getTrips
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripsRequest} request GetTripsRequest message or plain object
             * @returns {Promise<rental.v1.GetTripsResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.TripService#updateTrip}.
             * @memberof rental.v1.TripService
             * @typedef UpdateTripCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Trip} [response] Trip
             */

            /**
             * Calls UpdateTrip.
             * @function updateTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IUpdateTripRequest} request UpdateTripRequest message or plain object
             * @param {rental.v1.TripService.UpdateTripCallback} callback Node-style callback called with the error, if any, and Trip
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.updateTrip = function updateTrip(request, callback) {
                return this.rpcCall(updateTrip, $root.rental.v1.UpdateTripRequest, $root.rental.v1.Trip, request, callback);
            }, "name", { value: "UpdateTrip" });

            /**
             * Calls UpdateTrip.
             * @function updateTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IUpdateTripRequest} request UpdateTripRequest message or plain object
             * @returns {Promise<rental.v1.Trip>} Promise
             * @variation 2
             */

            return TripService;
        })();

        return v1;
    })();

    return rental;
})();