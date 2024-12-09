import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TodoProvider } from "./components/TodoContext";
import TodoList from "./components/TodoList"; // Asegúrate de importar correctamente TodoList
import AddTodoForm from "./components/AddTodoForm";
import EditTodoForm from "./components/EditTodoForm";
import styles from "./App.module.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";

// Componente para manejar el loading
function AppContent() {
  const { loading } = useAuth(); // Obtenemos el estado de carga del contexto

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.PrincipalContenedor}>
      <div className={styles.App}>
        <h1 className={styles.title}>To Do List</h1>
        <AddTodoForm />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<ProtectedRoute element={<TodoList />} />} />
          <Route
            path="/edit/:_id"
            element={<ProtectedRoute element={<EditTodoForm />} />}
          />
          {/* Ruta /todos que ahora redirige a TodoList */}
          <Route
            path="/todos"
            element={<ProtectedRoute element={<TodoList />} />}
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </TodoProvider>
  );
}

export default App;
