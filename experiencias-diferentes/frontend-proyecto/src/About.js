import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className='about'>
      <h1>Sobre nosotros</h1>
      <Helmet>
        <title>Experiencias diferentes - Sobre nosotros</title>
      </Helmet>
      We are a better company when talking about the unique experiencies
      <Link to='./'>Atrás</Link>
    </div>
  );
}

export default About;
