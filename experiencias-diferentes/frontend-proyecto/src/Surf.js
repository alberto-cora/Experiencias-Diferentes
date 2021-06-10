import Helmet from "react-helmet";
import "./Surf.css";

function Surf() {
  return (
    <div className="surf">
      <h1>Surf</h1>
      <Helmet>
        <title>Experiencias diferentes: Surf</title>
      </Helmet>
      <div className="foto" />
      <h2>Surf para principiantes</h2>
      <p className="surf-principal">
        Una experiencia para aquellos que no sean expertos en la materia, estos
        maestros del surf <br />
        te enseñarán los primeros pasos que tienes que dar para seguir
        avanzando. <p>Fecha: 21/06/2021-23/06/2021</p> Lugar: Ferrol (A Coruña)
        <p>Precio:250€</p>
      </p>
      <div className="foto" />
      <h2>Surf avanzado</h2>
      <p className="surf-principal">
        Una experiencia para aquellos que no sean expertos en la materia, estos
        maestros del surf <br />
        te enseñarán los primeros pasos que tienes que dar para seguir
        avanzando. <p>Fecha: 21/06/2021-23/06/2021</p> Lugar: Ferrol (A Coruña)
        <p>Precio:250€</p>
      </p>
    </div>
  );
}

export default Surf;
