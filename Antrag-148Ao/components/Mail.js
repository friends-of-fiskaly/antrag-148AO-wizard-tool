import utils from '../utils/Utils.js';
import { Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';
import React from 'react';


export default class Mail {
    constructor(props) {
        this.companyName = props.companyName;
        this.customerName = props.customerName; 
        this.postalCode = props.postalCode;
        this.finanzamt = props.finanzamt; 
        this.steuerNummer = props.steuerNummer; 
        this.kassenDienstleister = props.kassenDienstleister; 
        this.fristAblauf = props.fristAblauf; 
        this.availabilityDate = props.availabilityDate; 
        this.integrationsDatum = props.integrationsDatum;
    }

    downloadAsPDF() {
        const styles = StyleSheet.create({
            page: {
              flexDirection: 'row',
              backgroundColor: '#E4E4E4'
            },
            section: {
              margin: 30,
              padding: 20,
              flexGrow: 1, 
              fontSize: 12, 
              textAlign: 'justify',
            }
        });

        const mailText = this.getText();

        return <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>{mailText}</Text>
                    </View>
                </Page>
            </Document>;
    }

    getMailBody() {
        const mailText = this.getText();
        return encodeURI(mailText);
    }

    getReceiverBlock() {
        return `An: ${this.finanzamt}\n`;
    }

    getDateBlock() {
        return `Datum: ${utils.getCurrentDate()}\n`;
    }

    getSenderBlock(){
        return `Abs.: ${this.companyName}\n`;
    }

    getSteuernummerBlock() {
        return `Steuernummer: ${this.steuerNummer}\n`;
    }

    getBetreffBlock() {
        return `Betreff: Antrag nach § 148 AO – Verlängerung der Frist zur vollständigen Implementierung \teiner Cloud-TSE\n`;
    }

    getAnredeBlock() {
        return `Sehr geehrte Damen und Herren,\n`;
    }

    getFirstParagraph() {  
        return `hiermit beantragen wir die Verlängerung der durch die Nichtbeanstandungsregelung eingeräumten Frist über den 31. März 2021 hinaus gemäß § 148 AO wegen Vorliegens unbilliger sachlichen Härte bis zum ${this.fristAblauf} . Jedoch wollen wir klarstellen, dass es sich im folgenden Antrag um keine allgemeine Fristverlängerung handelt, sondern um einen Übergangszeitraum in welchem eine TSE in Evaluierung beim Bundesamt für Sicherheit in der Informationstechnik (BSI), zum Einsatz kommt. \n`;
    }

    getSecondParagraph() { 
        return `Wir beabsichtigen zur Einhaltung der Anforderungen des § 146a AO die Nutzung der cloudbasierten TSE der fiskaly Germany GmbH welche durch unseren Kassen-Dienstleister ${this.kassenDienstleister} integriert wurde. ${this.kassenDienstleister} bietet seit dem ${this.availabilityDate} die fiskaly Cloud-TSE an und wir haben diese Vorabversion einer voll zertifizierten TSE bereits seit ${this.integrationsDatum ? this.integrationsDatum: this.availabilityDate} im Einsatz.  Aufgrund verschiedener von uns nicht zu verantwortender Umstände hat sich die finale Zertifizierung der fiskaly Cloud-TSE verzögert. Eine detaillierte Stellungnahme dazu finden Sie im Anhang. Dementsprechend ist bereits jetzt erkennbar, dass die Inbetriebnahme der final zertifizierten Cloud-TSE nicht innerhalb der Frist bis zum 31. März 2021 abgeschlossen werden kann. Wir planen mit der aktuellen zur Zertifizierung beim BSI eingereichten Version der fiskaly Cloud-TSE zu starten. Dieses Vorgehen ist auch mit der Fachabteilung des Bundesministerium für Finanzen, Referat IVA 4 Steuern, abgestimmt. Konkret heißt das, dass wir bereits die TSE im Einsatz haben und damit Geschäftsfälle manipulationssicher dokumentieren und Signaturen auf Belege drucken. \n`;
    }

    getThirdParagraph() { 
        return `Für das oben beschriebene Vorgehen ersuchen wir um eine Erleichterung nach § 148 AO um auf den voll zertifizierten Betrieb bis zum oben genannten Datum aufzurüsten. In diesem Übergangszeitraum wird die aktuelle Version 1 der TSE von fiskaly zum Einsatz kommen. Dementsprechend wollen wir nochmal betonen, dass wir um keine allgemeine Fristverlängerung ansuchen. Für das Upgrade auf den voll zertifizierten Betrieb (fiskaly Cloud TSE Version 2) sehen wir den Zeithorizont bis zum ${this.fristAblauf} als machbar. \n`;
    }

    getFourthParagraph(){ 
        return `Maßgebliche Ursache für den Übergangszeitraum sind - neben der noch ausstehenden Zertifizierungen - insbesondere die erhöhten Anforderungen an die Umsetzung im Bereich der zertifizierten Anwenderumgebung beim Steuerpflichtigen. Darüber hinaus sind die späten Änderungen der technischen Spezifikationen welche durch das BSI verfasst und danach erst mit Ende November letzten Jahres an die Cloud-TSE Hersteller kommuniziert wurden. Diese späten Änderungen hatten gravierenden Einfluss auf die Zertifizierungsverfahren aller Cloud-TSE Anbieter. Dementsprechend ist es in unserer Situation auch nicht mehr möglich die vollständig zertifizierte fiskaly Cloud-TSE bis 31.3.2021 in Betrieb zu nehmen. \n`;
    }

    getFifthParagraph() { 
        return `Zum aktuellen Zeitpunkt erlaubt uns die Nutzung von “fiskaly SIGN v1” die Signatur von Kassenbelegen und dadurch bereits eine erste Umsetzung von § 146a AO. Dadurch weisen wir auch gerne die Priorität der KassenSichV in unserem Unternehmen nach, wir haben uns bereits sehr früh und ausführlich mit dem Thema KassenSichV beschäftigt und notwendige Anpassungen und Investitionen getätigt. Wir, als auch unser Hersteller, verweisen auf die unüblich spät eingebrachten Anforderungen im laufenden Zertifizierungsverfahren, welche uns zu diesem Antrag zwingen.\n`;
    }

    getAnlageBlock() {
        return `Anlagen:  \n- Statement Kassenhersteller und Integrator \n- BSI-DSZ-CC-1153-2021 - Zertifikat CSPL \n- ISO27001 Zertifikat fiskaly GmbH \n- SMAERS - BSI Zertifizierungs-ID BSI-DSZ-CC-1130 \n- Allgemeine Stellungnahme Verzögerung Zertifizierung (fiskaly) \n- 2021-005 6er Schreiben an die Bundesländer zu Problemen bei der cloudbasierten TSE Anlage 2 BT (DIHK, BDI, ZDH, BDA, HDE, BGA) \n- 2021-98379 (Pragmatische und bundeseinheitliche Lösung zum Thema Cloud TSE) - Hessisches Ministerium der Finanzen; Als das zuständige Finanzamt fiskaly Germany GmbH \n \n Anlage Dokumente stehen hier zum Download zur Verfügung: https://drive.google.com/drive/folders/1wVbua9t7MQ0qkwr5Ialq1cC6N4X6DIm9`;
    }

    getText() { 
        let text = ""; 

        text = `${text}${this.getReceiverBlock()} \n${this.getDateBlock()}\r`
        text = `${text}${this.getSenderBlock()} \n${this.getBetreffBlock()} \n${this.getAnredeBlock()} \n`
        text = `${text}${this.getFirstParagraph()} \n${this.getSecondParagraph()} \n`;
        text = `${text}${this.getThirdParagraph()} \n${this.getFourthParagraph()} \n`; 
        text = `${text}${this.getFifthParagraph()} \n${this.getAnlageBlock()}`;   

        return text;
    }

}; 