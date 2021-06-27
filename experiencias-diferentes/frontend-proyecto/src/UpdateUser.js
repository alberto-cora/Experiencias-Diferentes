import './UpdateUser.css';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UpdateUserWrapper() {
  const { id } = useParams();
  const user = useFetch(`http://localhost:3080/api/users/${id}`);

  if (!user) {
    return <i>Loading...</i>;
  }

  return <UpdateUser user={user} />;
}

function UpdateUser({ user }) {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [userUpdated, setUserUpdated] = useState(false);
  const { id } = useParams();
  const [image, setImage] = useState();

  const userToken = useSelector((s) => s.user);

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
        Authorization: 'Bearer ' + userToken.token,
      },
    });
    if (res.ok) {
      setUserUpdated(true);
    }
  };

  const handleSubmitUserImage = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('image', image);
    const res = await fetch(`http://localhost:3080/api/users/${id}/image`, {
      method: 'POST',
      body: fd,
      headers: {
        Authorization: 'Bearer ' + userToken.token,
      },
    });

    if (res.ok) {
      setUserUpdated(true);
    }
  };

  const handleUserImage = (e) => {
    const f = e.target.files[0];
    setImage(f);
  };

  if (userUpdated) {
    return <Redirect to={`/profile`} />;
  }

  return (
    <div className='update-user'>
      <h1>Editar datos Usuario</h1>
      <form className='formUser' onSubmit={handleSubmit}>
        {/* {userToken.id} */}
        <h2>Nombre:</h2>

        <input
          name='name'
          placeholder='name...'
          type='text'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h2>Email:</h2>

        <input
          name='email'
          placeholder='email...'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className='button-update'>Actualizar</button>

        <NavLink className='back' to='/profile' exact>
          Atrás
        </NavLink>
      </form>
      <hr />

      <h1>Subir imagen</h1>
      <form className='formUpdate' onSubmit={handleSubmitUserImage}>
        <input
          name='image'
          placeholder='image'
          type='file'
          onChange={handleUserImage}
        />
        <button className='button-update'>Subir imagen</button>
      </form>
    </div>
  );
}

export default UpdateUserWrapper;
