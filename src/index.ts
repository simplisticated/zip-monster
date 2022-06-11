import store from "./data/store";

export default class ZipMonster {

    public static getZipData = (
        zipCode: string
    ) => {
        const zipCityState = store.zipCityStateList.find(state => state.zip === zipCode);
        
        if (zipCityState) {
            return {
                ...zipCityState
            };
        }
    }
}
