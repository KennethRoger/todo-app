import { useRef, useState } from "react";

function TodoInput({ addTodo }) {
  const [todo, setTodo] = useState("");
  const input = useRef()

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (todo.trim() != '') {
      addTodo(todo);
    }
    else if (todo.length) {
      input.current.focus()
    }
    setTodo('');
  };

  return (
    <section className="todoInput">
      <input ref={input} type="text" placeholder="add your todo" value={todo} onChange={handleInputChange}/>
      <button onClick={handleAddTodo}>Add</button>
    </section>
  );
}

export default TodoInput;
