import Helmet from 'react-helmet';
import './Where.css';

function Where() {
    return (
        <div className="where">
            <h1>Dónde estamos</h1>
            <Helmet>
                <title>Experiencias diferentes - Dónde estamos...</title>
            </Helmet>
            Nuestras oficinas centrales se encuentran situadas en una zona rural
            de la provincia de A Coruña. Y trabajamos con otras empresas locales
            las cuales nos alquilan el material necesario para cada disciplina.¡
            según donde se vaya a desarrollar cada actividad.
            <span className="foto-where"></span>
        </div>
    );
}

export default Where;
