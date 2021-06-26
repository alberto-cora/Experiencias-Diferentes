import './Activity.css';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Activity() {
    const { id } = useParams();
    const [n, setN] = useState(0);
    const [error, setError] = useState(null);

    const activity = useFetch(`http://localhost:3080/api/activities/${id}`, n);
    const book = useFetch(
        `http://localhost:3080/api/activities/${id}/books/users`,
        n
    );
    const user = useSelector((s) => s.user);
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

        const data = await res.json();

        if (res.ok) {
            setN(n + 1);
        } else {
            setError(data.error);
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
        const data = await res.json();

        if (res.ok) {
            setN(n + 1);
        } else {
            setError(data.error);
        }
    };

    const sendRating = async (value) => {
        const res = await fetch(
            `http://localhost:3080/api/activities/${id}/rate`,
            {
                method: 'POST',
                body: JSON.stringify({ rating: value }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token,
                },
            }
        );

        const data = await res.json();

        if (res.ok) {
            setN(n + 1);
        } else {
            setError(data.error);
        }
    };

    const currentDate = new Date();
    return (
        <div className="activity">
            <h2 className="type">{activity.type}</h2>
            <p className="foto-actividad">
                <img src={activity.image} alt="imagen-actividad" />
            </p>
            <p className="title">
                <strong>Título:</strong>
                {activity.title}
            </p>
            <p className="id">
                <strong>ID:</strong>
                {activity.id}
            </p>
            <p className="bio">
                <strong>Descripción:</strong>
                {activity.description}
            </p>
            <p className="date-start">
                <strong>Fecha inicio:</strong>
                {new Date(activity.startDate).toLocaleDateString()}
            </p>
            <p className="date-end">
                <strong>Fecha fin:</strong>
                {new Date(activity.endDate).toLocaleDateString()}
            </p>
            <p className="totalplaces">
                <strong>Plazas totales:</strong>
                {activity.totalPlaces}
            </p>
            <p className="price">
                <strong>Precio:</strong>
                {activity.price}€
            </p>
            <p className="location">
                <strong>Lugar:</strong>
                {activity.location}
            </p>
            <p className="places">
                <strong>Plazas disponibles:</strong>
                {activity.availablePlaces}
            </p>
            <p className="rating">
                <strong>Valoración:</strong>
                {activity.rating}
            </p>
            {user &&
                new Date(activity.startDate) > currentDate &&
                book &&
                !book.activityBookedByUser && (
                    <button onClick={handleReservation}>Reservar</button>
                )}
            {user &&
                new Date(activity.startDate) > currentDate &&
                book &&
                book.activityBookedByUser && (
                    <button onClick={handleDeleteReservation}>
                        Cancelar reserva
                    </button>
                )}
            {error && <div className="error">{error}</div>}
            {user &&
                new Date(activity.endDate) < currentDate &&
                book &&
                book.activityBookedByUser && (
                    <>
                        <ul className="rate">
                            Valora aquí...
                            <li onClick={() => sendRating(1)}>⭐</li>
                            <li onClick={() => sendRating(2)}>⭐</li>
                            <li onClick={() => sendRating(3)}>⭐</li>
                            <li onClick={() => sendRating(4)}>⭐</li>
                            <li onClick={() => sendRating(5)}>⭐</li>
                        </ul>
                        {error && <div className="error">{error}</div>}
                    </>
                )}
            {user && user.role && user.role === 'admin' && (
                <NavLink
                    className="edit"
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
