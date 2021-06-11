import { useState } from 'react';
import './LoginModal.css';
import { useSetUser, useUser } from './UserContext';
import { Redirect } from 'react-router-dom';

function Login({ setSignup, closeModal }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal] = useState(false);
    const setUser = useSetUser();
    const user = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3080/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
            const data = await res.json();
            setUser(data);
            console.log(showModal);
            closeModal();
        }
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <form onSubmit={handleLogin}>
            <h1>Iniciar sesión</h1>
            <label>
                Email: {user && user.id}
                <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Contraseña:
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button>Iniciar sesión</button>
            <p>
                Aún no tienes cuenta?
                <button type="button" onClick={() => setSignup(true)}>
                    Regístrate
                </button>
                <button onClick={closeModal}>X</button>
            </p>
        </form>
    );
}

function Signup({ setSignup, closeModal }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const setUser = useSetUser();
    const user = useUser();

    const handleSignup = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3080/api/users/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, repeatedPassword }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
            const data = await res.json();
            setUser(data);
            closeModal();
        }
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <form onSubmit={handleSignup}>
            <h1>Registro</h1>
            <label>
                Usuario:
                <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>

            <label>
                Email:
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>

            <label>
                Contraseña:
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            <label>
                Contraseña:
                <input
                    name="repeatedPassword"
                    type="password"
                    value={repeatedPassword}
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                />
            </label>

            <button>Registro</button>
            <p>
                Ya tienes cuenta?
                <button type="button" onClick={() => setSignup(false)}>
                    Inicia sesión
                </button>
                <button onClick={closeModal}>X</button>
            </p>
        </form>
    );
}

function LoginModal({ closeModal }) {
    const [isSignup, setSignup] = useState(false);

    return (
        <div className="modal-bg" onClick={closeModal}>
            <div className="modal-fg" onClick={(e) => e.stopPropagation()}>
                {!isSignup && (
                    <Login setSignup={setSignup} closeModal={closeModal} />
                )}
                {isSignup && (
                    <Signup setSignup={setSignup} closeModal={closeModal} />
                )}
            </div>
        </div>
    );
}

export default LoginModal;
