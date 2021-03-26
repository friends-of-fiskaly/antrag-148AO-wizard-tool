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
        <p align="center">Some explanation about the page and the form</p>
        <h1 id="formHeader">Standardformular für Antrag nach $148 AO</h1>
        <Antrag148AO />
      </section>

    </section>
  </Layout>
);

export default IndexPage;
