import { useRef, useState } from "react";
import "./AddTask.scss";
export default function AddTask({ addTask }) {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const inpuRef = useRef(null);

  function submitForm(e) {
    e.preventDefault();
    addTask(title, completed);
    setTitle("");
    setCompleted(false);
    inpuRef.current.focus();
    console.log(inpuRef);
  }
  return (
    <div>
      <form className="add-task-form" onSubmit={submitForm}>
        <div className="input-group input-group-lg">
          <input
            type="text"
            placeholder="Add a New Task..."
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={inpuRef}
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
        <div className="mt-2 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="completed-check"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          <label className="form-check-label" htmlFor="completed-check">
            Is Completed?
          </label>
        </div>
      </form>
    </div>
  );
}
