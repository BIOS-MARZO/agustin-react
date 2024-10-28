import { useContext, useState, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import { useParams, useNavigate } from "react-router-dom";

function EditTodoForm() {
  const { todos, editTodo } = useContext(TodoContext); // Asegúrate de tener la función editTodo en tu contexto
  const { id } = useParams(); // Obtener el ID de la URL
  const navigate = useNavigate();

  const todo = todos.find((todo) => todo.id === Number(id)); // Encuentra la tarea por ID
  const [text, setText] = useState(todo ? todo.text : "");

  // Si no encuentra la tarea, redirige a la página principal
  useEffect(() => {
    if (!todo) navigate("/");
  }, [todo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(todo.id, text); // Llama a la función editTodo para actualizar el texto
    navigate("/"); // Redirige de vuelta a la lista principal después de editar
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} // Permite cambiar el valor del input
        placeholder="Editar tarea"
        required
      />
      <button type="submit">Guardar Cambios</button>
    </form>
  );
}

export default EditTodoForm;
