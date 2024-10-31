import { useContext } from "react";
import TodoItem from "/src/components/TodoItem.jsx";
import { TodoContext } from "/src/components/TodoContext.jsx"; // Asegúrate de que la ruta sea correcta
import styles from "./Styles/TodoList.module.css";

function TodoList() {
  const { todos, deleteTodo, toggleComplete, restoreTodos } =
    useContext(TodoContext);

  return (
    <div>
      <ul className={styles.list}>
        {todos.length === 0 ? (
          <li>No hay tareas disponibles</li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
            />
          ))
        )}
      </ul>
      {/* Botón para restaurar las tareas desde db.json */}
      <button onClick={restoreTodos} className={styles.restoreButton}>
        Restaurar Tareas
      </button>
    </div>
  );
}

export default TodoList;
