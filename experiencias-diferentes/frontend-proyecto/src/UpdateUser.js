import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

function UpdateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userUpdated, setUserUpdated] = useState(false);
    const { id } = useParams();
    const user = useFetch(`http://localhost:3080/api/users/${id}`);

    if (!user) {
        return <div>Loading...</div>;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:3080/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                email,
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
        });
        if (res.ok) {
            setUserUpdated(true);
        }
    };

    if (userUpdated) {
        return <Redirect to={`/user/${id}`} />;
    }

    return (
        <div className="update-user">
            <h1>Editar datos Usuario</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="name..."
                    type="text"
                    required
                    value={name || user.name}
                    onChange={(e) => {
                        user.name = '';
                        setName(e.target.value);
                    }}
                />

                <input
                    name="email"
                    placeholder="email..."
                    type="email"
                    required
                    value={email || user.email}
                    onChange={(e) => {
                        user.email = '';
                        setEmail(e.target.value);
                    }}
                />

                <button>update</button>
            </form>
        </div>
    );
}

export default UpdateUser;
