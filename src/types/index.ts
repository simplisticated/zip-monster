export type StatePostalCode = "AL" | "AK" | "AZ" | "AR" | "CA" | "CO" | "CT" | "DE" | "DC" | "FL" | "GA" | "HI" | "ID" | "IL" | "IN" | "IA" | "KS" | "KY" | "LA" | "ME" | "MD" | "MA" | "MI" | "MN" | "MS" | "MO" | "MT" | "NE" | "NV" | "NH" | "NJ" | "NM" | "NY" | "NC" | "ND" | "OH" | "OK" | "OR" | "PA" | "RI" | "SC" | "SD" | "TN" | "TX" | "UT" | "VT" | "VA" | "WA" | "WV" | "WI" | "WY";

export type StateName = "Alabama" | "Alaska" | "Arizona" | "Arkansas" | "California" | "Colorado" | "Connecticut" | "Delaware" | "District of Columbia" | "Florida" | "Georgia" | "Hawaii" | "Idaho" | "Illinois" | "Indiana" | "Iowa" | "Kansas" | "Kentucky" | "Louisiana" | "Maine" | "Maryland" | "Massachusetts" | "Michigan" | "Minnesota" | "Mississippi" | "Missouri" | "Montana" | "Nebraska" | "Nevada" | "New Hampshire" | "New Jersey" | "New Mexico" | "New York" | "North Carolina" | "North Dakota" | "Ohio" | "Oklahoma" | "Oregon" | "Pennsylvania" | "Rhode Island" | "South Carolina" | "South Dakota" | "Tennessee" | "Texas" | "Utah" | "Vermont" | "Virginia" | "Washington" | "West Virginia" | "Wisconsin" | "Wyoming";

export type StateNameAbbreviation = "Ala." | "Alaska" | "Ariz." | "Ark." | "Calif." | "Colo." | "Conn." | "Del." | "D.C." | "Fla." | "Ga." | "Hawaii" | "Idaho" | "Ill." | "Ind." | "Iowa" | "Kans." | "Ky." | "La." | "Maine" | "Md." | "Mass." | "Mich." | "Minn." | "Miss." | "Mo." | "Mont." | "Nebr." | "Nev." | "N.H." | "N.J." | "N.M." | "N.Y." | "N.C." | "N.D." | "Ohio" | "Okla." | "Ore." | "Pa." | "R.I." | "S.C." | "S.D." | "Tenn." | "Tex." | "Utah" | "Vt." | "Va." | "Wash." | "W.Va." | "Wis." | "Wyo.";

export interface ZipCityState {
    stateCode: StatePostalCode,
    city: string,
    county: string,
    zip: string,
    zipType: "Non-Unique" | "PO Box"
}

export interface Location {
    latitude: number,
    longitude: number
}

export interface ZipLocation {
    zip: string,
    location: Location
}

export interface StateAreaCode {
    stateCode: string,
    areaCodes: string[]
}