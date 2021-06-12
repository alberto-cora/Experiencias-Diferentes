import { useState } from 'react';
import { useUser } from './UserContext';
import { Redirect } from 'react-router-dom';

function CreateActivity() {
    const [activityName, setActivityName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState('');
    const [totalPlaces, setTotalPlaces] = useState('');

    const user = useUser();

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
            return <Redirect to="/" />;
        }
    };

    return (
        <div className="create-activity">
            <h1>Create Activity</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="activityName"
                    placeholder="activityName..."
                    type="text"
                    required
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                />
                <input
                    name="type"
                    placeholder="type..."
                    type="text"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <input
                    name="description"
                    placeholder="description..."
                    type="text-area"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    name="location"
                    placeholder="location..."
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    name="startDate"
                    placeholder="startDate..."
                    type="datetime-local"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    name="endDate"
                    placeholder="endDate..."
                    type="datetime-local"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <input
                    name="price"
                    placeholder="price..."
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    name="totalPlaces"
                    placeholder="totalPlaces..."
                    type="number"
                    min="0"
                    required
                    value={totalPlaces}
                    onChange={(e) => setTotalPlaces(e.target.value)}
                />
                <button>Create</button>
            </form>
        </div>
    );
}

export default CreateActivity;
