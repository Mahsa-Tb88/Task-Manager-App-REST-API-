import "./Filter.scss";
export default function Filter({ status, changeStatus, search, searchTasks }) {
  console.log("filterComp", status);
  return (
    <div className="filter flex-column flex-md-row align-items-md-center ">
      <div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="all-tasks"
            checked={status == "all"}
            onChange={() => changeStatus("all")}
          />
          <label className="form-check-label" htmlFor="all-tasks">
            All Tasks
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="completed-task"
            value="completed"
            checked={status == "completed"}
            onChange={() => changeStatus("completed")}
          />
          <label className="form-check-label" htmlFor="completed-task">
            completed
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="in-progress-task"
            value="in-progress"
            checked={status == "in-progress"}
            onChange={() => changeStatus("in-progress")}
          />
          <label className="form-check-label" htmlFor="in-progress-task">
            In progress
          </label>
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="serach..."
          className="form-control"
          onChange={(e) => searchTasks(e.target.value)}
          value={search}
        />
      </div>
    </div>
  );
}
