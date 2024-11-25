import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TodoProvider } from "/src/components/TodoContext.jsx";
import TodoList from "/src/components/TodoList.jsx";
import AddTodoForm from "/src/components/AddTodoForm.jsx";
import styles from "./App.module.css";
import EditTodoForm from "/src/components/EditTodoForm.jsx";

function App() {
  return (
    <TodoProvider>
      <Router>
        <div className={styles.PrincipalContenedor}>
          <div className={styles.App}>
            <h1 className={styles.title}>To Do List</h1>
            <AddTodoForm />
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/edit/:_id" element={<EditTodoForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;
