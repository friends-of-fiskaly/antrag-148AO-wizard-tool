import React from 'react';

export default {
    plzFinanzamtMap: {
        80331: "München", 
        10115: "Berlin", 
        20095: "Hamburg"
    },

    getPossibleFinanzamtValues: () => {
        return Object.values(this.plzFinanzamtMap).map(value => {  // sort in alphabetical order
            return <option value={value}>{value}</option>;
        });
    },
        
    getFinanzamtFromPostalCode: (postalCode) => {
        try {
            postalCode = String(postalCode)
        } catch {
            return null; 
        }

        return (postalCode in this.plzFinanzamtMap) ? this.plzFinanzamtMap[postalCode]: null;
    }

};
