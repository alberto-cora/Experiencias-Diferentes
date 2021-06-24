import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Menu.css';
import { useState } from 'react';
import LoginModal from './LoginModal';
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
    <aside className='menu' id='menu'>
      <div className='top'>
        <NavLink to='/' activeClassName='active' exact>
          Home
        </NavLink>
        <NavLink to='/search?type=surf&location=&date=&price=' exact>
          Surf
        </NavLink>
        <NavLink to='/search?type=buceo&location=&date=&price=' exact>
          Buceo
        </NavLink>
        <NavLink to='/search?type=barranquismo&location=&date=&price=' exact>
          Barranquismo
        </NavLink>
        <NavLink to='/search?type=masaje&location=&date=&price=' exact>
          Masajes
        </NavLink>
        <NavLink to='/search?type=velero&location=&date=&price=' exact>
          Velero
        </NavLink>
        {user && user.role && user.role === 'admin' && (
          <NavLink to='/activity/create' activeClassName='active' exact>
            Crear Actividad
          </NavLink>
        )}
        <div className='user-area'>
          {!user && (
            <button onClick={() => setShowModal(true)}>Iniciar sesión</button>
          )}
          {user && (
            <Link className='user-info' to='/profile'>
              <div
                className='avatar'
                style={{
                  backgroundImage: `url(${user.image})`,
                }}
              />
              <span>{user.name}</span>
            </Link>
          )}
          {user && (
            <Link className='user-info' to='/'>
              <span className='logout' onClick={handleLogout}>
                Cerrar sesión
              </span>
            </Link>
          )}
        </div>
        {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
      </div>
    </aside>
  );
}

export default Menu;
