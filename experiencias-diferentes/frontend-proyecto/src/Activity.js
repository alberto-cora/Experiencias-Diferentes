import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useUser } from './UserContext';
import { Redirect } from 'react-router-dom';

function Activity() {
    const { id } = useParams();
    const activity = useFetch(`http://localhost:3080/api/activities/${id}`);
    const user = useUser();
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
            return <Redirect to={`/activity/${id}`} />;
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
            return <Redirect to={`/activity/${id}`} />;
        }
    };

    const imgUrl = `http://localhost:3000/uploads/${activity.image} `;

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
                <img src={imgUrl} />
            </li>
            <button onClick={handleReservation}>Reservar</button>
            <button onClick={handleDeleteReservation}>Cancelar reserva</button>
        </div>
    );
}

export default Activity;
