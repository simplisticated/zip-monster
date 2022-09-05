export interface StateAreaCode {
    stateCode: string,
    areaCodes: string[]
}

export const isStateAreaCode = (obj: any): obj is StateAreaCode => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["stateCode"] === "string",
            Array.isArray(obj["areaCodes"]) && obj["areaCodes"].every(el => typeof el === "string")
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}
