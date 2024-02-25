import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState, useEffect } from "react";

function EditTodo({ todo }) {
  useEffect(() => {
    // Initialize the modal
    const myModal = new window.bootstrap.Modal(
      document.getElementById(`id${todo.todo_id}`)
    );
  }, []);

  const [description, setDescription] = useState(todo.description);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal" // Use data-bs-toggle for Bootstrap 5
        data-bs-target={`#id${todo.todo_id}`} // Use data-bs-target for Bootstrap 5
      >
        Edit
      </button>

      <div
        className="modal"
        id={`id${todo.todo_id}`}
        onClick={() => {
          setDescription(todo.description);
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setDescription(todo.description);
                }}
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal" // Use data-bs-dismiss for Bootstrap 5
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal" // Use data-bs-dismiss for Bootstrap 5
                onClick={() => {
                  setDescription(todo.description);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTodo;
