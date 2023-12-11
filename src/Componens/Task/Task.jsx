import { useRef } from "react";
import "./Task.scss";
import { useState } from "react";
import { useEffect } from "react";

export default function Task({
  task,
  onDelete,
  changeToggle,
  onEdit,
  isEdit,
  setIsError,
  isError,
  setIsEdit,
}) {
  const [editTitle, setEditTitle] = useState("");

  const taskStatus = [
    "btn text-white mx-2",
    task.completed ? "bg-success" : "bg-secondary",
  ].join(" ");

  const taskToggle = [
    "btn text-white",
    task.completed ? "bg-success" : "bg-secondary",
  ].join(" ");
  const inputRef = useRef(null);

  function onEditHandle(id) {
    setIsError({ ...isError, status: false });
    if (!isEdit.status) {
      setIsEdit({ status: true, id: id });
      setEditTitle(task.title);
    } else {
      

      onEdit(id, editTitle);
    }
    console.log(inputRef);
  }

  return (
    <li className="list-group-item d-flex flex-column flex-md-row task">
      <div>
        {isEdit.status && isEdit.id == task.id ? (
          <span>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              ref={inputRef}
            />
          </span>
        ) : (
          <span className="title-box">{task.title}</span>
        )}
        <span className={taskStatus}>
          {task.completed ? "Completed" : "In Progress"}
        </span>
      </div>
      <div className="actions">
        <button className={taskToggle} onClick={() => changeToggle(task.id)}>
          Toggle
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => onEditHandle(task.id)}
        >
          {isEdit.id == task.id && isEdit.status ? "Save" : "Edit"}
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
