import { NavLink, Route, Switch } from 'react-router-dom';
import './Profile.css';
// import { useSelector } from "react-redux";
import { Helmet } from 'react-helmet';
import User from './User';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserBookings() {
    const me = useSelector((s) => s.user);
    const id = useParams()?.id || me?.id;
    const activities = useFetch(
        `http://localhost:3080/api/activities/users/${id}`
    );

    if (!activities) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="user-activities">
                <div>
                    {activities &&
                        activities?.map((activity) => (
                            <li>
                                <div className="search-results">
                                    <Link to={`/activity/${activity.id}`}>
                                        Ir a...{activity.title}
                                    </Link>
                                    <br />
                                    <img
                                        src={activity.image}
                                        alt="foto-actividad"
                                    />
                                    <p>
                                        <strong>Descripción:</strong>
                                        {activity.description}
                                    </p>
                                    <p>
                                        <strong>Precio:</strong>
                                        {activity.price}€
                                    </p>
                                    <p>
                                        <strong>Lugar:</strong>
                                        {activity.location}
                                    </p>
                                    <p>
                                        <strong>Fecha inicio:</strong>
                                        {activity.startDate}
                                    </p>
                                    <p>
                                        <strong>Fecha fin:</strong>
                                        {activity.endDate}
                                    </p>
                                </div>
                            </li>
                        ))}
                </div>
                {!activities && <i>Loading...</i>}
                {activities && activities.length === 0 && (
                    <i>No hay actividades!</i>
                )}
            </div>
        </div>
    );
}

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

                    <NavLink
                        to="/profile/bookings"
                        exact
                        activeClassName="active"
                    >
                        Historial
                    </NavLink>
                </div>
                <div className="content">
                    <Switch>
                        <Route path="/profile" exact>
                            <User />
                        </Route>
                        <Route path="/profile/bookings" exact>
                            <UserBookings />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Profile;
