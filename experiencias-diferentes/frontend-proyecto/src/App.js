import './App.css';
// import Login from "./Login";

import Helmet from 'react-helmet';
import { useState } from 'react';
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
//import LoginModal from './LoginModal';
import CreateActivity from './CreateActivity';

function App() {
    const [showModal, setShowModal] = useState(true);
    return (
        <div className="App">
            <Helmet>
                <title>Experiencias diferentes</title>
            </Helmet>
            <Menu />
            <hr />
            {/* <Search /> */}
            {/* <Profile /> */}
            <main>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/search/:q?" exact>
                        <Search />
                    </Route>
                    <Route path="/activities/surf" exact>
                        <Surf />
                    </Route>
                    <Route path="/activities/buceo" exact>
                        <Buceo />
                    </Route>
                    <Route path="/activities/barranquismo" exact>
                        <Barranquismo />
                    </Route>
                    <Route path="/activities/velero" exact>
                        <Velero />
                    </Route>
                    <Route path="/activities/masaje" exact>
                        <Masajes />
                    </Route>

                    <Route path="/about" exact>
                        <About />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>

                    <Route path="/activities/create">
                        <CreateActivity />
                    </Route>

                    <Route path="/">Not Found</Route>
                </Switch>
            </main>
        </div>
    );
}

export default App;
