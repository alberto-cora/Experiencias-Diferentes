import './CreateActivity.css';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CreateActivity() {
    const [activityName, setActivityName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState('');
    const [totalPlaces, setTotalPlaces] = useState('');
    const [createdActivity, setCreateActivity] = useState(false);

    const user = useSelector((s) => s.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3080/api/activities', {
            method: 'POST',
            body: JSON.stringify({
                activityName,
                type,
                description,
                location,
                startDate,
                endDate,
                price,
                totalPlaces,
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
        });
        if (res.ok) {
            setCreateActivity(true);
        }
    };

    if (createdActivity) {
        return <Redirect to={`/`} />;
    }

    if (user && user.role && user.role === 'admin') {
        return (
            <div className="create-activity">
                <h1>Crear Actividad</h1>
                <form className="formCreate" onSubmit={handleSubmit}>
                    <h2>Nombre actividad:</h2>
                    <input
                        name="activityName"
                        placeholder="activityName..."
                        type="text"
                        required
                        value={activityName}
                        onChange={(e) => setActivityName(e.target.value)}
                    />
                    <h2> Tipo actividad:</h2>
                    <label for="type"></label>
                    <select
                        name="type"
                        id="type"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="barranquismo">Barranquismo</option>
                        <option value="buceo">Buceo</option>
                        <option value="masaje">Masaje</option>
                        <option value="surf">Surf</option>
                        <option value="velero">Velero</option>
                    </select>

                    <h2> Descripción:</h2>

                    <textarea
                        name="description"
                        placeholder="description..."
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <h2> Localización:</h2>

                    <input
                        name="location"
                        placeholder="location..."
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <h2> Fecha inicio:</h2>
                    <input
                        name="startDate"
                        placeholder="startDate..."
                        type="datetime-local"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <h2> Fecha fin:</h2>
                    <input
                        name="endDate"
                        placeholder="endDate..."
                        type="datetime-local"
                        required
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <h2> Precio:</h2>
                    <input
                        name="price"
                        placeholder="price..."
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <h2> Plazas totales:</h2>
                    <input
                        name="totalPlaces"
                        placeholder="totalPlaces..."
                        type="number"
                        min="0"
                        required
                        value={totalPlaces}
                        onChange={(e) => setTotalPlaces(e.target.value)}
                    />
                    <button className="button-create">Continuar</button>
                </form>
            </div>
        );
    } else {
        return 'Acceso no permitido';
    }
}

export default CreateActivity;
