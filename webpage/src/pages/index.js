import React from 'react';

import Layout from '../components/Layout';
import { Link } from 'gatsby';

import config from '../../config';

const IndexPage = () => (
  <Layout>
    <section id="banner">
      <div className="inner">
        <div className="logo">
          <span className="icon fa-diamond"></span>
        </div>
        <h2>{config.heading}</h2>
        <p>{config.subHeading}</p>
      </div>
    </section>

    <section id="wrapper">

      <section id="one">
        <p>fiskaly unterstützt Sie bei der Fiskalisierung mit der Cloud TSE. Füllen Sie jetzt den Antrag nach $148 AO aus.</p>
        <Link
        className="buttonLink"
        to="/Formpage"
        >Jetzt ausfüllen!</Link>
      </section>

    </section>
  </Layout>
);

export default IndexPage;
