export default class ZipMonster {
    static getZipData: (zipCode: string) => {
        stateCode: import("./types").StatePostalCode;
        city: string;
        county: string;
        zip: string;
        zipType: "Non-Unique" | "PO Box";
    } | undefined;
}
