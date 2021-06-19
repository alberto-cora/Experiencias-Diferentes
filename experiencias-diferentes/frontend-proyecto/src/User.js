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
            <li> ID USUARIO : {user.id}</li>
            <li> EMAIL USUARIO : {user.email}</li>
            <li> NOMBRE USUARIO : {user.name}</li>
            <li>
                activity/create
                <img src={user.image} alt="" />
            </li>
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
// const url = path.join(__dirname, `../static/users/${id_user}/${file.filename}`);
// const updateUser = await usersRepository.updateAvatar(url, id_user);
