import Helmet from 'react-helmet';
import './Where.css';

function Where() {
  return (
    <div className='where'>
      <h1>Dónde estamos</h1>
      <Helmet>
        <title>Experiencias diferentes - Dónde estamos...</title>
      </Helmet>
      Nuestras oficinas centrales se encuentran situadas en A Coruña.
      <span className='foto'></span>
    </div>
  );
}

export default Where;
