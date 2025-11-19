import React, { useState, useContext } from "react";
import { authLogin } from "../api/auth.service";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    commerce: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const body = {
        username: form.username,
        password: form.password,
        commerce: Number(form.commerce),
      };

      const resp = await authLogin(body);
      const token = resp?.data?.token;

      if (!token) {
        setErrorMsg("No se recibió un token válido.");
        return;
      }

      login(token);
      navigate("/recargas");
    } catch (error) {
      console.error(error);
      setErrorMsg("Credenciales incorrectas o error del servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
  onSubmit={handleSubmit}
  className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 flex flex-col gap-5
             scale-90 opacity-0 animate-zoom-in"
  >
        <p className="text-center text-gray-500 text-sm">Plataforma PuntoRed</p>

        <h2 className="text-3xl font-extrabold text-black text-center -mt-2">
          Iniciar Sesión
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:shadow-lg outline-none transition"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:shadow-lg outline-none transition"
          required
        />

        <input
          type="number"
          name="commerce"
          placeholder="Código de comercio"
          value={form.commerce}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:shadow-lg outline-none transition"
          required
        />

        {errorMsg && (
          <p className="text-red-600 text-sm text-center font-medium">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold transition-all hover:bg-purple-700 hover:scale-[1.02] disabled:bg-purple-300 shadow-purple-200 shadow-md flex items-center justify-center"
        >
          {loading ? (
            <span className="loader"></span>
          ) : (
            "Ingresar"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
