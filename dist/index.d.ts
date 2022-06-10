import { StatePostalCode } from "./types";
export default class ZipMonster {
    static getStateCodeFromZipCode: (zipCode: string) => StatePostalCode | undefined;
}
