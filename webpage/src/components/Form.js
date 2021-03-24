import React from 'react';
import config from '../../config';
import { getCurrentDate } from '../utils/Utils.js';
import Finanzamt from '../utils/Finanzamt.js';

class Antrag148AO extends React.Component {
    constructor() {
        super();
        this.state = {
            0: {
                labelValue: "Firmenname: ", // name of the company
                value: null, 
                inputType: "text"
            },
            1: {
                labelValue: "Vor und Zuname: ", // first and last name of customer
                value: null, 
                inputType: "text"
            },
            2: {
                labelValue: "Postleitzahl: ",  // postal code -> 5 digits in germany
                value: null, 
                inputType: "number"
            },
            3: {
                labelValue: "Zuständiges Finanzamt: ", // finanzamt responsible for customer 
                value: null, 
                inputType: "text"
            },
            4: {
                labelValue: "Steuernummer: ", 
                value: null, 
                inputType: "text"
            },
            5: {
                labelValue: "Kassenanbieter: ", // provider of clients, potentially the customer itself
                value: null, 
                inputType: "text"
            },
            6: {
                labelValue: "Verlängerung der Frist bis: ",  // date until v1 of fiskaly cloud TSE should still be usable
                value: "31.12.2021", 
                inputType: "date"
            },
            7: {
                labelValue: "fiskaly Cloud TSE verfügbar beim Anbieter seit: ",  // date of availability of fiskaly cloud tse v1
                value: "01.01.2020", 
                inputType: "date"
            },
            8: {
                labelValue: "Kassenanbieter integriert seit:", // date since integration and usage of fiskaly cloud tse v1
                value: "", 
                inputType: "date"
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDefaultMailBody = this.getDefaultMailBody.bind(this);
        this.handlePlzChange = this.handlePlzChange.bind(this);
        this.generateForm = this.generateForm.bind(this);
    }

    handleChange(event) {
        // this.setState({[event.target.name]: event.target.value});
        const target = event.currentTarget;
        this.setState(prevState => {
            let currentState = Object.assign({}, prevState);
            currentState[target.name].value = target.value;
            return { currentState };
        });
    }

    handlePlzChange(event) {
        this.handleChange(event);
        // select finanzamt
        const selectedFinanzamt = Finanzamt.getFinanzamtFromPostalCode(event.currentTarget.value);
        if (selectedFinanzamt != null) {
            this.setState({3: selectedFinanzamt});
        }
    }
    
    generateForm() {
        const fields = Object.keys(this.state).map(key => {  // sort in ascending order
            return <fieldset>
                <label>{this.state[key].labelValue}</label>
                {key => {
                    if (key === 2) {
                        return <input 
                            key={key}
                            id="inputField"
                            type={this.state[key].inputType}
                            name={key}
                            onChange={this.handlePlzChange}
                            value={this.state[key].value}
                            required
                        />;
                            
                    } else if (key === 3) { // finanzamt
                        return <select value="Berlin" onChange={this.handleChange} key={key}>
                                {/* {this.getPossibleFinanzamtValues()} */}
                                <option value="Berlin">Berlin</option>
                                <option value="Hamburg">Hamburg</option>
                                <option value="München">München</option>
                            </select>;

                    } else {
                        return <input
                            key={key}
                            id="inputField"
                            type={this.state[key].inputType}
                            name={key}
                            onChange={this.handleChange}
                            value={this.state[key].value}
                            required
                        />;
            }}}
            <p></p>
            </fieldset>;
        });
        fields.push(
            <fieldset key="submitButton" id="submitButton">
                <input type="submit" value="Absenden"/>
            </fieldset>
        )
        return <form onSubmit={this.handleSubmit} id="form148">{fields}</form>;
        // return <form onSubmit={this.handleSubmit} id="form148">
        //     <fieldset>
        //         <label>Finanzamt</label>
        //         <select >
        //             <option value="Berlin">Berlin</option>
        //             <option value="Hamburg">Hamburg</option>
        //             <option value="München">München</option>
        //         </select>
        //     </fieldset>
        //     <fieldset>
        //         <label>Steuernummer</label>
        //         <input type="text"/>
        //     </fieldset>
        // </form>;
    }

    handleSubmit(event) {
        // open mail program of user and prepare mail sent to finanzamt with default text and selected values
        event.preventDefault();

        const link = `mailto:${config.mailReceiverOfForm148}?subject=${config.mailSubject}&body=${this.getDefaultMailBody()}`;
        const errMessage = 'Could not open mail program';

        try {
            window.open(link);  // TODO: Mail program not opening on windows --> provide documents as download
        } catch {
            alert(errMessage);
        }
        
    }

    getDefaultMailBody() {
        const body = `
        An: ${this.state.zuständigesFinanzamt}%0D%0A
        %0D%0A
        Datum: ${getCurrentDate()} %0D%0A
        Abs.: ${this.state.steuerpflichtiger}  %0D%0A
        Steuernummer: ${this.state.steuerNummer} %0D%0A
        %0D%0A
        %0D%0A
        Betreff: Antrag nach § 148 AO – Verlängerung der Frist zur vollständigen Implementierung einer Cloud-TSE %0D%0A
        %0D%0A
        ${config.mailAnrede}, %0D%0A
        hiermit beantragen wir die Verlängerung der durch die Nichtbeanstandungsregelung eingeräumten Frist über den 31. März 2021 hinaus gemäß § 148 AO wegen Vorliegens unbilliger sachlichen Härte bis zum ${this.state.fristAblauf} . Jedoch wollen wir klarstellen, dass es sich im folgenden Antrag um keine allgemeine Fristverlängerung handelt, sondern um einen Übergangszeitraum in welchem eine TSE in Evaluierung beim Bundesamt für Sicherheit in der Informationstechnik (BSI), zum Einsatz kommt.  %0D%0A
        Wir beabsichtigen zur Einhaltung der Anforderungen des § 146a AO die Nutzung der cloudbasierten TSE der fiskaly Germany GmbH welche durch unseren Kassen-Dienstleister ${this.state.kassenDienstleister} integriert wurde. ${this.state.kassenDienstleister} bietet seit dem ${this.state.verfügbarkeitsDatumKasse} die fiskaly Cloud-TSE an und wir haben diese Vorabversion einer voll zertifizierten TSE bereits seit ${this.state.integrationsDatum ? this.state.integrationsDatum: this.state.verfügbarkeitsDatumKasse} im Einsatz.  Aufgrund verschiedener von uns nicht zu verantwortender Umstände hat sich die finale Zertifizierung der fiskaly Cloud-TSE verzögert. Eine detaillierte Stellungnahme dazu finden Sie im Anhang. Dementsprechend ist bereits jetzt erkennbar, dass die Inbetriebnahme der final zertifizierten Cloud-TSE nicht innerhalb der Frist bis zum 31. März 2021 abgeschlossen werden kann. Wir planen mit der aktuellen zur Zertifizierung beim BSI eingereichten Version der fiskaly Cloud-TSE zu starten. Dieses Vorgehen ist auch mit der Fachabteilung des Bundesministerium für Finanzen, Referat IVA 4 Steuern, abgestimmt. Konkret heißt das, dass wir bereits die TSE im Einsatz haben und damit Geschäftsfälle manipulationssicher dokumentieren und Signaturen auf Belege drucken.  %0D%0A
        Für das oben beschriebene Vorgehen ersuchen wir um eine Erleichterung nach § 148 AO um auf den voll zertifizierten Betrieb bis zum oben genannten Datum aufzurüsten. In diesem Übergangszeitraum wird die aktuelle Version 1 der TSE von fiskaly zum Einsatz kommen. Dementsprechend wollen wir nochmal betonen, dass wir um keine allgemeine Fristverlängerung ansuchen. Für das Upgrade auf den voll zertifizierten Betrieb (fiskaly Cloud TSE Version 2) sehen wir den Zeithorizont bis zum ${this.state.fristAblauf} als machbar.  %0D%0A
        Maßgebliche Ursache für den Übergangszeitraum sind - neben der noch ausstehenden Zertifizierungen - insbesondere die erhöhten Anforderungen an die Umsetzung im Bereich der zertifizierten Anwenderumgebung beim Steuerpflichtigen. Darüber hinaus sind die späten Änderungen der technischen Spezifikationen welche durch das BSI verfasst und danach erst mit Ende November letzten Jahres an die Cloud-TSE Hersteller kommuniziert wurden. Diese späten Änderungen hatten gravierenden Einfluss auf die Zertifizierungsverfahren aller Cloud-TSE Anbieter. Dementsprechend ist es in unserer Situation auch nicht mehr möglich die vollständig zertifizierte fiskaly Cloud-TSE bis 31.3.2021 in Betrieb zu nehmen.  %0D%0A
        Zum aktuellen Zeitpunkt erlaubt uns die Nutzung von “fiskaly SIGN v1” die Signatur von Kassenbelegen und dadurch bereits eine erste Umsetzung von § 146a AO. Dadurch weisen wir auch gerne die Priorität der KassenSichV in unserem Unternehmen nach, wir haben uns bereits sehr früh und ausführlich mit dem Thema KassenSichV beschäftigt und notwendige Anpassungen und Investitionen getätigt. Wir, als auch unser Hersteller, verweisen auf die unüblich spät eingebrachten Anforderungen im laufenden Zertifizierungsverfahren, welche uns zu diesem Antrag zwingen. %0D%0A
        %0D%0A
        Anlagen:  %0D%0A
        Allgemeine Stellungnahme Verzögerung Zertifizierung %0D%0A
        Statement Kassenhersteller und Integrator %0D%0A
        6er Schreiben'
        `;
        return body; 
    }

    render() {
        return(
            <div>
                <h1 id="formHeader">Standardformular für Antrag nach $148 AO</h1>
                {this.generateForm()}
                {/* <button type="submit" onClick={this.handleSubmit} id="submitButton">Absenden</button> */}
            </div>
        );
    }
}

export default Antrag148AO;