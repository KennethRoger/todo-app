import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoContent from "./TodoContent";

function Content() {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  const [todos, setTodos] = useState(storedTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: newTodo, completed: false },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id != id));
  };

  const deleteCompletedTodo = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const editTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const toggleCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <main className="p-5">
      <TodoInput addTodo={addTodo} />
      <TodoContent
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleCompleted={toggleCompleted}
        deleteCompletedTodo={deleteCompletedTodo}
      />
    </main>
  );
}

export default Content;
