export enum ZipType {
    NonUnique = "Non-Unique",
    POBox = "PO Box"
}

export const isZipType = (value: string): value is ZipType => {
    return Object.values(ZipType)
        .map(el => el.toString())
        .includes(value);
}
