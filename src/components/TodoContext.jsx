import { createContext, useReducer, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// 1. Crear el contexto
export const TodoContext = createContext();

// 2. Definir acciones
const ADD_TODO = "ADD_TODO";
const TOGGLE_COMPLETE = "TOGGLE_COMPLETE";
const DELETE_TODO = "DELETE_TODO";
const SET_TODOS = "SET_TODOS";
const EDIT_TODO = "EDIT_TODO";

// Reducer
function todoReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        { id: action.payload.id, name: action.payload.name, completed: false },
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
    case EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, name: action.payload.name }
          : todo
      );
    default:
      return state;
  }
}

// 4. Crear el proveedor del contexto con useReducer
export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const initialTodos = useRef([]); // Guardamos los datos originales

  // Fetch inicial de todos desde el servidor
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todos");
        dispatch({ type: SET_TODOS, payload: response.data });
        initialTodos.current = response.data; // Guardamos la lista inicial
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (name, description = "", creator = "Unknown") => {
    const newTodo = {
      id: Date.now().toString(),
      name,
      completed: false,
      description,
      creator,
    };
    try {
      await axios.post("http://localhost:3000/todos", newTodo);
      dispatch({ type: ADD_TODO, payload: newTodo });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Función para cambiar el estado de completado
  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, {
        ...todo,
        completed: !todo.completed,
      });
      dispatch({ type: TOGGLE_COMPLETE, payload: id });
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  // Función para eliminar una tarea
  const deleteTodo = async (id) => {
    console.log("Eliminando todo con ID:", id);
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      dispatch({ type: DELETE_TODO, payload: id });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Función para editar una tarea
  const editTodo = async (id, name) => {
    const updatedTodo = { ...todos.find((todo) => todo.id === id), name };
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, updatedTodo);
      dispatch({ type: EDIT_TODO, payload: updatedTodo });
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleComplete,
        deleteTodo,
        editTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

// Valida las props
TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
