import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSetUser, useUser } from "./UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useUser();
  const setUser = useSetUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;
