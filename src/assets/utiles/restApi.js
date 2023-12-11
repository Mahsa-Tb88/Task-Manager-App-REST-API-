import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.timeout = 1000;
async function getTasks(page, perPage, status, search) {
  try {
    const { data } = await axios.get("/tasks", {
      params: {
        page,
        limit: perPage,
        status,
        search,
      },
    });
    return data;
  } catch (e) {
    return { success: false, msg: "Connection Error" };
  }

  return data;
}

async function addNewTask(title, completed) {
  try {
    const { data } = await axios.post("/tasks", { title, completed });
    return data;
  } catch (e) {
    if (e.response) {
      return { success: false, msg: e.response.data.message };
    } else {
      return { success: false, msg: "Connection Error" };
    }
  }
}

async function DeleteTask(id) {
  try {
    const { data } = await axios.delete("/tasks/" + id);
    return data;
  } catch (e) {
    return { success: false, msg: "Connection Error" };
  }
}
async function editTask(id, title, completed) {
  try {
    const { data } = await axios.put("/tasks/" + id, { title, completed });
    return data;
  } catch (e) {
    if (e.response) {
      return { success: false, msg: e.response.data.message };
    } else {
      return { success: false, msg: "Connection Error" };
    }
  }
}
export { getTasks, addNewTask, DeleteTask, editTask };
