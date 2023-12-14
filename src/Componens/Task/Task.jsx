import { useEffect, useRef } from "react";
import "./task.scss";
import { useState } from "react";

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
  const [idEdit, setIdEdit] = useState(null);

  const taskStatus = [
    "btn text-white mx-2",
    task.completed ? "bg-success" : "bg-secondary",
  ].join(" ");

  const taskToggle = [
    "btn text-white ",
    task.completed ? "bg-success" : "bg-secondary",
  ].join(" ");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEdit.status && isEdit.id == idEdit) {
      inputRef.current.focus();
      console.log(inputRef.current);
    }
  }, [isEdit]);
  function onEditHandle(id) {
    setIsError({ ...isError, status: false });
    if (!isEdit.status) {
      setIsEdit({ status: true, id: id });
      setEditTitle(task.title);
    } else if (isEdit.status && isEdit.id == id) {
      onEdit(id, editTitle);
    } else {
      setIsEdit({ status: true, id: id });
      setEditTitle(task.title);
    }
    setIdEdit(id);
  }

  return (
    <li className="list-group-item d-flex flex-column flex-md-row task">
      <div className="mb-3 mb-md-0">
        {isEdit.status && isEdit.id == task.id ? (
          <span>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              ref={inputRef}
            />
          </span>
        ) : (
          <span className="title-box">
            {task.title.length < 16
              ? task.title
              : task.title.slice(0, 12) + "..."}
          </span>
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
