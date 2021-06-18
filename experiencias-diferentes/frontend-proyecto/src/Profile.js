import { NavLink, Route, Switch } from "react-router-dom";
import "./Profile.css";
// import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import User from "./User";

function Profile() {
  // const isLoggedIn = useSelector((s) => !!s.user);

  // if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <div className="profile">
      <h1>Perfil</h1>
      <Helmet>
        <title>Experiencias diferentes - Mi Perfil</title>
      </Helmet>
      <div className="box">
        <div className="tabs">
          <NavLink to="/profile" exact activeClassName="active">
            Información
          </NavLink>

          <NavLink to="/profile/bookings" exact activeClassName="active">
            Historial
          </NavLink>
        </div>
        <div className="content">
          <Switch>
            <Route path="/profile" exact>
              <User />
            </Route>
            <Route path="/profile/bookings" exact>
              Bookings ...
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Profile;
