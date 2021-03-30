import React from 'react';

import Layout from '../components/Layout';

import Antrag148AO from '../components/Antrag-148Ao/components/Antrag-148AO-form';

import utils from '../components/Antrag-148Ao/utils/Utils.js';


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
        <div id="introTextDiv">
          <p id="introTextParagraph">Sehr geehrte Damen und Herren,</p>
          <p id="introTextParagraph">folgend finden Sie eine Referenzimplementierung zur Erstellung eines Antrags nach § 148 AO.</p>
          <p id="introTextParagraph">Für weitere Informationen wenden Sie sich bitte gerne an <a href="https://fiskaly.com/">fiskaly</a>.</p>
          <p> </p>
          <p> </p>
        </div>
        {/* <h1 style={{color: "lightgray", textAlign: 'center', fontSize: 24}}>!!!WORK IN PROGRESS!!!</h1> */}
        <h1 style={{width: "50%", marginLeft: "25%", textAlign: "center", fontSize: "24px"}}>Standardformular für Antrag nach $148 AO</h1>
        <div id="formWrapper">
          <Antrag148AO style={{}}/>
        </div>
        <p></p>
        <a href={utils.getGDriveDownloadLink("1h2dKoxy3k2vUArJqlNSdg-MfI6wwd27M")}><p id="buttonStyledTextIndex">Download Anlagedokumente</p></a>
        <p></p>
        <div>
            <p id="attachmentLink"><a href={utils.getGDriveDownloadLink("1hd_W0Co_uYtnPLv5MIWrvbiMP4ta0fNN")}>2021-005 6er Schreiben an die Bundesländer zu Problemen bei der cloudbasierten TSE Anlage 2 BT</a></p>
            <p id="attachmentLink"><a href={utils.getGDriveDownloadLink("1xxDZhXhS2ndu10xoSZtNb4GTvturBjJ0")}>2021-98379 (Pragmatische und bundeseinheitliche Lösung zum Thema Cloud TSE) - Hessisches Ministerium der Finanzen</a></p>
            <p id="attachmentLink"><a href={utils.getGDriveDownloadLink("1wCQu8gClkn2mkYa2wLI4l_I15aVDo6Ca")}>Allgemeine Stellungnahme Verzögerung Zertifizierung fiskaly</a></p>
            <p id="attachmentLink"><a href="https://docs.google.com/document/d/1nxQKxTKePtu51G8Co_Vbgy6gBKlm6-DKEJUWCw39SUk/edit?usp=sharing">Allgemeiner Antrag nach § 148 AO – Verlängerung der Frist zur vollständigen Implementierung einer Cloud-TSE</a></p>
            <p id="attachmentLink"><a href={utils.getGDriveDownloadLink("1W24SuZCT3PuYRX4KpSw0HoeVUf9UHnR3")}>BSI-DSZ-CC-1153-2021 - Zertifikat CSPL</a></p>
            <p id="attachmentLink"><a href="https://docs.google.com/document/d/1NJVkYYLRIGnWf0aYjPxn3uaDRxRArHdCfEgmDdBPopw/edit?usp=sharing">Entwurf Statement Kassenhersteller</a></p>
            <p id="attachmentLink"><a href={utils.getGDriveDownloadLink("18VPh4vWWRLXOTlD4cTswW3j3bo9Du6M0")}>ISO27001 Zertifikat fiskaly GmbH</a></p>
            <p id="attachmentLink"><a href={utils.getGDriveDownloadLink("1KePST6hY4dYHLTNYxn4wd4Lw5e5a22UV")}>SMAERS - BSI Zertifizierungs-ID BSI-DSZ-CC-1130</a></p>
        </div>
      </section>

    </section>
  </Layout>
);

export default IndexPage;
