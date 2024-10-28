import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TodoProvider } from "/src/components/TodoContext.jsx"; // Ajusta la ruta según tu estructura
import TodoList from "/src/components/TodoList.jsx"; // Ajusta la ruta según tu estructura
import AddTodoForm from "/src/components/AddTodoForm.jsx"; // Asegúrate de incluir tu componente para agregar tareas
import styles from "./App.module.css"; // Importa el módulo CSS

function App() {
  return (
    <TodoProvider>
      <Router>
        <div className={styles.PrincipalContenedor}>
          <div className={styles.App}>
            <h1>Mi Lista de Tareas</h1>
            <AddTodoForm />
            <Routes>
              <Route path="/" element={<TodoList />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;
