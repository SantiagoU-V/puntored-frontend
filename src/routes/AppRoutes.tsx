import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import RecargaForm from "../pages/RecargaForm";
import Proveedores from "../pages/Proveedores";
import Historico from "../pages/Historico";
import PrivateLayout from "../layouts/PrivateLayout";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AppRoutes = () => {
  const { token } = useContext(AuthContext)!;

  return (
    <BrowserRouter>
      <Routes>
        {/* Login público */}
        <Route path="/login" element={<Login />} />

        {/* Layout privado */}
        <Route
          path="/"
          element={token ? <PrivateLayout /> : <Navigate to="/login" />}
        >
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="recargas" element={<RecargaForm />} />
          <Route path="historico" element={<Historico />} />
        </Route>

        {/* root redirect */}
        <Route
          path="*"
          element={<Navigate to={token ? "/proveedores" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
