import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

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
    <section className="contentSection d-flex gap-5 justify-content-between pt-5 ">
      <div className="todoContent h-100 w-75">
        <div className="">
          <ul className="todo p-0 w-100">
            {getFilteredTodos().length == 0 ? (
              <p className="soEmpty align-self-center justify-self-center">
                Looks empty...
              </p>
            ) : (
              <>
                <p>Click to mark completed todo</p>
                {getFilteredTodos() .map((todo) => (
                <li
                  onClick={() => toggleCompleted(todo.id)}
                  className={`todoBox m-0 shadow rounded-3 ${
                    todo.completed
                      ? "todoBoxCompleted text-muted"
                      : "todoBoxNonComplete"
                  }`}
                  key={todo.id}
                >
                  <p className="task border p-3">
                    {todo.completed ? <s>{todo.text}</s> : todo.text}
                  </p>
                  <div className="settings ps-3">
                    <div className="settingButton p-0">
                      <button
                        className="btn btn-primary"
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
                        className="btn btn-danger me-3"
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
                            className="inputBox"
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
                            data-bs-dismiss="modal"
                            className="btn btn-success"
                            onClick={handleSaveEdit}
                          >
                            Set
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                )) .reverse()}
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="settingControls d-flex flex-column justify-content-between">
        <ButtonGroup vertical className="filterSection d-flex flex-column g-2">
          <Button
            className=""
            variant="outline-primary"
            name="mix"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            className=""
            variant="outline-primary"
            name="mix"
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
          <Button
            className=""
            variant="outline-primary"
            name="mix"
            onClick={() => setFilter("pending")}
          >
            Pending
          </Button>
        </ButtonGroup>
        <div>
          <button
            className="btn btn-danger w-100"
            onClick={() => deleteCompletedTodo()}
          >
            Delete Completed
          </button>
        </div>
      </div>
    </section>
  );
}

export default TodoContent;
