import { useState } from 'react';
import './LoginModal.css';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Login({ setSignup, closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  //const [showModal] = useState(false);
  //  const setUser = useSetUser();
  //const user = useUser();
  const dispatch = useDispatch();

  const user = useSelector((s) => s.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3080/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();

    if (res.ok) {
      dispatch({ type: 'LOGIN', user: data });
      closeModal();
    } else {
      setError(data.error);
    }
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Iniciar sesión</h1>
      <label>
        Email: {user && user.id}
        <input
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Contraseña:
        <input
          name='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button>Iniciar sesión</button>
      <p>
        ¿Aún no tienes cuenta?
        <button
          className='button-modal'
          type='button'
          onClick={() => setSignup(true)}
        >
          Regístrate
        </button>
        <button className='escape-inicio' onClick={closeModal}>
          X
        </button>
      </p>
      {error && <div className='error'>{error}</div>}
    </form>
  );
}

function Signup({ setSignup, closeModal }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // const [avatar, setAvatar] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const user = useSelector((s) => s.user);

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3080/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, repeatedPassword }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: 'LOGIN', user: data });
      closeModal();
    } else {
      setError(data.error);
    }
  };

  if (user) {
    return <Redirect to='/' />;
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={handleSignup}>
      <h1>Registro</h1>
      <label>
        Usuario:
        <input
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Email:
        <input
          name='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Contraseña:
        <input
          name='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label>
        Contraseña:
        <input
          name='repeatedPassword'
          type='password'
          value={repeatedPassword}
          onChange={(e) => setRepeatedPassword(e.target.value)}
        />
      </label>

      <button>Registro</button>
      <p>
        ¿Ya tienes cuenta?
        <button
          className='button-modal'
          type='button'
          onClick={() => setSignup(false)}
        >
          Inicia sesión
        </button>
        <button className='escape-registro' onClick={closeModal}>
          X
        </button>
      </p>
      {error && <div className='error'>{error}</div>}
    </form>
  );
}

function LoginModal({ closeModal }) {
  const [isSignup, setSignup] = useState(false);

  return (
    <div className='modal-bg' onClick={closeModal}>
      <div className='modal-fg' onClick={(e) => e.stopPropagation()}>
        {!isSignup && <Login setSignup={setSignup} closeModal={closeModal} />}
        {isSignup && <Signup setSignup={setSignup} closeModal={closeModal} />}
      </div>
    </div>
  );
}

export default LoginModal;
