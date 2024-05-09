import store from "../data/store";
import { isZipInformation, ZipInformation } from "../data/models/zip-information";
import { isZipType, ZipType } from "../types/zip-type";
import { isPointWithinRadius } from 'geolib';

export const findZip = (filter?: ZipFilter): ZipInformation[] => {
    if (!filter) {
        return Array.from(
            store.zipCodesInformation
        );
    }
    
    if (!isZipFilter(filter)) {
        return [];
    }

    let result = Array.from(
        filter.source ?? store.zipCodesInformation
    );

    const applyStringFilter = (filter: string, stringFieldName: keyof ZipInformation) => {
        const searchValue = filter;
        result = result.filter(el => el[stringFieldName]!.toString() === searchValue);
    }

    const applyStringFlexibleFilter = (filter: ZipSearch_StringFlexibleFilter, stringFieldName: keyof ZipInformation) => {
        const searchValue = filter.caseSensitive
            ? filter.value
            : filter.value.toLowerCase();
        result = result.filter(el => {
            const valueFromElement = filter.caseSensitive
                ? el[stringFieldName] as string
                : (el[stringFieldName] as string).toLowerCase();
            return filter.wholeMatch
                ? valueFromElement === searchValue
                : valueFromElement.includes(searchValue);
        });
    }

    const applyRadiusFilter = (latitude: number, longitude: number, radius: number) => {
        result = result.filter(el => {
            return isPointWithinRadius(
                    { latitude: el.location!.latitude, longitude: el.location!.longitude },
                    { latitude, longitude },
                    radius
                )
        })
    }

    const applyRegularExpressionFilter = (filter: RegExp, stringFieldName: keyof ZipInformation) => {
        const regularExpression = filter;
        result = result.filter(el => regularExpression.test(el[stringFieldName] as string));
    }

    const applyLocationFlexibleFilter = (filter: ZipSearch_LocationFlexibleFilter, locationFieldName: keyof ZipInformation) => {
        const latitudeRequirement = filter.latitude;
        const longitudeRequirement = filter.longitude;

        if (latitudeRequirement || longitudeRequirement) {
            result = result.filter(el => el.location !== undefined);

            if (latitudeRequirement && latitudeRequirement.direction === 'radius' && longitudeRequirement && latitudeRequirement.direction === 'radius' && filter.radius) {
                applyRadiusFilter(latitudeRequirement.value, longitudeRequirement.value, filter.radius)
            } else {
                if (latitudeRequirement) {
                    result = result.filter(el => {
                        switch (latitudeRequirement.direction) {
                            case "to-north": {
                                return el.location!.latitude > latitudeRequirement.value;
                            }
                            case "to-south": {
                                return el.location!.latitude < latitudeRequirement.value;
                            }
                            case "here": {
                                return el.location!.latitude === latitudeRequirement.value;
                            }
                        }
                    });
                }

                if (longitudeRequirement) {
                    result = result.filter(el => {
                        switch (longitudeRequirement.direction) {
                            case "to-east": {
                                return el.location!.longitude > longitudeRequirement.value;
                            }
                            case "to-west": {
                                return el.location!.longitude < longitudeRequirement.value;
                            }
                            case "here": {
                                return el.location!.longitude === longitudeRequirement.value;
                            }
                        }
                    });
                }
            }
        }
    }

    if (filter.zip) {
        if (typeof filter.zip === "string") {
            applyStringFilter(
                filter.zip,
                "zip"
            );
        } else if (is_zipSearch_stringFlexibleFilter(filter.zip)) {
            applyStringFlexibleFilter(
                filter.zip,
                "zip"
            );
        } else if (filter.zip instanceof RegExp) {
            applyRegularExpressionFilter(
                filter.zip,
                "zip"
            );
        }
    }

    if (filter.stateCode) {
        if (typeof filter.stateCode === "string") {
            applyStringFilter(
                filter.stateCode,
                "stateCode"
            );
        } else if (is_zipSearch_stringFlexibleFilter(filter.stateCode)) {
            applyStringFlexibleFilter(
                filter.stateCode,
                "stateCode"
            );
        } else if (filter.stateCode instanceof RegExp) {
            applyRegularExpressionFilter(
                filter.stateCode,
                "stateCode"
            );
        }
    }

    if (filter.county) {
        if (typeof filter.county === "string") {
            applyStringFilter(
                filter.county,
                "county"
            );
        } else if (is_zipSearch_stringFlexibleFilter(filter.county)) {
            applyStringFlexibleFilter(
                filter.county,
                "county"
            );
        } else if (filter.county instanceof RegExp) {
            applyRegularExpressionFilter(
                filter.county,
                "county"
            );
        }
    }

    if (filter.city) {
        if (typeof filter.city === "string") {
            applyStringFilter(
                filter.city,
                "city"
            );
        } else if (is_zipSearch_stringFlexibleFilter(filter.city)) {
            applyStringFlexibleFilter(
                filter.city,
                "city"
            );
        } else if (filter.city instanceof RegExp) {
            applyRegularExpressionFilter(
                filter.city,
                "city"
            );
        }
    }

    if (filter.zipType) {
        result = result.filter(el => el.zipType === filter.zipType);
    }

    if (filter.location) {
        applyLocationFlexibleFilter(
            filter.location,
            "location"
        );
    }

    if (filter.withLocationOnly) {
        result = result.filter(el => el.location !== undefined);
    }

    return result;
}

export interface ZipSearch_StringFlexibleFilter {
    value: string,
    caseSensitive?: boolean,
    wholeMatch: boolean
}

const is_zipSearch_stringFlexibleFilter = (obj: any): obj is ZipSearch_StringFlexibleFilter => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["value"] === "string",
            "caseSensitive" in obj ? typeof obj["caseSensitive"] === "boolean" : true,
            typeof obj["wholeMatch"] === "boolean"
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}

export interface ZipSearch_LocationFlexibleFilter_LatitudeCondition {
    value: number,
    direction: "to-north" | "to-south" | "here" | "radius"
}

const is_zipSearch_locationFlexibleFilter_latitudeCondition = (obj: any): obj is ZipSearch_LocationFlexibleFilter_LatitudeCondition => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["value"] === "number",
            typeof obj["direction"] === "string"
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}

export interface ZipSearch_LocationFlexibleFilter_LongitudeCondition {
    value: number,
    direction: "to-east" | "to-west" | "here" | "radius"
}

const is_zipSearch_locationFlexibleFilter_longitudeCondition = (obj: any): obj is ZipSearch_LocationFlexibleFilter_LongitudeCondition => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["value"] === "number",
            typeof obj["direction"] === "string"
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}

export interface ZipSearch_LocationFlexibleFilter {
    latitude?: ZipSearch_LocationFlexibleFilter_LatitudeCondition,
    longitude?: ZipSearch_LocationFlexibleFilter_LongitudeCondition,
    radius?: number
}

const is_zipSearch_locationFlexibleFilter = (obj: any): obj is ZipSearch_LocationFlexibleFilter => {
    if (typeof obj === "object") {
        const requirements = [
            "latitude" in obj
                ? is_zipSearch_locationFlexibleFilter_latitudeCondition(obj["latitude"])
                : true,
            "longitude" in obj
                ? is_zipSearch_locationFlexibleFilter_longitudeCondition(obj["longitude"])
                : true,
            (obj?.latitude?.direction === 'radius' || obj?.longitude?.direction === 'radius') && obj.radius   
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}

export interface ZipFilter {
    zip?: string | ZipSearch_StringFlexibleFilter | RegExp,
    zipType?: ZipType,
    stateCode?: string | ZipSearch_StringFlexibleFilter | RegExp,
    county?: string | ZipSearch_StringFlexibleFilter | RegExp,
    city?: string | ZipSearch_StringFlexibleFilter | RegExp,
    location?: ZipSearch_LocationFlexibleFilter,
    withLocationOnly?: boolean,
    source?: ZipInformation[]
}

const isZipFilter = (obj: any): obj is ZipFilter => {
    if (typeof obj === "object") {
        const requirements = [
            "zip" in obj
                ? typeof obj["zip"] === "string" || is_zipSearch_stringFlexibleFilter(obj["zip"]) || obj["zip"] instanceof RegExp
                : true,
            "zipType" in obj
                ? typeof obj["zipType"] === "string" && isZipType(obj["zipType"])
                : true,
            "stateCode" in obj
                ? typeof obj["stateCode"] === "string" || is_zipSearch_stringFlexibleFilter(obj["stateCode"]) || obj["stateCode"] instanceof RegExp
                : true,
            "county" in obj
                ? typeof obj["county"] === "string" || is_zipSearch_stringFlexibleFilter(obj["county"]) || obj["county"] instanceof RegExp
                : true,
            "city" in obj
                ? typeof obj["city"] === "string" || is_zipSearch_stringFlexibleFilter(obj["city"]) || obj["city"] instanceof RegExp
                : true,
            "location" in obj
                ? is_zipSearch_locationFlexibleFilter(obj["location"])
                : true,
            "withLocationOnly" in obj
                ? typeof obj["withLocationOnly"] === "boolean"
                : true,
            "source" in obj
                ? Array.isArray(obj["source"]) && obj["source"].every(isZipInformation)
                : true
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}
