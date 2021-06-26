import Helmet from 'react-helmet';
import './About.css';

function About() {
  return (
    <div className='about'>
      <h1>About us</h1>
      <Helmet>
        <title>Experiencias diferentes - About us</title>
      </Helmet>
      We are a better company when talking about the unique experiencies
      <span className='trick'></span>
    </div>
  );
}

export default About;
