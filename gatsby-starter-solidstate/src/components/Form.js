import React from 'react';
import config from '../../config';
// import { Linking } from 'react-native';
import { getCurrentDate } from './Utils.js';

class Antrag148AO extends React.Component {
    constructor() {
        super();
        this.state = {
            zuständigesFinanzamt: '', // finanzamt responsible for customer
            steuerpflichtiger: '',  // name of the customer
            steuerNummer: '',  
            fristAblauf: '31.12.2021',  // date until v1 of fiskaly cloud TSE should still be usable
            kassenDienstleister: '',  // provider of clients, potentially the customer itself
            // kassenHersteller: '',  // same as kassenDienstleister -> use only 1 field 
            verfügbarkeitsDatumKasse: '01.01.2020',  // date of availability of fiskaly cloud tse v1
            integrationsDatum: '',  // date of usage of fiskaly cloud tse v1
        };
        this.formLabels = {
            zuständigesFinanzamt: "Zuständiges Finanzamt:", 
            steuerpflichtiger: "Steuerpflichtiger:", 
            steuerNummer: "Steuernummer:", 
            fristAblauf: "Verlängerung bis:",
            kassenDienstleister: "Kassenanbieter:", 
            verfügbarkeitsDatumKasse: "Verfügbar beim Anbieter seit:", 
            integrationsDatum: "Integriert seit:"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDefaultMailBody = this.getDefaultMailBody.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    generateForm() {
        const fields = Object.keys(this.state).map(name => {
            return <fieldset key={name}>
                <label>{this.formLabels[name]}</label>
                <input
                type="text"
                name={name}
                onChange={this.handleChange}
                placeholder={this.state[name]}
                required
                />
                <p></p>
            </fieldset>;
        });
        return <form onSubmit={this.handleSubmit}>{fields}</form>;
    }

    handleSubmit(event) {
        // open mail program of user and prepare mail sent to finanzamt with default text and selected values
        event.preventDefault();

        const link = `mailto:${config.mailReceiverOfForm148}?subject=${config.mailSubject}&body=${this.getDefaultMailBody()}`;
        const errMessage = 'Could not open mail program';

        try {
            window.open(link);
        } catch {
            alert(errMessage);
        }
        
    }

    getDefaultMailBody() {
        const body = `
        An: ${this.state.zuständigesFinanzamt}\n
        \n
        Datum: ${getCurrentDate()} \n
        Abs.: ${this.state.steuerpflichtiger}  \n
        Steuernummer: ${this.state.steuerNummer} \n
        \n
        \n
        Betreff: Antrag nach § 148 AO – Verlängerung der Frist zur vollständigen Implementierung einer Cloud-TSE \n
        \n
        ${config.mailAnrede}, \n
        hiermit beantragen wir die Verlängerung der durch die Nichtbeanstandungsregelung eingeräumten Frist über den 31. März 2021 hinaus gemäß § 148 AO wegen Vorliegens unbilliger sachlichen Härte bis zum ${this.state.fristAblauf} . Jedoch wollen wir klarstellen, dass es sich im folgenden Antrag um keine allgemeine Fristverlängerung handelt, sondern um einen Übergangszeitraum in welchem eine TSE in Evaluierung beim Bundesamt für Sicherheit in der Informationstechnik (BSI), zum Einsatz kommt.  \n
        Wir beabsichtigen zur Einhaltung der Anforderungen des § 146a AO die Nutzung der cloudbasierten TSE der fiskaly Germany GmbH welche durch unseren Kassen-Dienstleister ${this.state.kassenDienstleister} integriert wurde. ${this.state.kassenDienstleister} bietet seit dem ${this.state.verfügbarkeitsDatumKasse} die fiskaly Cloud-TSE an und wir haben diese Vorabversion einer voll zertifizierten TSE bereits seit ${this.state.integrationsDatum ? this.state.integrationsDatum: this.state.verfügbarkeitsDatumKasse} im Einsatz.  Aufgrund verschiedener von uns nicht zu verantwortender Umstände hat sich die finale Zertifizierung der fiskaly Cloud-TSE verzögert. Eine detaillierte Stellungnahme dazu finden Sie im Anhang. Dementsprechend ist bereits jetzt erkennbar, dass die Inbetriebnahme der final zertifizierten Cloud-TSE nicht innerhalb der Frist bis zum 31. März 2021 abgeschlossen werden kann. Wir planen mit der aktuellen zur Zertifizierung beim BSI eingereichten Version der fiskaly Cloud-TSE zu starten. Dieses Vorgehen ist auch mit der Fachabteilung des Bundesministerium für Finanzen, Referat IVA 4 Steuern, abgestimmt. Konkret heißt das, dass wir bereits die TSE im Einsatz haben und damit Geschäftsfälle manipulationssicher dokumentieren und Signaturen auf Belege drucken.  \n
        Für das oben beschriebene Vorgehen ersuchen wir um eine Erleichterung nach § 148 AO um auf den voll zertifizierten Betrieb bis zum oben genannten Datum aufzurüsten. In diesem Übergangszeitraum wird die aktuelle Version 1 der TSE von fiskaly zum Einsatz kommen. Dementsprechend wollen wir nochmal betonen, dass wir um keine allgemeine Fristverlängerung ansuchen. Für das Upgrade auf den voll zertifizierten Betrieb (fiskaly Cloud TSE Version 2) sehen wir den Zeithorizont bis zum ${this.state.fristAblauf} als machbar.  \n
        Maßgebliche Ursache für den Übergangszeitraum sind - neben der noch ausstehenden Zertifizierungen - insbesondere die erhöhten Anforderungen an die Umsetzung im Bereich der zertifizierten Anwenderumgebung beim Steuerpflichtigen. Darüber hinaus sind die späten Änderungen der technischen Spezifikationen welche durch das BSI verfasst und danach erst mit Ende November letzten Jahres an die Cloud-TSE Hersteller kommuniziert wurden. Diese späten Änderungen hatten gravierenden Einfluss auf die Zertifizierungsverfahren aller Cloud-TSE Anbieter. Dementsprechend ist es in unserer Situation auch nicht mehr möglich die vollständig zertifizierte fiskaly Cloud-TSE bis 31.3.2021 in Betrieb zu nehmen.  \n
        Zum aktuellen Zeitpunkt erlaubt uns die Nutzung von “fiskaly SIGN v1” die Signatur von Kassenbelegen und dadurch bereits eine erste Umsetzung von § 146a AO. Dadurch weisen wir auch gerne die Priorität der KassenSichV in unserem Unternehmen nach, wir haben uns bereits sehr früh und ausführlich mit dem Thema KassenSichV beschäftigt und notwendige Anpassungen und Investitionen getätigt. Wir, als auch unser Hersteller, verweisen auf die unüblich spät eingebrachten Anforderungen im laufenden Zertifizierungsverfahren, welche uns zu diesem Antrag zwingen. \n
        \n
        Anlagen:  \n
        ${config.mailAnlage}
        `;
        return body; 
    }

    render() {
        return(
            <div>
                <h1 align="center">Standardformular für Antrag nach $148 AO</h1>
                {this.generateForm()}
                <button type="submit" onClick={this.handleSubmit}>Absenden</button>
            </div>
        );
    }
}

export default Antrag148AO;