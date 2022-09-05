import { isLocation } from "./location";

export interface ZipLocation {
    zip: string,
    location: Location
}

export const isZipLocation = (obj: any): obj is ZipLocation => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["zip"] === "string",
            isLocation(obj["location"])
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}
