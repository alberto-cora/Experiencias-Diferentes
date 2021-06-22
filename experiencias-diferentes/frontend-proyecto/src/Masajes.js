import Helmet from 'react-helmet';
import './Masajes.css';

function Masajes() {
  return (
    <div className='masajes'>
      <h1>Masajes</h1>
      <Helmet>
        <title>Experiencias diferentes: Masajes</title>
      </Helmet>
      <div className='foto-masajes' />
      <h2 className='titulo'>Masaje con chocolate</h2>
      <p className='masajes-principal'>
        Una experiencia para aquellos que no sean expertos en la materia, estos
        maestros del surf te enseñarán los primeros pasos que tienes que dar
        para seguir avanzando. <p>Fecha: 21/06/2021-23/06/2021</p> Lugar: Ferrol
        (A Coruña)
        <p>Precio:250€</p>
      </p>
      <div className='foto-masajes' />
      <h2 className='titulo'>Masajes variados</h2>
      <p className='masajes2-principal'>
        Una experiencia para aquellos que no sean expertos en la materia, estos
        maestros del surf <br />
        te enseñarán los primeros pasos que tienes que dar para seguir
        avanzando. <p>Fecha: 21/06/2021-23/06/2021</p> Lugar: Ferrol (A Coruña)
        <p>Precio:250€</p>
      </p>
    </div>
  );
}

export default Masajes;
