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

    const res = await fetch(`http://localhost:3080/api/activities/${id}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setN(n + 1);
    } else {
      setError(data.error);
    }
  };

  const currentDate = new Date();
  return (
    <div className='activity'>
      <h2>{activity.type}</h2>
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
        <img src={activity.image} alt='imagen-actividad' />
      </li>

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
          <button onClick={handleDeleteReservation}>Cancelar reserva</button>
        )}
      {user &&
        new Date(activity.endDate) < currentDate &&
        book &&
        book.activityBookedByUser && (
          <form onSubmit={handleRate}>
            <label>
              Valoración
              <input
                name='rating'
                value={rating}
                type='number'
                min='0'
                max='5'
                onChange={(e) => setRating(e.target.value)}
              />
            </label>
            <button>Valorar</button>
            {error && <div className='error'>{error}</div>}
          </form>
        )}

      {user && user.role && user.role === 'admin' && (
        <NavLink to={`/activity/${id}/update`} activeClassName='active' exact>
          Editar actividad
        </NavLink>
      )}
    </div>
  );
}

export default Activity;
