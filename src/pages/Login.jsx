// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.clave === clave
    );

    if (usuario) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      navigate("/");
    } else {
      setError("Correo o clave incorrectos");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button type="submit" className="menu-button w-full">Entrar</button>
      </form>
      <p className="mt-4 text-white">
        ¿No tienes cuenta?{" "}
        <button className="underline" onClick={() => navigate("/registro")}>
          Regístrate
        </button>
      </p>
    </main>
  );
}

export default Login;
