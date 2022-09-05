export interface Location {
    latitude: number,
    longitude: number
}

export const isLocation = (obj: any): obj is Location => {
    if (typeof obj === "object") {
        const requirements = [
            typeof obj["latitude"] === "number",
            typeof obj["longitude"] === "number"
        ];
        return !requirements.includes(false);
    } else {
        return false;
    }
}
