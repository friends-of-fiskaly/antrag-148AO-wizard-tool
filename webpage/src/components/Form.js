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
        this.generateForm = this.generateForm.bind(this);
        this.getDownloadButtons = this.getDownloadButtons.bind(this);
        this.getMail = this.getMail.bind(this);
        this.sendMailToCustomer = this.sendMailToCustomer.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handlePlzChange(event) {
        this.handleChange(event);
        // select finanzamt
        const selectedFinanzamt = this.finanzamt.getFinanzamtFromPostalCode(event.currentTarget.value);
        if (selectedFinanzamt != null) {
            this.setState({finanzamt: selectedFinanzamt});
        }
    }
    
    generateForm() {  // TODO: entire form is rerendered on single onChange --> investigate
        const fields = [];
        Object.keys(this.state).forEach(key => {  // TODO: sort in ascending order
            
            
            if (!(key in this.stateToValuesMap)) {
                return;
            }

            // console.log(key);

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
                
            //         <select value="Berlin" onChange={this.handleChange} key={key}>
            //             {Object.values(this.finanzamt.getPossibleFinanzamtValues()) // sort in alphabetical order
            //                 .map(value => {  
            //                     return <option value={value} key={value}>{value}</option>;
            //             })
            //             }
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
                <input type="submit" value="Absenden"/>
            </fieldset>
        )
        return <form onSubmit={this.handleSubmit} id="form148">{fields}</form>;
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
        
            if (os.platform.includes('win') || os.platform.includes('Win')) {
            // if (true) {
                // provide two buttons. one for sending the mail, one for download. both can be clicked
                this.setState({renderDownloadButtons: !this.state.renderDownloadButtons});
                // scroll to the top to display buttons
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

            } else {
                const link = `mailto:${receiver ? receiver: ""}?subject=${mailSubject}&body=${body}`;
                try {
                    window.open(link);  
                } catch {
                    const errMessage = 'Could not open mail program';
                    alert(errMessage);
                }
            }

            // provide documents for download
            mail.downloadAsPDF();
        }
    }

    getMail() {
        // const finalValues = {};
        // Object.keys(this.refs).forEach(key => {
        //     finalValues[key] = this.refs[key].current.value;
        // });
        return new Mail(Object.assign({}, this.state));
        // return new Mail(finalValues);
    }

    sendMailToCustomer() {  // TODO
        return <p>Sending mail to customer</p>;
    }

    getDownloadButtons() {
        return  <div id="form148">
                <p id="downloadText">{`Leider konnte Ihr Mail-Programm nicht geöffnet werden. Sie können alternativ die Dokumente downloaden und selbst per Mail an Ihr zuständiges Finanzamt senden und/oder ein vorgefertiges Mail erhalten welches Sie direkt an Ihr Finanzamt weiterleiten können.`}</p>
                <form onSubmit={this.sendMailToCustomer} id="sendMailToUserForm">
                    <input id="mailInput" value="" type="text" onBlur={this.handleChange} placeholder="max.mustermann@company.com" required/>
                    <p></p>
                    <input type="submit" value="Absenden" id="alternativeDownloadButtons"/>
                </form>
                
                <button id="alternativeDownloadButtons" onClick={() => {this.getMail().downloadAsPDF()}}>Dokumente downloaden</button>
            </div>
    }

    render() {
        return(
            <div>
                <h1 id="formHeader">Standardformular für Antrag nach $148 AO</h1>
                {!this.state.renderDownloadButtons ? this.generateForm(): this.getDownloadButtons()}
                
            </div>
        );
    }
}

export default Antrag148AO;