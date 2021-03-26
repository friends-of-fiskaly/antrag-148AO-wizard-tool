import React from 'react';

import Layout from '../components/Layout';

import Antrag148AO from '../components/Form';


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
        <h1 id="formHeader">Standardformular für Antrag nach $148 AO</h1>
        <Antrag148AO />
      </section>

    </section>
  </Layout>
);

export default IndexPage;
