import { StatePostalCode } from "../types/state-postal-code";
import { ZipMonster } from "../engine/index";
import { isZipInformation } from "../data/models/zip-information";

test("Find Boston by exact zip code", () => {
    const result = ZipMonster.find({
        zip: "02109"
    });

    if (result.length > 0) {
        expect(result[0].city).toBe("Boston");
    } else {
        fail("");
    }
})

test("Find Boston by part of zip code", () => {
    const result = ZipMonster.find({
        zip: {
            value: "02",
            caseSensitive: true,
            wholeMatch: false
        }
    });
    const boston = result.filter(el => el.city === "Boston")[0];
    expect(isZipInformation(boston)).toBeTruthy();
})

test("Find Boston by part of zip code and part of name", () => {
    const result = ZipMonster.find({
        zip: {
            value: "02",
            caseSensitive: true,
            wholeMatch: false
        },
        city: {
            value: "BOST",
            caseSensitive: false,
            wholeMatch: false
        }
    });
    const boston = result.filter(el => el.city === "Boston");

    if (result) {
        expect(result.length).toBeGreaterThan(0);
    } else {
        fail("");
    }
})

test("Alaska is further to north than Boston", () => {
    const boston = ZipMonster.find({
        zip: "02109"
    })[0];

    if (!boston || !boston.location) {
        fail("");
    }

    const result = ZipMonster.find({
        location: {
            latitude: {
                value: boston.location.latitude,
                direction: "to-north"
            }
        }
    });
    const hasAlaska = result.find(el => el.stateCode === StatePostalCode.AK) !== undefined;

    if (result.length > 0) {
        expect(hasAlaska).toBe(true);
    } else {
        fail("");
    }
})

test("Wrong zip code and name", () => {
    const result = ZipMonster.find({
        zip: {
            value: "9000",
            caseSensitive: true,
            wholeMatch: false
        },
        city: "Boston"
    });
    expect(result.length).toBe(0);
})

test("Find cities between Austin and Oklahoma City", () => {
    const Austin = ZipMonster.find({
        city: "Austin",
        stateCode: "TX",
        withLocationOnly: true
    })[0];
    const placesToNorthFromAustin = ZipMonster.find({
        location: {
            latitude: {
                value: Austin.location!.latitude,
                direction: "to-north"
            },
            longitude: {
                value: Austin.location!.longitude,
                direction: "to-east"
            }
        }
    });
    
    const OklahomaCity = ZipMonster.find({
        city: "Oklahoma City",
        stateCode: "OK",
        withLocationOnly: true
    })[0];
    const placesBetweenAustinAndOklahomaCity = ZipMonster.find({
        location: {
            latitude: {
                value: OklahomaCity.location!.latitude,
                direction: "to-south"
            },
            longitude: {
                value: OklahomaCity.location!.longitude,
                direction: "to-west"
            }
        }
    }, placesToNorthFromAustin);
    expect(placesBetweenAustinAndOklahomaCity.length).toBeGreaterThan(0);
})
