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
    <section className="todoInput d-flex border-bottom pb-5">
      <input className="inputBox w-75 me-2" ref={input} type="text" placeholder="add your todo" value={todo} onChange={handleInputChange}/>
      <button className="addButton btn btn-primary" onClick={handleAddTodo}>Add</button>
    </section>
  );
}

export default TodoInput;
