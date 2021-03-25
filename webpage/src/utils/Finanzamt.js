import React from 'react';
import csv from 'csv-parser';
import { readFile} from 'fs-web'; 
import { readdir } from 'fs-web/dist/cjs/core';


export default class Finanzamt {
    constructor() {
        this.plzFinanzamtMap = {
            id: [],
            bufa_nr: [],
            finanzamt: ['München', 'Berlin', 'Hamburg'],
            street: [],
            house_number: [],
            postcode: {80331: 0, 10115: 1, 20095: 2},  // map value to index. map all others from index to value
            city: [],
            email: ['münchen@sample.de', 'berlin@sample.de', 'hamburg@sample.de'],
            contact_url: []
        };
        this.loaded = false;  
        this.loadCsv()
    }

    loadCsv() {
        // const filePath = '../assets/finanzamt_mapping.csv';  // TODO
        // const filePath = 'file:///home/stefan/data/fiskaly/antrag-148AO-wizard-tool/webpage/src/assets/finanzamt_mapping.csv'
        // const readData = [];
        // readFile(filePath)
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(err => {
        //     console.log(err);
        // });
            // .pipe(csv())
        //     .on('data', data => readData.push(data))
        //     .on('end', () => {
        //         console.log('Finished reading csv');
        //     });
        // return Promise.all(readData)
        // .then(data => {
        //     for (let i = 0; i < data.length; i++) {
        //         const row = data[i];
        //         Object.keys(row).forEach(key => {
        //             if (key === "postcode") {
        //                 this.plzFinanzamtMap.postcode[row[key]] = i;
        //             } else {
        //                 this.plzFinanzamtMap[key].push(row[key]);
        //             }
        //         });
        //     }
        // })
        // .catch(err => console.log(err));
        this.loaded = true;
    }

    getPossibleFinanzamtValues() {
        if (!this.loaded) {
            // TODO
        }
        return this.plzFinanzamtMap.finanzamt;
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
        if (!this.loaded) {
            // TODO
        }

        try { // still needed? 
            postalCode = Number(postalCode);
        } catch {
            return null;
        }

        const id = this.plzFinanzamtMap.postcode[postalCode];
        return id;
    }

}
