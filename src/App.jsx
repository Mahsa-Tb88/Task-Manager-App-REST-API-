import { useEffect, useState } from "react";
import AddTask from "./Componens/AddTask/AddTask";
import Filter from "./Componens/Filter/Filter";
import Pagination from "./Componens/Pagination/Pagination";
import Tasklist from "./Componens/Tasklist/Tasklist";
import {
  DeleteTask,
  addNewTask,
  editTask,
  getTasks,
} from "./assets/utiles/restApi";
import { useRef } from "react";
export default function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState({ all: 0, filtered: 0 });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });
  const [isEdit, setIsEdit] = useState({ status: false, id: null });
  const [delay, setDelay] = useState(0);

  const perPage = 3;
  const totalPage = Math.ceil(
    (totalTasks.filtered ? totalTasks.filtered : 1) / perPage
  );
  useEffect(() => {
    const timeout = setTimeout(fetchData, delay);
    setDelay(5);
    return () => {
      clearTimeout(timeout);
    };
  }, [page, search, status]);
  async function fetchData() {
    const result = await getTasks(page, perPage, status, search);
    if (result.success) {
      setTasks(result.body);
      setTotalTasks(result.totalTasks);
    } else {
      setIsError({ status: true, msg: result.msg });
    }
  }
  async function addTaskHandler() {
    const lastPage = Math.ceil((totalTasks.all + 1) / perPage);
    if (title.length < 3) {
      setIsError({
        status: true,
        msg: "Title should be greater than 3 charaters",
      });
      return;
    }
    const results = await addNewTask(title, completed);
    if (results.success) {
      setPage(lastPage);
      const results2 = await getTasks(lastPage, perPage, "all", "");
      if (results2.success) {
        setTasks(results2.body);
        setTotalTasks(results2.totalTasks);
        setTitle("");
        setStatus("all");
        setSearch("");
        setCompleted(false);
        setIsError({ ...isError, status: false });
      } else {
        setIsError({ status: true, msg: results2.msg });
      }
    } else {
      setIsError({ status: true, msg: results.msg });
    }
  }
  console.log("appComp", status, isError.status);

  async function handelChangeStatus(newStatus) {
    console.log("change status...");
    setStatus(newStatus);
    setPage(1);

    // const results = await getTasks(1, perPage, newStatus, search);
    // setTasks(results.body);
    // setTotalTasks(results.totalTasks);
  }
  async function serachHandler(newSearch) {
    setSearch(newSearch);
    setPage(1);
    setDelay(2000);
    // const results = await getTasks(1, perPage, status, newSearch);
    // setTasks(results.body);
    // setTotalTasks(results.totalTasks);
  }
  async function handleChangePage(p) {
    setPage(p);
    // const results = await getTasks(p, perPage, status, search);
    // setTasks(results.body);
    // setTotalTasks(results.totalTasks);
  }
  async function handleDelete(id) {
    const results = await DeleteTask(id);
    if (results.success) {
      if (tasks.length == 1) {
        // const results = await getTasks(page - 1, perPage, status, search);
        setPage(page - 1);
        // setTasks(results.body);
        // setTotalTasks(results.totalTasks);
      } else {
        const results = await getTasks(page, perPage, status, search);
        setTasks(results.body);
        setTotalTasks(results.totalTasks);
      }
    } else {
      setIsError({ status: true, msg: results.msg });
    }
  }

  async function handleToggle(id) {
    const findTask = tasks.find((task) => task.id == id);
    const result = await editTask(id, findTask.title, !findTask.completed);
    if (result.success) {
      const result2 = await getTasks(page, perPage, status, search);
      if (result2.success) {
        setTasks(result2.body);
        setTotalTasks(result2.totalTasks);
        setIsError({ ...isError, status: false });
      } else {
        setIsError({ status: true, msg: result2.msg });
      }
    } else {
      setIsError({ status: true, msg: result.msg });
    }
  }
  async function handleEdit(id, editTitle) {
    const selectedTask = tasks.find((task) => task.id == id);
    if (editTitle.length < 3) {
      setIsError({
        status: true,
        msg: "Title should be greater than 3 charaters",
      });
      return;
    }
    const result = await editTask(id, editTitle, selectedTask.completed);
    setIsError({ ...isError, status: false });

    if (result.success) {
      const newTasks = tasks.map((task) => {
        if (task.id == id) {
          return { id, title: editTitle, completed: selectedTask.completed };
        } else {
          return task;
        }
      });
      setTasks(newTasks);
      setIsEdit({ status: false, id: id });
    } else {
      setIsError({ status: true, msg: result.msg });
    }
  }

  return (
    <div className="container">
      <h1 className="text-center my-4">Text Manager App</h1>
      <AddTask
        title={title}
        setTitle={setTitle}
        addTask={addTaskHandler}
        completed={completed}
        setCompleted={setCompleted}
      />
      <Filter
        status={status}
        changeStatus={handelChangeStatus}
        search={search}
        searchTasks={serachHandler}
      />
      {isError.status ? (
        <h2 className="bg-danger text-center py-3 my-5 rounded-1 text-white">
          {isError.msg}
        </h2>
      ) : (
        ""
      )}
      <Tasklist
        tasks={tasks}
        onDelete={handleDelete}
        changeToggle={handleToggle}
        onEdit={handleEdit}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setIsError={setIsError}
        isError={isError}
      />

      <Pagination
        page={page}
        setPage={setPage}
        totalPage={totalPage}
        changePage={handleChangePage}
        totalTasks={totalTasks}
      />
    </div>
  );
}
