import { isZipType, ZipType } from "../../types/zip-type";
import { isStatePostalCode, StatePostalCode } from "../../types/state-postal-code";
import { isLocation } from "./location";

export interface ZipInformation {
    stateCode: StatePostalCode,
    city: string,
    county: string,
    zip: string,
    zipType: ZipType,
    location?: Location
}

export const isZipInformation = (obj: any): obj is ZipInformation => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["stateCode"] === "string" && isStatePostalCode(obj["stateCode"]),
            typeof obj["city"] === "string",
            typeof obj["county"] === "string",
            typeof obj["zip"] === "string",
            typeof obj["zipType"] === "string" && isZipType(obj["zipType"]),
            "location" in obj ? isLocation(obj["location"]) : true
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}
