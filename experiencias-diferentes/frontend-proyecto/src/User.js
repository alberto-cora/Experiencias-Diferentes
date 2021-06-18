import "./User.css";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useUser } from "./UserContext";
import { NavLink } from "react-router-dom";

function User() {
  const me = useUser();
  const id = useParams().id || me?.id;
  const user = useFetch(`http://localhost:3080/api/users/${id}`);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="user">
      <h3> - ID USUARIO : {user.id}</h3>
      <h3> - EMAIL USUARIO : {user.email}</h3>
      <h3> - NOMBRE USUARIO : {user.name}</h3>
      <button>
        <NavLink to={`/user/${id}/update`} activeClassName="active" exact>
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
