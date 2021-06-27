import Helmet from 'react-helmet';
import './About.css';

function About() {
    return (
        <div className="about">
            <h1>
                About us: We are a better company when talking about the unique
                experiencies.
            </h1>
            <Helmet>
                <title>Experiencias diferentes - About us</title>
            </Helmet>
            La idea para desarrollar una web intuitiva y de sencilla navegación
            que ofrezca experiencias diferentes y variadas a un precio razonable
            y con amplio abanico de fechas nace entre dos amigos quienes
            afrontan este reto con mucha ilusión y esfuerzo.
            <span className="trick"></span>
        </div>
    );
}

export default About;
