import { useState } from "react";

function TodoContent({
  todos,
  deleteTodo,
  deleteCompletedTodo,
  editTodo,
  toggleCompleted,
}) {
  const [filter, setFilter] = useState("all");
  const [editingTodo, setEditingTodo] = useState(null);
  const [newText, setNewText] = useState("");

  const getFilteredTodos = () => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    } else if (filter === "pending") {
      return todos.filter((todo) => !todo.completed);
    } else {
      return todos;
    }
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setNewText(todo.text);
  };

  const handleSaveEdit = () => {
    editTodo(editingTodo.id, newText);
    setEditingTodo(null);
    setNewText("");
  };
  return (
    <section className="d-flex gap-5 justify-content-between pt-5">
      <div className="todoContent h-100 w-75">
        <div className="todo">
          <ul className="p-0">
            {getFilteredTodos().length == 0 ? (
              <p>Empty :(</p>
            ) : (
              getFilteredTodos()
                .map((todo) => (
                  <li
                    onClick={() => toggleCompleted(todo.id)}
                    className="todoBox"
                    key={todo.id}
                  >
                    <p className="task border p-3">
                      {todo.completed ? <s>{todo.text}</s> : todo.text}
                    </p>
                    <div className="settings">
                      <div className="settingButton">
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => {
                            handleEditClick(todo);
                          }}
                        >
                          edit
                        </button>
                        <button
                          onClick={() => {
                            deleteTodo(todo.id);
                          }}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="editModal"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            <input
                              type="text"
                              value={newText}
                              onChange={(e) => setNewText(e.target.value)}
                              placeholder="edit your todo"
                            />
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                              onClick={() => setEditingTodo(null)}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="btn btn-light"
                              onClick={handleSaveEdit}
                            >
                              Set
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
                .reverse()
            )}
          </ul>
        </div>
      </div>
      <div className="filter-section d-flex flex-column g-2 w-25">
        <button type="radio" className="btn border" checked onClick={() => setFilter("all")}>All</button>
        <button type="radio" className="btn border" onClick={() => setFilter("completed")}>Completed</button>
        <button type="radio" className="btn border" onClick={() => setFilter("pending")}>Pending</button>
      </div>
      <div>
        <button onClick={() => deleteCompletedTodo()}>Delete Completed</button>
      </div>
    </section>
  );
}

export default TodoContent;
