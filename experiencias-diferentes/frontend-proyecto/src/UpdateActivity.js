import './Update.css';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function UpdateActivityWrapper() {
  const { id } = useParams();
  const activity = useFetch(`http://localhost:3080/api/activities/${id}`);
  const user = useSelector((s) => s.user);

  if (!activity) {
    return <i>Loading...</i>;
  }
  if (user && user.role && user.role === 'admin') {
    return <UpdateActivity activity={activity} />;
  } else {
    return 'Acceso no permitido';
  }
}

function UpdateActivity({ activity }) {
  const [activityName, setActivityName] = useState(activity.title || '');
  const [type, setType] = useState(activity.type || '');
  const [description, setDescription] = useState(activity.description || '');
  const [location, setLocation] = useState(activity.location || '');
  const [startDate, setStartDate] = useState(activity.startDate || '');
  const [endDate, setEndDate] = useState(activity.endDate || '');
  const [price, setPrice] = useState(activity.price || '');
  const [totalPlaces, setTotalPlaces] = useState(activity.totalPlaces || '');
  const [activityUpdated, setActivityUpdated] = useState(false);
  const [image, setImage] = useState();

  const { id } = useParams();

  const user = useSelector((s) => s.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3080/api/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        activityName,
        type,
        description,
        location,
        startDate,
        endDate,
        price,
        totalPlaces,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    });

    if (res.ok) {
      setActivityUpdated(true);
    }
  };

  if (activityUpdated) {
    return <Redirect to={`/activity/${id}`} />;
  }

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('image', image);
    const res = await fetch(
      `http://localhost:3080/api/activities/${id}/image`,
      {
        method: 'POST',
        body: fd,
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      }
    );

    if (res.ok) {
      setActivityUpdated(true);
    }
  };

  const handleImage = (e) => {
    const f = e.target.files[0];
    setImage(f);
  };
  return (
    <div className='update-activity'>
      <h1>Editar Actividad</h1>
      <form className='formUpdate' onSubmit={handleSubmit}>
        <h2>Nombre actividad:</h2>

        <input
          name='activityName'
          placeholder='activityName...'
          type='text'
          required
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
        />
        <h2> Tipo actividad:</h2>

        <label for='type'></label>
        <select name='type' id='type' onChange={(e) => setType(e.target.value)}>
          <option value='barranquismo'>Barranquismo</option>
          <option value='buceo'>Buceo</option>
          <option value='masaje'>Masaje</option>
          <option value='surf'>Surf</option>
          <option value='velero'>Velero</option>
        </select>

        <h2> Descripción:</h2>

        <textarea
          name='description'
          placeholder='description...'
          type='text'
          required
          value={description}
          maxlength='255'
          onChange={(e) => setDescription(e.target.value)}
        />
        <h2> Localización:</h2>

        <input
          name='location'
          placeholder='location...'
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <h2> Fecha inicio:</h2>

        <input
          name='startDate'
          placeholder='startDate...'
          type='datetime-local'
          required
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <h2> Fecha fin:</h2>

        <input
          name='endDate'
          placeholder='endDate...'
          type='datetime-local'
          required
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <h2> Precio:</h2>

        <input
          name='price'
          placeholder='price...'
          type='number'
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <h2> Plazas totales:</h2>

        <input
          name='totalPlaces'
          placeholder='totalPlaces...'
          type='number'
          min='0'
          required
          value={totalPlaces}
          onChange={(e) => setTotalPlaces(e.target.value)}
        />
        <button className='button-update'>Update</button>
      </form>
      <h1>Subir imagen</h1>
      <form className='formUpdate' onSubmit={handleSubmitImage}>
        <input
          name='image'
          placeholder='image'
          type='file'
          onChange={handleImage}
        />
        <button className='button-update'>subir imagen</button>
      </form>
      <NavLink to={`/activity/${id}`}>Volver a info actividad</NavLink>
    </div>
  );
}

export default UpdateActivityWrapper;
