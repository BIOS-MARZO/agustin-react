import { useContext, useState, useRef } from "react";
import { TodoContext } from "./TodoContext"; // Asegúrate de ajustar la ruta
import styles from "./Styles/AddTodo.module.css";

function AddTodoForm() {
  const { addTodo } = useContext(TodoContext); // Usar el contexto para obtener addTodo
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null); // Creamos la referencia

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      addTodo(inputValue); // Pasar el texto a la función addTodo
      setInputValue(""); // Limpiar el campo de entrada
      inputRef.current.focus(); // Enfocar el input después de agregar la tarea
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Agregar nueva tarea"
        className={styles.input}
        ref={inputRef} // Asociar la referencia con el input
      />
      <button type="submit" className={styles.button}>
        Agregar
      </button>
    </form>
  );
}

export default AddTodoForm;
