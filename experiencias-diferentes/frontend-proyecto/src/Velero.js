import Helmet from 'react-helmet';
import './Velero.css';

function Velero() {
  return (
    <div className='velero'>
      <h1>Viajes en velero</h1>
      <Helmet>
        <title>Experiencias diferentes: Velero</title>
      </Helmet>
      <div className='foto-velero' />
      <h2 className='titulo'>Viaje de 2 días</h2>
      <p className='velero-principal'>
        Una experiencia para aquellos que no sean expertos en la materia, estos
        maestros del surf <br />
        te enseñarán los primeros pasos que tienes que dar para seguir
        avanzando. <p>Fecha: 21/06/2021-23/06/2021</p> Lugar: Ferrol (A Coruña)
        <p>Precio:250€</p>
      </p>
      <div className='foto-velero' />
      <h2 className='titulo'>Viaje de 4 días</h2>
      <p className='velero-principal'>
        Una experiencia para aquellos que no sean expertos en la materia, estos
        maestros del surf <br />
        te enseñarán los primeros pasos que tienes que dar para seguir
        avanzando. <p>Fecha: 21/06/2021-23/06/2021</p> Lugar: Ferrol (A Coruña)
        <p>Precio:250€</p>
      </p>
    </div>
  );
}

export default Velero;
