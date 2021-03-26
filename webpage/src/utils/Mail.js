// import { jsPDF } from "jspdf";
import utils from '../utils/Utils.js';

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
        // let doc = new jsPDF();  // use other library
        // doc.setFontSize(12);

        // this.getFilledText((paragraphArray) => {
        //     for (let i = 0; i < paragraphArray.length; i++) {
        //         const p = paragraphArray[i];
        //         if (i !== 0) {
        //             doc.addPage();
        //         }
        //         doc.text(p, 15, 15);
        //     }
        // });

        // doc.save("Antrag-148AO.pdf");
        return;
    }

    getMailBody() {
        const mailText = this.getFilledText((paragraphArray) => {
            let text = "";
            paragraphArray.forEach(p => {
                text = `${text}${p}`;
            });
            return text;
        }); 
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
        return `Betreff: Antrag nach § 148 AO – Verlängerung der Frist zur vollständigen Implementierung \r\teiner Cloud-TSE\n`;
    }

    getAnredeBlock() {
        return `Sehr geehrte Damen und Herren,\n`;
    }

    getFirstParagraph() {  // add line breaks
        return `hiermit beantragen wir die Verlängerung der durch die Nichtbeanstandungsregelung \reingeräumten Frist über den 31. März 2021 hinaus gemäß § 148 AO wegen Vorliegens \runbilliger sachlichen Härte bis zum ${this.fristAblauf} . Jedoch wollen wir klarstellen, dass \res sich im folgenden Antrag um keine allgemeine Fristverlängerung handelt, sondern \rum einen Übergangszeitraum in welchem eine TSE in Evaluierung beim Bundesamt für \rSicherheit in der Informationstechnik (BSI), zum Einsatz kommt. \n`;
    }

    getSecondParagraph() { // add line breaks
        return `Wir beabsichtigen zur Einhaltung der Anforderungen des § 146a AO die Nutzung der \rcloudbasierten TSE der fiskaly Germany GmbH welche durch unseren Kassen-Dienstleister \r${this.kassenDienstleister} integriert wurde. ${this.kassenDienstleister} bietet seit dem \r${this.availabilityDate} die fiskaly Cloud-TSE an und wir haben diese Vorabversion \reiner voll zertifizierten TSE bereits seit ${this.integrationsDatum ? this.integrationsDatum: this.availabilityDate} im Einsatz.  \rAufgrund verschiedener von uns nicht zu verantwortender Umstände hat sich die finale Zertifizierung der fiskaly \rCloud-TSE verzögert. Eine detaillierte Stellungnahme dazu finden Sie im Anhang. Dementsprechend ist bereits \rjetzt erkennbar, dass die Inbetriebnahme der final zertifizierten Cloud-TSE nicht innerhalb der Frist \rbis zum 31. März 2021 abgeschlossen werden kann. Wir planen mit der aktuellen zur Zertifizierung \rbeim BSI eingereichten Version der fiskaly Cloud-TSE zu starten. Dieses Vorgehen ist auch mit der Fachabteilung \rdes Bundesministerium für Finanzen, Referat IVA 4 Steuern, abgestimmt. Konkret heißt das, dass wir bereits \rdie TSE im Einsatz haben und damit Geschäftsfälle manipulationssicher dokumentieren und Signaturen auf Belege drucken. \n`;
    }

    getThirdParagraph() { // add line breaks
        return `Für das oben beschriebene Vorgehen ersuchen wir um eine Erleichterung nach § 148 AO um auf den voll zertifizierten Betrieb bis zum oben genannten Datum aufzurüsten. In diesem Übergangszeitraum wird die aktuelle Version 1 der TSE von fiskaly zum Einsatz kommen. Dementsprechend wollen wir nochmal betonen, dass wir um keine allgemeine Fristverlängerung ansuchen. Für das Upgrade auf den voll zertifizierten Betrieb (fiskaly Cloud TSE Version 2) sehen wir den Zeithorizont bis zum ${this.fristAblauf} als machbar. \n`;
    }

    getFourthParagraph(){ // add line breaks
        return `Maßgebliche Ursache für den Übergangszeitraum sind - neben der noch ausstehenden Zertifizierungen - insbesondere die erhöhten Anforderungen an die Umsetzung im Bereich der zertifizierten Anwenderumgebung beim Steuerpflichtigen. Darüber hinaus sind die späten Änderungen der technischen Spezifikationen welche durch das BSI verfasst und danach erst mit Ende November letzten Jahres an die Cloud-TSE Hersteller kommuniziert wurden. Diese späten Änderungen hatten gravierenden Einfluss auf die Zertifizierungsverfahren aller Cloud-TSE Anbieter. Dementsprechend ist es in unserer Situation auch nicht mehr möglich die vollständig zertifizierte fiskaly Cloud-TSE bis 31.3.2021 in Betrieb zu nehmen. \n`;
    }

    getFifthParagraph() { // add line breaks
        return `Zum aktuellen Zeitpunkt erlaubt uns die Nutzung von “fiskaly SIGN v1” die Signatur von Kassenbelegen und dadurch bereits eine erste Umsetzung von § 146a AO. Dadurch weisen wir auch gerne die Priorität der KassenSichV in unserem Unternehmen nach, wir haben uns bereits sehr früh und ausführlich mit dem Thema KassenSichV beschäftigt und notwendige Anpassungen und Investitionen getätigt. Wir, als auch unser Hersteller, verweisen auf die unüblich spät eingebrachten Anforderungen im laufenden Zertifizierungsverfahren, welche uns zu diesem Antrag zwingen.\n`;
    }

    getAnlageBlock() {
        return `Anlagen:  \rAllgemeine Stellungnahme Verzögerung Zertifizierung \rStatement Kassenhersteller und Integrator \r6er Schreiben`;
    }

    getFilledText(aggregateFn) { 
        // each p should be approx 1 page
        const p0 = `${this.getReceiverBlock()} \n${this.getDateBlock()}\r${this.getSenderBlock()} \n${this.getBetreffBlock()} \n${this.getAnredeBlock()} \n`; 
        const p1 = `${p0}${this.getFirstParagraph()} \n${this.getSecondParagraph()} \n`;
        const p2 = `${this.getThirdParagraph()} \n${this.getFourthParagraph()} \n`; 
        const p3 = `${this.getFifthParagraph()} \n${this.getAnlageBlock()}`;   

        const paragraphs = [p1, p2, p3];

        return aggregateFn(paragraphs);
    }

}; 