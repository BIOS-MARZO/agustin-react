import { useContext } from "react";
import TodoItem from "/src/components/TodoItem.jsx";
import { TodoContext } from "/src/components/TodoContext.jsx"; // Asegúrate de que la ruta sea correcta
import styles from "./Styles/TodoList.module.css";

function TodoList() {
  const { todos, deleteTodo, toggleComplete } = useContext(TodoContext);

  return (
    <div className={styles.containerToDoList}>
      {" "}
      {/* Corrige aquí */}
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
    </div>
  );
}

export default TodoList;
