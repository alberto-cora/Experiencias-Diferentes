import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import "./Profile.css";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

function Profile() {
  const isLoggedIn = useSelector((s) => !!s.user);

  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <div className="profile">
      <h1>Profile</h1>
      <Helmet>
        <title>Experiencias diferentes - My Profile</title>
      </Helmet>
      <div className="box">
        <div className="tabs">
          <NavLink to="/profile" exact activeClassName="active">
            My info
          </NavLink>
          <NavLink to="/profile/options" exact activeClassName="active">
            Options
          </NavLink>
          <NavLink to="/profile/bookings" exact activeClassName="active">
            History
          </NavLink>
        </div>
        <div className="content">
          <Switch>
            <Route path="/profile" exact>
              My info ...
            </Route>
            <Route path="/profile/options" exact>
              Options ...
            </Route>
            <Route path="/profile/bokkings" exact>
              Bookings ...
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Profile;
