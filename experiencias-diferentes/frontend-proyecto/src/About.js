import Helmet from 'react-helmet';

function About() {
    return (
        <div className="about">
            <h1>About us</h1>
            <Helmet>
                <title>Experiencias diferentes - About us</title>
            </Helmet>
            La empresa nace como una idea de dos amigos para cubrir un espacio
            en el mercado en cual se demanden actividades de aventura.
            Destacamos por ser una empresa que oferta una serie de experiencias
            diferentes de lo más variada y singular.
        </div>
    );
}

export default About;
