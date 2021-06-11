import { NavLink } from 'react-router-dom';
import './Menu.css';
import { useState } from 'react';
import LoginModal from './LoginModal';
import { useUser } from './UserContext';

function Menu() {
    const [showModal, setShowModal] = useState(false);
    const user = useUser();
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

                <NavLink to="/activities/create" activeClassName="active" exact>
                    Crear Actividad
                </NavLink>

                <div className="user-area">
                    {!user && (
                        <button onClick={() => setShowModal(true)}>
                            Iniciar sesión
                        </button>
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
