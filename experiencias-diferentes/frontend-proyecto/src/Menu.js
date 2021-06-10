import { NavLink } from 'react-router-dom';
import './Menu.css';
import { useState } from 'react';

function Menu() {
    const [showModal, setShowModal] = useState(true);
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
                <NavLink to="/login" activeClassName="active" exact>
                    <button onClick={() => setShowModal(true)}>
                        Iniciar sesión
                    </button>
                </NavLink>
            </div>
        </aside>
    );
}

export default Menu;
