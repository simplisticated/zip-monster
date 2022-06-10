import store from "./data/store"
import { StatePostalCode } from "./types"

export default class ZipMonster {

    public static getStateCodeFromZipCode = (
        zipCode: string
    ): StatePostalCode | undefined => {
        return store.zipCityStateList.find(state => state.zip === zipCode)?.stateCode;
    }
}
