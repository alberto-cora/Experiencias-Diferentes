import { useParams } from 'react-router-dom';
import useFetch from './useFetch';

function User() {
    const { id } = useParams();
    const user = useFetch(`http://localhost:3080/api/users/${id}`);

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div className="user">
            <h1> - id usuario : {user.id}</h1>
            <h1> - email usuario : {user.email}</h1>
            <h1> - nombre usuario : {user.name}</h1>
        </div>
    );
}

export default User;

//VER BIOGRAFÍA? FALTA EN BACKEND
