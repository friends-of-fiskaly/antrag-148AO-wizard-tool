import React from 'react';

import Layout from '../components/Layout';

import Antrag148AO from '../components/Antrag-148Ao/components/Antrag-148AO-form';


const IndexPage = () => (
  <Layout>
    <section id="banner">
      <div className="inner">
        <div className="logo">
          {/* <img url="../assets/images/fiskaly-logo.png" alt="fiskaly-logo "/>  */}
        </div>
      </div>
    </section>

    <section id="wrapper">

      <section id="two">
        <p align="center" fontSize='large'>This page guides you trough the process of submitting the application according to $148 AO.</p>
        <h1 style={{color: "lightgray", textAlign: 'center', fontSize: 24}}>!!!WORK IN PROGRESS!!!</h1>
        <h1 style={{width: "50%", marginLeft: "25%", textAlign: "center", fontSize: "30px"}}>Standardformular für Antrag nach $148 AO</h1>
        <Antrag148AO style={{}}/>
        <p></p>
        <div id="downloadLinkDiv">
            <a href="https://drive.google.com/drive/folders/1wVbua9t7MQ0qkwr5Ialq1cC6N4X6DIm9?usp=sharing"><button id="anlageDownloadButton">Download Anlagedokumente</button></a>
        </div>
        <p></p>
        <div>
            <p id="attachmentLink"><a href="https://drive.google.com/file/d/1hd_W0Co_uYtnPLv5MIWrvbiMP4ta0fNN/view?usp=sharing">2021-005 6er Schreiben an die Bundesländer zu Problemen bei der cloudbasierten TSE Anlage 2 BT</a></p>
            <p id="attachmentLink"><a href="https://drive.google.com/file/d/1xxDZhXhS2ndu10xoSZtNb4GTvturBjJ0/view?usp=sharing">2021-98379 (Pragmatische und bundeseinheitliche Lösung zum Thema Cloud TSE) - Hessisches Ministerium der Finanzen</a></p>
            <p id="attachmentLink"><a href="https://drive.google.com/file/d/1wCQu8gClkn2mkYa2wLI4l_I15aVDo6Ca/view?usp=sharing">Allgemeine Stellungnahme Verzögerung Zertifizierung fiskaly</a></p>
            <p id="attachmentLink"><a href="https://docs.google.com/document/d/1nxQKxTKePtu51G8Co_Vbgy6gBKlm6-DKEJUWCw39SUk/edit?usp=sharing">Allgemeiner Antrag nach § 148 AO – Verlängerung der Frist zur vollständigen Implementierung einer Cloud-TSE</a></p>
            <p id="attachmentLink"><a href="https://drive.google.com/file/d/15D-4g3x2YpZrXLU7mWFa6IPIacIM3C0L/view?usp=sharing">CSPL Zertifizierungs ID BSI-DSZ-CC-1153</a></p>
            <p id="attachmentLink"><a href="https://docs.google.com/document/d/1NJVkYYLRIGnWf0aYjPxn3uaDRxRArHdCfEgmDdBPopw/edit?usp=sharing">Entwurf Statement Kassenhersteller</a></p>
        </div>
      </section>

    </section>
  </Layout>
);

export default IndexPage;
