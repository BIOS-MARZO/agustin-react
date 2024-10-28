import { FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import styles from "./Styles/TodoItem.module.css";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  const handleToggleComplete = () => {
    toggleComplete(todo.id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  return (
    <li className={styles.todoItem}>
      <span className={styles.tareaTexto}>{todo.text}</span>
      <div className={styles.botonesJuntos}>
        <button
          className={`${styles.botonCompletar} ${
            todo.completed ? styles.activo : styles.incompleto
          }`}
          onClick={handleToggleComplete}
          aria-label={`Marcar como ${
            todo.completed ? "incompleto" : "completo"
          }`}
        >
          <FaCheck />
        </button>
        <Link to={`/edit/${todo.id}`} aria-label="Editar tarea">
          <button className={styles.botonEditar}>
            <FaEdit />
          </button>
        </Link>

        <button
          className={styles.botonEliminar}
          onClick={handleDeleteTodo}
          aria-label="Eliminar tarea"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

// Validación de propiedades con PropTypes
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
