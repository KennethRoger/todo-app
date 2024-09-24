import { useState } from "react";

function TodoContent({ todos, deleteTodo, deleteCompletedTodo, editTodo, toggleCompleted }) {
  const [filter, setFilter] = useState("all");

  const getFilteredTodos = () => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    } else if (filter === "pending") {
      return todos.filter((todo) => !todo.completed);
    } else {
      return todos;
    }
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
                  <div
                    onDoubleClick={() => toggleCompleted(todo.id)}
                    className="todoBox"
                  >
                    <li className="task border ps-3 pt-2" key={todo.id}>
                      {todo.completed ? <s>{todo.text}</s> : todo.text}
                    </li>
                    <div className="settings">
                      <div className="settingButton">
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => {
                            editTodo(todo.id);
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
                      class="modal fade"
                      id="editModal"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-body">
                            <input type="text" placeholder="add your todo" />
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button type="button" class="btn btn-primary">
                              Set
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                .reverse()
            )}
          </ul>
        </div>
      </div>
      <div className="filter-section d-flex flex-column w-25">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>
      <div >
        <button onClick={() => deleteCompletedTodo()}>Delete Completed</button>
      </div>
    </section>
  );
}

export default TodoContent;
