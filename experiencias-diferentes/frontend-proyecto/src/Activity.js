import './Activity.css';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Activity() {
    const { id } = useParams();
    const [n, setN] = useState(0);
    const activity = useFetch(`http://localhost:3080/api/activities/${id}`, n);
    const user = useSelector((s) => s.user);
    const [rating, setRating] = useState('');
    if (!activity) {
        return (
            <div>
                <i>Loading...</i>
            </div>
        );
    }

    const handleReservation = async (e) => {
        e.preventDefault();

        const res = await fetch(
            `http://localhost:3080/api/activities/${id}/books`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token,
                },
            }
        );
        if (res.ok) {
            setN(n + 1);
        }
    };

    const handleDeleteReservation = async (e) => {
        e.preventDefault();

        const res = await fetch(
            `http://localhost:3080/api/activities/${id}/books`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token,
                },
            }
        );
        if (res.ok) {
            setN(n + 1);
        }
    };

    const handleRate = async (e) => {
        e.preventDefault();

        const res = await fetch(
            `http://localhost:3080/api/activities/${id}/rate`,
            {
                method: 'POST',
                body: JSON.stringify({ rating }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token,
                },
            }
        );
        if (res.ok) {
            return <Redirect to={`/activity/${id}`} />;
        }
    };

    const currentDate = new Date();
    return (
        <div className="activity">
            <h2>Nombre actividad:{activity.name}</h2>
            <li>
                <strong>Título:</strong>
                {activity.title}
            </li>
            <li>
                <strong>ID:</strong>
                {activity.id}
            </li>
            <li>
                <strong>Descripción:</strong>
                {activity.description}
            </li>
            <li>
                <strong>Fecha inicio:</strong>
                {activity.startDate}
            </li>
            <li>
                <strong>Fecha fin:</strong>
                {activity.endDate}
            </li>
            <li>
                <strong>Plazas totales:</strong>
                {activity.totalPlaces}
            </li>
            <li>
                <strong>Precio:</strong>
                {activity.price}€
            </li>
            <li>
                <strong>Lugar:</strong>
                {activity.location}
            </li>
            <li>
                <strong>Plazas disponibles:</strong>
                {activity.availablePlaces}
            </li>
            <li>
                <strong>Valoración:</strong>
                {activity.rating}
            </li>
            <li>
                <img src={activity.image} alt="" />
            </li>

            {user && new Date(activity.startDate) > currentDate && (
                <button onClick={handleReservation}>Reservar</button>
            )}
            {user && new Date(activity.startDate) > currentDate && (
                <button onClick={handleDeleteReservation}>
                    Cancelar reserva
                </button>
            )}
            {user && new Date(activity.endDate) < currentDate && (
                <form onSubmit={handleRate}>
                    <label>
                        Valoración
                        <input
                            name="rating"
                            value={rating}
                            type="number"
                            min="0"
                            max="5"
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </label>
                    <button>Valorar</button>
                </form>
            )}

            {user && user.role && user.role === 'admin' && (
                <NavLink
                    to={`/activity/${id}/update`}
                    activeClassName="active"
                    exact
                >
                    Editar actividad
                </NavLink>
            )}
        </div>
    );
}

export default Activity;
