import axios from "axios";
axios.defaults.baseURL = "http://server.test";
async function getTasks(page, perPage, status, search) {
  const { data } = await axios.get("/get-tasks.php", {
    params: {
      page,
      "per-page": perPage,
      status,
      search,
    },
  });
  return data;
}

async function addNewTask(title, completed) {
  const form = new FormData();
  form.append("title", title);
  form.append("completed", completed);
  const { data } = await axios.post("/add-task.php", form);
  return data;
}

async function DeleteTask(id) {
  const form = new FormData();
  form.append("id", id);
  const { data } = await axios.post("/delete-task.php", form);
  return data;
}
async function editTask(id, completed, title) {
  const form = new FormData();
  form.append("id", id);
  form.append("completed", completed);
  form.append("title", title);
  const { data } = await axios.post("/update-task.php", form);
  return data;
}
export { getTasks, addNewTask, DeleteTask,editTask };
