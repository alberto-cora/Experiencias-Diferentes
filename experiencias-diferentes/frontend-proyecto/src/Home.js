import Helmet from 'react-helmet';
import Search from './Search';
import './Home.css';
function Home() {
    return (
        <div className="home" id="home">
            <Helmet>
                <title>Experiencias diferentes - Home</title>
            </Helmet>
            <h1 class="home-header">
                Welcome to the web where your adventures can come true
            </h1>
            <Search />
            <hr />
            <div className="foto-principal"></div>
        </div>
    );
}
export default Home;
