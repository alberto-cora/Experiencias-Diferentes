import './App.css';

import Helmet from 'react-helmet';
import Menu from './Menu';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Search from './Search';
import Profile from './Profile';
import Surf from './Surf';
import Buceo from './Buceo';
import Barranquismo from './Barranquismo';
import Velero from './Velero';
import Masajes from './Masajes';
import CreateActivity from './CreateActivity';
import Activity from './Activity';
import UpdateActivity from './UpdateActivity';
import User from './User';
import UpdateUser from './UpdateUser';
import Footer from './Footer';
import Where from './Where';

function App() {
  return (
    <div className='App'>
      <Helmet>
        <title>Experiencias diferentes</title>
      </Helmet>
      <Menu />
      <hr />
      <main>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/search/' exact>
            <Search />
          </Route>
          <Route path='/activities/surf' exact>
            <Surf />
          </Route>
          <Route path='/activities/buceo' exact>
            <Buceo />
          </Route>
          <Route path='/activities/barranquismo' exact>
            <Barranquismo />
          </Route>
          <Route path='/activities/velero' exact>
            <Velero />
          </Route>
          <Route path='/activities/masaje' exact>
            <Masajes />
          </Route>

          <Route path='/about' exact>
            <About />
          </Route>
          <Route path='/where' exact>
            <Where />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>

          <Route path='/activity/create'>
            <CreateActivity />
          </Route>
          <Route path='/activity/:id' exact>
            <Activity />
          </Route>

          <Route path='/activity/:id/update' exact>
            <UpdateActivity />
          </Route>

          <Route path='/user/:id' exact>
            <User />
          </Route>

          <Route path='/user/:id/update' exact>
            <UpdateUser />
          </Route>

          <Route path='/'>Not Found</Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
