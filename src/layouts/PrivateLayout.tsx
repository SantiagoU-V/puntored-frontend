import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const PrivateLayout = () => {
  const { logout } = useContext(AuthContext)!;
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white">

      {/* BOTÓN FIJO PARA ABRIR/CERRAR */}
      <button
        onClick={() => setOpen(!open)}
        className="
          absolute top-4 left-4 z-50 
          bg-purple-600 text-white p-2 
          rounded-md shadow-md hover:bg-purple-700 transition
        "
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          bg-purple-600 text-white p-5 pt-16 flex flex-col
          transition-all duration-300 shadow-xl
          ${open ? "w-60" : "w-16"}
        `}
      >
        {/* TÍTULO */}
        <h2
          className={`
            text-black font-bold mb-6 transition-opacity duration-300
            ${open ? "opacity-100" : "opacity-0"}
          `}
        >
          PuntoRed
        </h2>

        {/* MENÚ */}
        {/* MENÚ */}
<nav className="flex flex-col gap-4 text-black">

  <Link
    to="/proveedores"
    className={`
      flex items-center rounded transition
      bg-purple-600 text-black font-semibold hover:bg-purple-200
      ${open ? "justify-start gap-2 p-2" : "justify-center p-2"}
    `}
  >
    <span className="text-xl">📡</span>
    {open && <span>Proveedores</span>}
  </Link>

  <Link
    to="/recargas"
    className={`
      flex items-center rounded transition
      bg-purple-600 text-black font-semibold hover:bg-purple-200
      ${open ? "justify-start gap-2 p-2" : "justify-center p-2"}
    `}
  >
    <span className="text-xl">⚡</span>
    {open && <span>Recargas</span>}
  </Link>

  <Link
    to="/historico"
    className={`
      flex items-center rounded transition
      bg-purple-600 text-black font-semibold hover:bg-purple-200
      ${open ? "justify-start gap-2 p-2" : "justify-center p-2"}
    `}
  >
    <span className="text-xl">📜</span>
    {open && <span>Histórico</span>}
  </Link>

</nav>


        {/* BOTÓN LOGOUT */}
        <button
  onClick={logout}
  className={`
    mt-auto bg-red-500 hover:bg-red-600 text-white 
    rounded font-semibold flex items-center transition
    ${open ? "justify-start gap-2 p-2" : "justify-center p-2"}
  `}
>
  <span className="text-xl">🚪</span>
  {open && <span>Cerrar sesión</span>}
</button>


      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-6 overflow-y-auto ml-16 text-black bg-white">
        <Outlet />
      </main>

    </div>
  );
};

export default PrivateLayout;
