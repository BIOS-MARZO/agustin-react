import { FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import styles from "./Styles/TodoItem.module.css";
import { Link } from "react-router-dom";

function TodoItem({
  todo: { id, name = "Tarea sin nombre", completed = false }, // Valor por defecto para name
  toggleComplete,
  deleteTodo,
}) {
  const handleToggleComplete = () => toggleComplete(id);
  const handleDeleteTodo = () => deleteTodo(id);

  return (
    <div className={styles.containerText}>
      <li className={styles.todoItem}>
        <span className={styles.tareaTexto}>{name}</span>
        <div className={styles.botonesJuntos}>
          <button
            className={`${styles.botonCompletar} ${
              completed ? styles.activo : styles.incompleto
            }`}
            onClick={handleToggleComplete}
            aria-label={`Marcar como ${completed ? "incompleto" : "completo"}`}
          >
            <FaCheck />
          </button>
          */ Redirigimos/*
          <Link to={`/edit/${id}`} aria-label="Editar tarea">
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
    </div>
  );
}

// Validación de propiedades con PropTypes
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string, // Hacemos que name no sea obligatorio
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
