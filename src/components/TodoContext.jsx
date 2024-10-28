import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";

// 1. Crear el contexto
export const TodoContext = createContext();

// 2. Definir acciones
const ADD_TODO = "ADD_TODO";
const TOGGLE_COMPLETE = "TOGGLE_COMPLETE";
const DELETE_TODO = "DELETE_TODO";
const SET_TODOS = "SET_TODOS";
const EDIT_TODO = "EDIT_TODO"; // Nueva acción para editar

// Reducer
function todoReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case TOGGLE_COMPLETE:
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case SET_TODOS:
      return action.payload;
    case EDIT_TODO: // Maneja la acción EDIT_TODO
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    default:
      return state;
  }
}

// 4. Crear el proveedor del contexto con useReducer
export function TodoProvider({ children }) {
  // Inicializar `todos` con el contenido de localStorage
  const initialTodos = () => JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, dispatch] = useReducer(todoReducer, [], initialTodos);

  // Guardar los todos en localStorage cada vez que cambien
  useEffect(() => {
    console.log("Guardando todos en localStorage:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Funciones de acción
  function addTodo(text) {
    dispatch({ type: ADD_TODO, payload: text });
  }

  function toggleComplete(id) {
    dispatch({ type: TOGGLE_COMPLETE, payload: id });
  }

  function deleteTodo(id) {
    dispatch({ type: DELETE_TODO, payload: id });
  }

  function editTodo(id, text) {
    // Nueva función editTodo
    dispatch({ type: EDIT_TODO, payload: { id, text } });
  }

  const value = { todos, addTodo, toggleComplete, deleteTodo, editTodo };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

// Valida las props
TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
