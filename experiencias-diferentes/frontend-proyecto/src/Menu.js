import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Menu.css';
import { useState } from 'react';
import LoginModal from './LoginModal';
import { useUser } from './UserContext';
import { useSelector } from 'react-redux';

function Menu() {
    const [showModal, setShowModal] = useState(false);
    //const user = useUser();
    const user = useSelector((s) => s.user);

    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.stopPropagation();
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <aside className="menu">
            <div className="top">
                <NavLink to="/" activeClassName="active" exact>
                    Home
                </NavLink>
                <NavLink to="/activities/surf" activeClassName="active" exact>
                    Surf
                </NavLink>
                <NavLink to="/activities/buceo" activeClassName="active" exact>
                    Buceo
                </NavLink>
                <NavLink
                    to="/activities/barranquismo"
                    activeClassName="active"
                    exact
                >
                    Barranquismo
                </NavLink>
                <NavLink to="/activities/masaje" activeClassName="active" exact>
                    Masajes
                </NavLink>
                <NavLink to="/activities/velero" activeClassName="active" exact>
                    Velero
                </NavLink>
                {user && user.role && user.role === 'admin' && (
                    <NavLink
                        to="/activity/create"
                        activeClassName="active"
                        exact
                    >
                        Crear Actividad
                    </NavLink>
                )}
                <div className="user-area">
                    {!user && (
                        <button onClick={() => setShowModal(true)}>
                            Iniciar sesión
                        </button>
                    )}
                    {user && (
                        <Link className="user-info" to="/profile">
                            <div
                                className="avatar"
                                style={{
                                    backgroundImage: `url(${user.avatar})`,
                                }}
                            />
                            <span>{user.name}</span>
                            <span className="logout" onClick={handleLogout}>
                                Cerrar sesión
                            </span>
                        </Link>
                    )}
                </div>
                {showModal && (
                    <LoginModal closeModal={() => setShowModal(false)} />
                )}
            </div>
        </aside>
    );
}

export default Menu;
