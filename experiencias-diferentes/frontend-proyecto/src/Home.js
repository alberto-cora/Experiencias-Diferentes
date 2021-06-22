import Helmet from 'react-helmet';
import Search from './Search';

function Home() {
  return (
    <div className='home'>
      <h1>Home</h1>
      <Helmet>
        <title>Experiencias diferentes - Home</title>
      </Helmet>
      Welcome to the web where your adventures can come true
      <Search />
      <hr />
    </div>
  );
}

export default Home;
