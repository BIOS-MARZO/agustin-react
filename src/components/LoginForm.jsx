import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { login } = useContext(AuthContext); // Accede al contexto de autenticación
  const [email, setEmail] = useState(""); // Estado para el email
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(""); // Estado para el error
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const navigate = useNavigate(); // Hook para navegar a otras rutas

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la acción por defecto de enviar el formulario
    setError(""); // Limpiar errores anteriores
    setIsLoading(true); // Mostrar el estado de carga

    try {
      // Hacer la solicitud POST para el login
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      // Obtener el token y usuario de la respuesta
      const { token, user } = response.data;

      // Guardar el token y el usuario en el contexto global
      login(token, user);

      // Redirigir al usuario a la página /todos después de un inicio exitoso
      navigate("/todos");
      console.log("Redirigiendo a /todos...");
    } catch (err) {
      // Si ocurre un error, mostrar mensaje de error
      setError(
        err.response?.data?.message ||
          "Credenciales incorrectas. Intenta nuevamente."
      );
    } finally {
      setIsLoading(false); // Detener el estado de carga
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Mostrar errores si hay */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Manejar cambio del email
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Manejar cambio de la contraseña
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {" "}
          {/* Deshabilitar mientras se carga */}
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
