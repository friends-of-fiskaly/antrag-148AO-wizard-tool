import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import Finanzamt from '../utils/Finanzamt.js';
import Mail from '../utils/Mail.js';

class Antrag148AO extends React.Component {
    constructor(props) {  // use for prefilling
        super();
        this.state = {
            companyName: (props.companyName) ? props.companyName: "", 
            customerName: (props.customerName) ? props.customerName: "", 
            postalCode: (props.postalCode) ? props.postalCode: "",  // must be number of 5 digits
            finanzamt: (props.finanzamt) ? props.finanzamt: "",  
            steuerNummer: (props.steuerNummer) ? props.steuerNummer: "", // must be number 
            kassenDienstleister: (props.kassenDienstleister) ? props.kassenDienstleister: "", 
            fristAblauf: (props.fristAblauf) ? props.fristAblauf: "31.12.2021", 
            availabilityDate: (props.availabilityDate) ? (props.availabilityDate): "01.01.2020", 
            integrationsDatum: (props.integrationsDatum) ? props.integrationsDatum: "",  // must be >= availabilityDate
            userMail: (props.userMail) ? props.userMail: "",
            renderDownloadButtons: false,
            renderPDFDownload: false,
            errors: {},
        };
        this.stateToValuesMap = {
            companyName: {
                labelValue: "Firmenname: ", // name of the company
                inputType: "text", 
                order: 0
            },
            customerName: {
                labelValue: "Vor und Zuname: ", // first and last name of customer
                inputType: "text", 
                order: 1
            },
            postalCode: {
                labelValue: "Postleitzahl: ",  // postal code -> 5 digits in germany
                inputType: "text", 
                order: 2
            },
            finanzamt: {
                labelValue: "Zuständiges Finanzamt: ", // finanzamt responsible for customer 
                order: 3
            },
            steuerNummer: {
                labelValue: "Steuernummer: ", 
                inputType: "text", 
                order: 4
            },
            kassenDienstleister: {
                labelValue: "Kassenanbieter: ", // provider of clients, potentially the customer itself
                inputType: "text", 
                order: 5
            },
            fristAblauf: {
                labelValue: "Verlängerung der Frist bis: ",  // date until v1 of fiskaly cloud TSE should still be usable
                inputType: "date", 
                order: 6
            },
            availabilityDate: {
                labelValue: "fiskaly Cloud TSE verfügbar beim Anbieter seit: ",  // date of availability of fiskaly cloud tse v1
                inputType: "date", 
                order: 7
            },
            integrationsDatum: {
                labelValue: "Kassenanbieter integriert seit:", // date since integration and usage of fiskaly cloud tse v1
                inputType: "date", 
                order: 8
            }
        };
        this.finanzamt = new Finanzamt();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePlzChange = this.handlePlzChange.bind(this);
        this.dataInputForm = this.dataInputForm.bind(this);
        this.getMail = this.getMail.bind(this);
        this.getFinanzamtDropdown = this.getFinanzamtDropdown.bind(this);
        this.getPDFDownloadButton = this.getPDFDownloadButton.bind(this);
    }

    handleChange(event) {
        const field = event.target.name;
        const value = event.target.value;
        
        this.setState({[field]: value});
    }

    handlePlzChange(event) {
        this.handleChange(event);
        // select finanzamt
        const selectedFinanzamt = this.finanzamt.getFinanzamtFromPostalCode(event.currentTarget.value);
        if (selectedFinanzamt != null) {
            this.setState({finanzamt: selectedFinanzamt});
        } else {
            this.setState({finanzamt: ""});
        }
    }
    
    dataInputForm() {  // TODO: entire form is rerendered on single onChange --> investigate
        const fields = [];
        Object.keys(this.state).forEach(key => {  
            
            
            if (!(key in this.stateToValuesMap)) {
                return;
            }

            if (key === "postalCode") {
                fields.push(
                <fieldset key={key}>
                    <label>{this.stateToValuesMap[key].labelValue}</label>

                    <input 
                        id="inputField"
                        type={this.stateToValuesMap[key].inputType}
                        name={key}
                        onChange={this.handlePlzChange}
                        value={this.state[key]}
                        required
                    />

                    <p></p>
                </fieldset>
                );
                    
            // } else if (key === "finanzamt") {
            //     fields.push(
            //     <fieldset key={key}>
            //         <label>{this.stateToValuesMap[key].labelValue}</label>
                
            //         <select value={this.state[key]} onChange={this.handleChange} key={key}>
            //             {this.getFinanzamtDropdown()}
            //         </select>
            //         <p></p>
            //     </fieldset>
            //     );

            } else {
                fields.push(
                <fieldset key={key}>
                    <label>{this.stateToValuesMap[key].labelValue}</label>

                    <input
                        id="inputField"
                        type={this.stateToValuesMap[key].inputType}
                        name={key}
                        onChange={this.handleChange}
                        value={this.state[key]}
                        required
                    />
                    <p></p>
                </fieldset>
                );

            }
        });

        fields.push(
            <fieldset key="submitButton" id="submitButton">
                <input type="submit" value="Send via local Mail Program"/>
            </fieldset>
        )

        return <form onSubmit={this.handleSubmit} id="form148">{fields}</form>;
    }

    getFinanzamtDropdown() {
        const values = this.finanzamt.getPossibleFinanzamtValues();
        let i = 0;
        return values.map(value => {  
                i++;
                return <option value={value} key={i}>{value}</option>;
        });
    }

    handleSubmit(event) {
        // open mail program of user and prepare mail sent to finanzamt with default text and selected values
        event.preventDefault();

        // prepare mail
        const mail = this.getMail();
        const body = mail.getMailBody();
        const mailSubject = 'Antrag auf Fristverlängerung laut §148 AO';
        const receiver = this.finanzamt.getMailFromPostalCode(this.state.postalCode);  // might return null
        
        // get operating system and either send mail (linux) or offer to send mail to user which can be forwarded (windows)

        if (typeof window !== `undefined`) {  // hide window from gatsby so we can compile
            const os = window.navigator;
            const link = `mailto:${receiver ? receiver: ""}?subject=${mailSubject}&body=${body}`;
                try {
                    window.open(link);  
                    
                } catch {
                    const errMessage = 'Could not open mail program';
                    alert(errMessage);
                }

            // provide documents for download
            this.setState({renderPDFDownload: true});
        }
    }

    getMail() {
        return new Mail(Object.assign({}, this.state));
    }

    // sendMailToCustomerInterface() {
    //     return  <div id="form148">
    //             <p id="downloadText">{`Leider konnte Ihr Mail-Programm nicht geöffnet werden. Sie können alternativ die Dokumente downloaden und selbst per Mail an Ihr zuständiges Finanzamt senden und/oder ein vorgefertiges Mail erhalten welches Sie direkt an Ihr Finanzamt weiterleiten können.`}</p>
    //             <form onSubmit={this.sendMailToCustomer} id="sendMailToUserForm">
    //                 <input id="mailInput" value="" type="text" onBlur={this.handleChange} placeholder="max.mustermann@company.com" required/>
    //                 <p></p>
    //                 <input type="submit" value="Mail senden" id="sendMailButton"/>
    //             </form>
    //         </div>
    // }

    downloadFiles() {

    }

    getPDFDownloadButton() {
        return <div className="pdfDownloadButton">
                    <PDFDownloadLink
                        className="link"
                        document={this.getMail().downloadAsPDF()}
                        fileName='Antrag-148AO.pdf'>
                            <button>
                                Download Antrag-148AO
                            </button>
                    </PDFDownloadLink>
                </div>
    }

    render() {
        return(
            <div>
                {/* {!this.state.renderDownloadButtons ? this.dataInputForm(): this.sendMailToCustomerInterface()} */}
                <div id="reusableFormComponent">
                    {this.dataInputForm()}
                    {this.state.renderPDFDownload && this.getPDFDownloadButton()}
                </div>
                <p></p>
                <div className="downloadLinkDiv">
                    <a href="https://drive.google.com/drive/folders/1wVbua9t7MQ0qkwr5Ialq1cC6N4X6DIm9?usp=sharing"><button className="anlageDownloadButton">Download Anlagedokumente</button></a>
                </div>
                <p></p>
                <div>
                    <p id="attachmentLink"><a href="https://drive.google.com/file/d/1hd_W0Co_uYtnPLv5MIWrvbiMP4ta0fNN/view?usp=sharing" download target="_blank">2021-005 6er Schreiben an die Bundesländer zu Problemen bei der cloudbasierten TSE Anlage 2 BT</a></p>
                    <p id="attachmentLink"><a href="https://drive.google.com/file/d/1xxDZhXhS2ndu10xoSZtNb4GTvturBjJ0/view?usp=sharing">2021-98379 (Pragmatische und bundeseinheitliche Lösung zum Thema Cloud TSE) - Hessisches Ministerium der Finanzen</a></p>
                    <p id="attachmentLink"><a href="https://drive.google.com/file/d/1wCQu8gClkn2mkYa2wLI4l_I15aVDo6Ca/view?usp=sharing">Allgemeine Stellungnahme Verzögerung Zertifizierung fiskaly</a></p>
                    <p id="attachmentLink"><a href="https://docs.google.com/document/d/1nxQKxTKePtu51G8Co_Vbgy6gBKlm6-DKEJUWCw39SUk/edit?usp=sharing">Allgemeiner Antrag nach § 148 AO – Verlängerung der Frist zur vollständigen Implementierung einer Cloud-TSE</a></p>
                    <p id="attachmentLink"><a href="https://drive.google.com/file/d/15D-4g3x2YpZrXLU7mWFa6IPIacIM3C0L/view?usp=sharing">CSPL Zertifizierungs ID BSI-DSZ-CC-1153</a></p>
                    <p id="attachmentLink"><a href="https://docs.google.com/document/d/1NJVkYYLRIGnWf0aYjPxn3uaDRxRArHdCfEgmDdBPopw/edit?usp=sharing">Entwurf Statement Kassenhersteller</a></p>
                </div>

                {/* add link / button to download attachments. also provide table with link to attachments */}
            </div>
        );
    }
}

export default Antrag148AO;