//importing node modules...
import { v4 as uuidv4 } from "uuid";

//importing files...
import api from "./axiosConfig";
import {
  extractFilters,
  applyFilters,
  handleServerError,
} from "./UtilityFunctions";

//GET ENDPOINTS
/**
 * getTasks - Asynchronous function that gets all tasks in the db
 * @param {object} queryParams: An object that contains the query parameters to retrieve tasks with
 *                              or defaults to an empty object
 * @returns {Promise<Array>} All tasks created
 */
export const getTasks = async (queryParams = {}) => {
  try {
    const { likeFilters, dateFilters, remainingParams } =
      extractFilters(queryParams);

    //Building the queryString...
    const queryString = new URLSearchParams(remainingParams).toString();
    const url = queryString ? `/tasks?${queryString}` : "/tasks";

    //fetch data from db
    const res = await api.get(url);
    handleServerError(res);
    //filter data
    const data = applyFilters(res.data, likeFilters, dateFilters);
    return data;
  } catch (err) {
    console.error("Error retrieving tasks:", err);
    throw err;
  }
};

/**
 * getTask - Asynchronous function that gets a single task by ID
 * @param {String} taskId: ID of task to retrieve
 * @returns {object} The task object received or throws error
 */
export const getTask = async (taskId) => {
  try {
    const res = await api.get(`/tasks/${taskId}`);
    //check status of response
    handleServerError(res);
    //retrieve task from response
    const task = res.data;
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (err) {
    console.error("Error retrieving task: ", err);
    throw err;
  }
};

/**
 * getAllSubtasks - Async function that retrieves all the subtasks for a task
 * @param {Object} queryParams: Params to filter subtasks being retrieved
 * @returns {Array} An array of subtasks
 */
export const getSubTasks = async (queryParams = {}) => {
  try {
    const { likeFilters, dateFilters, remainingParams } =
      extractFilters(queryParams);

    //Building the queryString...
    const queryString = new URLSearchParams(remainingParams).toString();
    const url = queryString ? `/subtasks?${queryString}` : "/subtasks";

    //fetch data from db
    const res = await api.get(url);

    //check server error
    handleServerError(res);
    //filter data
    const data = applyFilters(res.data, likeFilters, dateFilters);
    return data;
  } catch (err) {
    console.error("Error retrieving subtasks: ", err);
    throw err;
  }
};

/**
 * getNotes - Async function that returns notes of a subtask
 * @param {Object} queryParams: Params to filter notes being retrieved
 * @returns {Array} An array of notes
 */
export const getNotes = async (queryParams = {}) => {
  try {
    const { likeFilters, dateFilters, remainingParams } =
      extractFilters(queryParams);

    //Building the queryString...
    const queryString = new URLSearchParams(remainingParams).toString();
    const url = queryString ? `/notes?${queryString}` : "/notes";

    //fetch data from db
    const res = await api.get(url);

    //check server error
    handleServerError(res);
    //filter data
    const data = applyFilters(res.data, likeFilters, dateFilters);
    return data;
  } catch (err) {
    console.error("Error retrieving notes: ", err);
    throw err;
  }
};

//CREATE ENDPOINTS
/**
 * createTask - Async function that creates a new task
 * @param {object} taskData: Task to be saved to db
 * @returns {object} The created task
 */
export const createTask = async (taskData) => {
  try {
    //Create new task
    const newTask = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    //save data to db
    const res = await api.post("/tasks", newTask);
    //Check for server error
    handleServerError(res);
    return res.data;
  } catch (err) {
    console.error("Error creating task: ", err);
    throw err;
  }
};

/**
 * createSubtask - Async function to create a subtask
 * @param {object} subtaskData: Subtask to be added to a task
 * @returns {object} The created subtask
 */
export const createSubtask = async (subtaskData) => {
  try {
    //create new subtask
    const newSubtask = { ...subtaskData, id: uuidv4() };
    const res = await api.post(`/subtasks`, newSubtask);
    //check for server error
    handleServerError(res);
    return res.data;
  } catch (err) {
    console.error("Error creating subtask: ", err);
    throw err;
  }
};

/**
 * createNotes - Async function that creates a note for a task
 * @param {object} noteData note to be saved for a task
 * @returns {object} The created note
 */
export const createNote = async (noteData) => {
  try {
    //Add id and createdAt timestamp to note
    const newNote = {
      ...noteData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    //save res to DB
    const res = await api.post("/notes", newNote);
    //check for server error
    handleServerError(res);
    return res.data;
  } catch (err) {
    console.error("Error creating note: ", err);
    throw err;
  }
};

//UPDATE ENDPOINTS
/**
 * updateTask - updates a task
 * @param {String} taskId ID of the task to be updated
 * @param {object} taskData updated task
 * @returns returns the updated Task
 */
export const updateTask = async (taskId, taskData) => {
  try {
    //update the updated At time
    const updatedTaskData = {
      ...taskData,
      updatedAt: new Date().toISOString(),
    };
    const res = await api.patch(`/tasks/${taskId}`, updatedTaskData);
    //check for server error
    handleServerError(res);
    return res.data;
  } catch (err) {
    console.error("Error updating task:", err);
    throw err;
  }
};

/**
 * updateSubtask - updates a subtask
 * @param {String} taskId Id of task of which subtask is to be updated
 * @param {String} subtaskId Id of subtask to be updated
 * @param {object} subtaskData subtask update data
 * @returns returns the task with updated subtask
 */
export const updateSubtask = async (subtaskId, subtaskData) => {
  try {
    //update the updated At time
    const updatedSubtaskData = {
      ...subtaskData,
      updatedAt: new Date().toISOString(),
    };
    const res = await api.patch(`/subtasks/${subtaskId}`, updatedSubtaskData);
    //check for server error
    handleServerError(res);
    return res.data;
  } catch (err) {
    console.error("Error updating subtask:", err);
    throw err;
  }
};

//DELETE ENDPOINTS
/**
 * deleteTask - deletes a task
 * @param {String} taskId ID of the task to be deleted
 * @returns {object} returns a success status and message
 */
export const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}`);
    return {
      status: "success",
      message: "Task deleted successfully",
    };
  } catch (err) {
    console.error("Error deleting task: ", err);
    throw err;
  }
};

/**
 * deleteSubtask - deletes a subtask
 * @param {String} subtaskId ID of subtask to be deleted
 * @returns {object} success status
 */
export const deleteSubtask = async (subtaskId) => {
  try {
    await api.delete(`/subtasks/${subtaskId}`);
    return {
      status: "success",
      message: "Subtask deleted successfully",
    };
  } catch (err) {
    console.error("Error deleting subtask: ", err);
    throw err;
  }
};

/**
 * deleteNote - deletes a note
 * @param {String} noteId ID of note to be deleted
 * @returns {object} success status
 */
export const deleteNote = async (noteId) => {
  try {
    await api.delete(`/notes/${noteId}`);
    return {
      status: "success",
      message: "Notes deleted successfully",
    };
  } catch (err) {
    console.error("Error deleting notes: ", err);
    throw err;
  }
};
