import store from "../data/store";
import { ZipInformation } from "../data/models/zip-information";
import { ZipType } from "../types/zip-type";

export const findZip = (filter?: ZipFilter, source?: ZipInformation[]): ZipInformation[] => {
    let result = Array.from(
        source ?? store.zipCodesInformation
    );

    if (!filter) {
        return result;
    }

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

    const applyRegularExpressionFilter = (filter: RegExp, stringFieldName: keyof ZipInformation) => {
        const regularExpression = filter;
        result = result.filter(el => regularExpression.test(el[stringFieldName] as string));
    }

    const applyLocationFlexibleFilter = (filter: ZipSearch_LocationFlexibleFilter, locationFieldName: keyof ZipInformation) => {
        const latitudeRequirement = filter.latitude;
        const longitudeRequirement = filter.longitude;

        if (latitudeRequirement || longitudeRequirement) {
            result = result.filter(el => el.location !== undefined);

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
    caseSensitive: boolean,
    wholeMatch: boolean
}

const is_zipSearch_stringFlexibleFilter = (obj: any): obj is ZipSearch_StringFlexibleFilter => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["value"] === "string",
            typeof obj["caseSensitive"] === "boolean",
            typeof obj["wholeMatch"] === "boolean"
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}

export interface ZipSearch_LocationFlexibleFilter {
    latitude?: {
        value: number,
        direction: "to-north" | "to-south" | "here"
    },
    longitude?: {
        value: number,
        direction: "to-east" | "to-west" | "here"
    }
}

export interface ZipFilter {
    zip?: string | ZipSearch_StringFlexibleFilter | RegExp,
    zipType?: ZipType,
    stateCode?: string | ZipSearch_StringFlexibleFilter | RegExp,
    county?: string | ZipSearch_StringFlexibleFilter | RegExp,
    city?: string | ZipSearch_StringFlexibleFilter | RegExp,
    location?: ZipSearch_LocationFlexibleFilter,
    withLocationOnly?: boolean
}
