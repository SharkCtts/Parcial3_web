import React, { useState, useEffect } from "react";
import "./navbar.css"; // Asegúrate de crear este archivo o importar estilos globales

const Navbar = () => {
  const [usuario, setUsuario] = useState(localStorage.getItem("usuario") || "");
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario("");
    setMenuAbierto(false);
  };

  const alternarMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const iniciarSesion = () => {
    const nombre = prompt("Nombre de usuario:");
    if (nombre) {
      localStorage.setItem("usuario", nombre);
      setUsuario(nombre);
      setMenuAbierto(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".user-menu")) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <header className="custom-header flex items-center justify-between px-4 py-2 text-white">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" style={{ height: "30px" }} />
        <span>Enviar a <strong>Colombia</strong></span>
      </div>

      <div className="flex items-center flex-grow max-w-md mx-4">
        <select className="rounded-l px-2 py-1 border-none text-black">
          <option>Todos</option>
          <option>Electrónica</option>
          <option>Moda</option>
        </select>
        <input
          type="text"
          placeholder="Buscar en Amazon"
          className="flex-grow px-2 py-1 text-black"
        />
        <button className="bg-yellow-400 px-3 py-1 rounded-r">🔍</button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative user-menu">
          <button onClick={alternarMenu} className="menu-button">
            {usuario ? `Hola, ${usuario}` : "Hola, Identifícate"}
          </button>
          {menuAbierto && (
            <div className="dropdown absolute right-0 mt-2 bg-white text-black rounded shadow-lg">
              {usuario ? (
                <a href="#" onClick={cerrarSesion}>Cerrar sesión</a>
              ) : (
                <a href="#" onClick={iniciarSesion}>Iniciar sesión</a>
              )}
            </div>
          )}
        </div>

        <a href="#historial" className="text-sm"><strong>Devoluciones</strong><br />y pedidos</a>
        <a href="#carrito" className="text-sm flex items-center">
          🛒 <span className="ml-1">Carrito</span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
