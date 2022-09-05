import store from "../data/store";
import { ZipInformation } from "../data/models/zip-information";

export const findZip = (filter?: ZipFilter, source?: ZipInformation[]): ZipInformation[] => {
    let allZipCodes = source ?? store.zipCodesInformation;

    if (isZipFilterByZipCode(filter)) {
        return allZipCodes.filter(el => el.zip.toLowerCase() === filter.byZip.toLowerCase());
    } else if (isZipFilterByCity(filter)) {
        return allZipCodes.filter(el => el.city.toLowerCase() === filter.byCity.toLowerCase());
    } else if (isZipFilterByCounty(filter)) {
        return allZipCodes.filter(el => el.county.toLowerCase() === filter.byCounty.toLowerCase());
    } else if (isZipFilterByStateCode(filter)) {
        return allZipCodes.filter(el => el.stateCode.toLowerCase() === filter.byStateCode.toLowerCase());
    } else {
        return allZipCodes;
    }
}

export interface ZipFilterByZipCode {
    byZip: string
}

const isZipFilterByZipCode = (obj: any): obj is ZipFilterByZipCode => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["byZip"] === "string"
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}

export interface ZipFilterByCity {
    byCity: string
}

const isZipFilterByCity = (obj: any): obj is ZipFilterByCity => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["byCity"] === "string"
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}

export interface ZipFilterByCounty {
    byCounty: string
}

const isZipFilterByCounty = (obj: any): obj is ZipFilterByCounty => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["byCounty"] === "string"
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}

export interface ZipFilterByStateCode {
    byStateCode: string
}

const isZipFilterByStateCode = (obj: any): obj is ZipFilterByStateCode => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["byStateCode"] === "string"
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}

export type ZipFilter = ZipFilterByZipCode | ZipFilterByCity | ZipFilterByCounty | ZipFilterByStateCode;
