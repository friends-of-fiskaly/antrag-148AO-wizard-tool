import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import Finanzamt from './Finanzamt.js';
import Mail from './Mail.js';

class Antrag148AO extends React.Component {
    constructor(props) {  // use for prefilling
        super();
        this.state = {
            companyName: (props.companyName) ? props.companyName: "", 
            customerName: (props.customerName) ? props.customerName: "", 
            postalCode: (props.postalCode) ? props.postalCode: "", 
            finanzamt: (props.finanzamt) ? props.finanzamt: "",  
            steuerNummer: (props.steuerNummer) ? props.steuerNummer: "", 
            kassenDienstleister: (props.kassenDienstleister) ? props.kassenDienstleister: "", 
            fristAblauf: (props.fristAblauf) ? props.fristAblauf: "", 
            availabilityDate: (props.availabilityDate) ? (props.availabilityDate): "", 
            integrationsDatum: (props.integrationsDatum) ? props.integrationsDatum: "",  
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
                inputType: "text",
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
        //  finanzamt
        const selectedFinanzamt = this.finanzamt.getFinanzamtFromPostalCode(event.currentTarget.value);
        if (selectedFinanzamt != null) {
            this.setState({finanzamt: selectedFinanzamt});
        } else {
            this.setState({finanzamt: ""});
        }
    }
    
    dataInputForm() {  // TODO: entire form is rerendered on single onChange --> only rerender each field
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
                    
            // } else if (key === "finanzamt") {  // selecting an element breaks the page
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
            <fieldset key="submitButton">
                <input id="submitButton" type="submit" value="Lokal versenden"/>
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

    downloadFiles() {

    }
    
    getPDFDownloadButton() {
        return <PDFDownloadLink
                    document={this.getMail().downloadAsPDF()}
                    fileName='Antrag-148AO.pdf'>
                        <p id="buttonStyledText">Download Antrag-148AO</p>
                </PDFDownloadLink>
    }

    render() {
        return(
            // <div style={this.props.style}>
            <div>
                {this.dataInputForm()}
                {this.state.renderPDFDownload && this.getPDFDownloadButton()}
            </div>
        );
    }
}

export default Antrag148AO;