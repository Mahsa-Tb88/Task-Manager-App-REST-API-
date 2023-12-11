import Task from "../Task/Task";
import "./Tasklist.scss";

export default function Tasklist({
  tasks,
  onDelete,
  changeToggle,
  onEdit,
  isEdit,
  setIsEdit,
  setIsError,
  isError
}) {
  if (!tasks.length) {
    return <h2 className="text-center my-4">There is no Tasks</h2>;
  }
  
  return (
    <div>
      {tasks.map((task) => {
        return (
          <ul className="list-group tasks-list" key={task.id}>
            <Task
              task={task}
              onDelete={onDelete}
              changeToggle={changeToggle}
              onEdit={onEdit}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              setIsError={setIsError}
              isError={isError}
            />
          </ul>
        );
      })}
    </div>
  );
}
