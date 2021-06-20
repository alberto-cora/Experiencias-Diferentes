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
        return <div>Loading...</div>;
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

    return (
        <div className="activity">
            <h1>{activity.name}</h1>
            <li>{activity.title}</li>
            <li>{activity.id}</li>
            <li>{activity.description}</li>
            <li>{activity.endDate}</li>
            <li>{activity.totalPlaces}</li>
            <li>{activity.price}</li>
            <li>{activity.location}</li>
            <li>{activity.availablePlaces}</li>
            <li>{activity.rating}</li>
            <li>
                <img src={activity.image} alt="" />
            </li>
            <button onClick={handleReservation}>Reservar</button>
            <button onClick={handleDeleteReservation}>Cancelar reserva</button>
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
