import Helmet from "react-helmet";
import "./Barranquismo.css";

function Barranquismo() {
  return (
    <div className="barranquismo">
      <h1>Barranquismo</h1>
      <Helmet>
        <title>Experiencias diferentes: Barranquismo</title>
      </Helmet>
      <div className="foto-barranquismo" />
      <h2 className="titulo">Iniciación al Barranquismo</h2>
      <p className="barranquismo-principal">
        Una experiencia para aquellos que no sean expertos en la materia, estos
        maestros del surf <br />
        te enseñarán los primeros pasos que tienes que dar para seguir
        avanzando. <p>Fecha: 21/06/2021-23/06/2021</p> Lugar: Ferrol (A Coruña)
        <p>Precio:250€</p>
      </p>
      <div className="foto-barranquismo" />
      <h2 className="titulo">Expertos</h2>
      <p className="barranquismo2-principal">
        Una experiencia para aquellos que no sean expertos en la materia, estos
        maestros del surf <br />
        te enseñarán los primeros pasos que tienes que dar para seguir
        avanzando. <p>Fecha: 21/06/2021-23/06/2021</p> Lugar: Ferrol (A Coruña)
        <p>Precio:250€</p>
      </p>
    </div>
  );
}

export default Barranquismo;
