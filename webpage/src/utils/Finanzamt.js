import finanzamtData from '../assets/finanzamt_data_duplicates_removed.js';

export default class Finanzamt {
    constructor() {
        this.plzFinanzamtMap = {
            "id": [],
            "bufa_nr": [],
            "finanzamt": [],
            "street": [],
            "house_number": [],
            "postcode": {},
            "city": [],
            "email": [],
            "contact_url": []
        };
        this.preparePlzFinanzamtMap();
    }

    preparePlzFinanzamtMap() {
        Object.keys(finanzamtData).forEach(key => {
            const unorderedData = finanzamtData[key];  // object{index: value}
            if (key === "postcode") {
                Object.keys(unorderedData).forEach(i => {
                    const code = unorderedData[i];
                    this.plzFinanzamtMap.postcode[code] = i;
                });
                return;
            }

            for (let i = 0; i < Object.keys(unorderedData).length; i++) {
                const value = unorderedData[i];
                this.plzFinanzamtMap[key].push(value);
            }
        });
    }

    getPossibleFinanzamtValues() {
        return this.plzFinanzamtMap.finanzamt.slice().sort();
    }

    getFinanzamtFromPostalCode(postalCode) {
        const id = this.getIdFromPostalCode(postalCode);

        return (id !== undefined) ? this.plzFinanzamtMap.finanzamt[id]: null;
    }

    getMailFromPostalCode(postalCode) {
        const id = this.getIdFromPostalCode(postalCode);

        return (id !== undefined) ? this.plzFinanzamtMap.email[id]: null;
    }

    getIdFromPostalCode(postalCode) {
        try {
            postalCode = String(postalCode);
        } catch {
            return null;
        }

        const id = this.plzFinanzamtMap.postcode[postalCode];
        return id;
    }

}
