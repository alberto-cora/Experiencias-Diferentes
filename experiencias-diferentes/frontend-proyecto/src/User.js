import './User.css';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function User() {
    const me = useSelector((s) => s.user);
    const id = useParams()?.id || me?.id;
    const user = useFetch(`http://localhost:3080/api/users/${id}`);
    const activities = useFetch(
        `http://localhost:3080/api/activities/users/${id}`
    );

    if (!user || !activities) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="user">
                <h3 className="info">
                    - ID USUARIO : <i> {user.id}</i>
                </h3>
                <h3 className="info">
                    - EMAIL USUARIO : <i> {user.email}</i>
                </h3>
                <h3 className="info">
                    - NOMBRE USUARIO : <i> {user.name}</i>
                </h3>
                <h3 className="infofoto">
                    <img src={user.image} alt="foto-usuario" />
                </h3>
                <button className="button-edit">
                    <NavLink
                        to={`/user/${id}/update`}
                        activeClassName="active"
                        exact
                    >
                        Editar datos usuario
                    </NavLink>
                </button>
            </div>

            <div className="user-activities">
                <h2>Actividades</h2>
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
                                        Search.css
                                        <strong>Plazas totales:</strong>
                                        {activity.totalPlaces}
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

export default User;

//VER BIOGRAFÍA? FALTA EN BACKEND
