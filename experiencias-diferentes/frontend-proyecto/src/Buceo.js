import Helmet from "react-helmet";
import "./Buceo.css";

function Buceo() {
  return (
    <div className="buceo">
      <h1>Buceo</h1>
      <Helmet>
        <title>Experiencias diferentes: Buceo</title>
      </Helmet>
      <div className="foto-buceo" />
      <h2 className="titulo">Buceo para principiantes</h2>
      <p className="buceo-principal">
        Una experiencia para aquellos que no sean expertos en la materia, estos
        maestros del surf <br />
        te enseñarán los primeros pasos que tienes que dar para seguir
        avanzando. <p>Fecha: 21/06/2021-23/06/2021</p> Lugar: Ferrol (A Coruña)
        <p>Precio:250€</p>
      </p>
      <div className="foto-buceo" />
      <h2 className="titulo">Buceo entre corales</h2>
      <p className="buceo2-principal">
        Una experiencia para aquellos que no sean expertos en la materia, estos
        maestros del surf <br />
        te enseñarán los primeros pasos que tienes que dar para seguir
        avanzando. <p>Fecha: 21/06/2021-23/06/2021</p> Lugar: Ferrol (A Coruña)
        <p>Precio:250€</p>
      </p>
    </div>
  );
}

export default Buceo;
