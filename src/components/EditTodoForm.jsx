import { useContext, useState, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Styles/EditTodoForm.module.css";

function EditTodoForm() {
  const { todos, editTodo } = useContext(TodoContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Encuentra la tarea por ID
  const todo = todos.find((todo) => todo.id === id);
  const [name, setName] = useState("");

  // Verificamos si existe el ID
  useEffect(() => {
    if (todo) {
      setName(todo.name);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificamos que no esté vacio el campo
    if (name.trim() !== "") {
      editTodo(todo.id, name); // Llama a la función editTodo para actualizar el nombre
      navigate("/"); // Redirige de vuelta a la lista principal después de editar
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.inputEdit}
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)} // Permite cambiar el valor del input
        placeholder="Editar tarea"
        required
      />
      <button className={styles.saveButton} type="submit">
        Editar tarea ✅
      </button>
    </form>
  );
}

export default EditTodoForm;
