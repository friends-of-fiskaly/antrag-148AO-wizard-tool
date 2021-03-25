import React from 'react';

import Layout from '../components/Layout';

import Antrag148AO from '../components/Form';

import config from '../../config';

const IndexPage = () => (
  <Layout>
    <section id="banner">
      <div className="inner">
        <div className="logo">
          <img url="../assets/images/fiskaly-logo.png" alt="fiskaly-logo "/> 
          { /* TODO: path of file*/}
        </div>
        {/* <h2>{config.heading}</h2>
        <p>{config.subHeading}</p> */}
      </div>
    </section>

    <section id="wrapper">

      <section id="two">
        <p align="center">Some explanation about the page and the form</p>
        <Antrag148AO />
      </section>

    </section>
  </Layout>
);

export default IndexPage;
