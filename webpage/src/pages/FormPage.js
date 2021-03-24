import React from 'react';

import Layout from '../components/Layout';

import config from '../../config';
import Antrag148AO from '../components/Form';

const FormPage = () => (
<Layout fullMenu>
    <section id="wrapper">

      <section id="one" className="Antrag_148_Formular">
        <Antrag148AO />
      </section>

    </section>
</Layout>

);

export default FormPage;
