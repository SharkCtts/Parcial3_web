// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style.css"; // o donde tengas tus estilos globales

function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const activo = localStorage.getItem("usuarioActivo");
    if (activo) {
      setUsuario(JSON.parse(activo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuario(null);
    navigate("/login");
  };

  return (
    <header className="custom-header p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/" className="menu-button flex items-center gap-2">
          📦 Visualizar Stock
        </Link>
        <Link to="/graficas" className="menu-button flex items-center gap-2">
          📊 Ver Gráficas
        </Link>
        <Link to="/historial" className="menu-button flex items-center gap-2">
          🕒 Visualizar Historial
        </Link>
      </div>

      <div className="flex items-center gap-2 text-white">
        {usuario ? (
          <>
            <span>{usuario.nombre}</span>
            <button onClick={handleLogout} className="menu-button">
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="menu-button">
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
