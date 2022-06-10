"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStateAreaCodes = exports.getZipCoordinateList = exports.getZipCityStateList = void 0;
const getZipCityStateList = () => {
    const data = [
        require("../resources/zip-codes/alabama").default,
        require("../resources/zip-codes/alaska").default,
        require("../resources/zip-codes/arizona").default,
        require("../resources/zip-codes/arkansas").default,
        require("../resources/zip-codes/california").default,
        require("../resources/zip-codes/colorado").default,
        require("../resources/zip-codes/connecticut").default,
        require("../resources/zip-codes/delaware").default,
        require("../resources/zip-codes/district-of-columbia").default,
        require("../resources/zip-codes/florida").default,
        require("../resources/zip-codes/georgia").default,
        require("../resources/zip-codes/hawaii").default,
        require("../resources/zip-codes/idaho").default,
        require("../resources/zip-codes/illinois").default,
        require("../resources/zip-codes/indiana").default,
        require("../resources/zip-codes/iowa").default,
        require("../resources/zip-codes/kansas").default,
        require("../resources/zip-codes/kentucky").default,
        require("../resources/zip-codes/lousiana").default,
        require("../resources/zip-codes/maine").default,
        require("../resources/zip-codes/maryland").default,
        require("../resources/zip-codes/massachusetts").default,
        require("../resources/zip-codes/michigan").default,
        require("../resources/zip-codes/minnesota").default,
        require("../resources/zip-codes/mississippi").default,
        require("../resources/zip-codes/missouri").default,
        require("../resources/zip-codes/montana").default,
        require("../resources/zip-codes/nebraska").default,
        require("../resources/zip-codes/nevada").default,
        require("../resources/zip-codes/new-hampshire").default,
        require("../resources/zip-codes/new-jersey").default,
        require("../resources/zip-codes/new-mexico").default,
        require("../resources/zip-codes/new-york").default,
        require("../resources/zip-codes/north-carolina").default,
        require("../resources/zip-codes/north-dakota").default,
        require("../resources/zip-codes/ohio").default,
        require("../resources/zip-codes/oklahoma").default,
        require("../resources/zip-codes/oregon").default,
        require("../resources/zip-codes/pennsylvania").default,
        require("../resources/zip-codes/rhode-island").default,
        require("../resources/zip-codes/south-carolina").default,
        require("../resources/zip-codes/south-dakota").default,
        require("../resources/zip-codes/tennessee").default,
        require("../resources/zip-codes/texas").default,
        require("../resources/zip-codes/utah").default,
        require("../resources/zip-codes/vermont").default,
        require("../resources/zip-codes/virginia").default,
        require("../resources/zip-codes/washington").default,
        require("../resources/zip-codes/west-virginia").default,
        require("../resources/zip-codes/wisconsin").default,
        require("../resources/zip-codes/wyoming").default
    ];
    return data.reduce((previous, current) => {
        return previous.concat(current);
    }, []);
};
exports.getZipCityStateList = getZipCityStateList;
const getZipCoordinateList = () => {
    return require("../resources/zip-location").default.map((el) => {
        return {
            zip: el.zip,
            location: {
                latitude: el.lat,
                longitude: el.lng
            }
        };
    });
};
exports.getZipCoordinateList = getZipCoordinateList;
const getStateAreaCodes = () => {
    return require("../resources/state-area-codes").default;
};
exports.getStateAreaCodes = getStateAreaCodes;
