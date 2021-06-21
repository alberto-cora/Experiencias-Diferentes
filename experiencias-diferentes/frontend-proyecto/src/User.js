import './User.css';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function User() {
    const me = useSelector((s) => s.user);
    const id = useParams()?.id || me?.id;
    const user = useFetch(`http://localhost:3080/api/users/${id}`);

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
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
            <h3 className="info">
                - FOTO PERFIL
                <img src={user.image} alt="" />
            </h3>
            <button>
                <NavLink
                    to={`/user/${id}/update`}
                    activeClassName="active"
                    exact
                >
                    Editar datos usuario
                </NavLink>
            </button>
        </div>
    );
}

export default User;

//VER BIOGRAFÍA? FALTA EN BACKEND
