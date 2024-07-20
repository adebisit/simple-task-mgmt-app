//importing files...
import api from "./axiosConfig";
import { v4 as uuidv4 } from "uuid";


//GET ENDPOINTS
/**
 * getAllTasks - Asynchronous function that gets all tasks in the db
 * @param {object} queryParams: An object that contains the query parameters to retrieve tasks with
 *                              or defaults to an empty object
 * @returns {Promise<Array>} All tasks created
 */
export const getAllTasks = async (queryParams = {}) => {
  try {
    //Building the queryString...
    const queryString = new URLSearchParams(queryParams).toString();
    const url = queryString ? `/tasks?${queryString}` : "/tasks";
    const res = await api.get(url);
    return res.data;
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
    if (res.status === 500) {
      throw new Error("Server error");
    }
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
 * @param {String} taskId: ID of tasks for which subtasks is to be retrieved
 * @returns {Promise<Array>} An array of subtasks
 */
export const getAllSubTasks = async (taskId) => {
  try {
    const task = await getTask(taskId);
    return task.subtasks;
  } catch (err) {
    console.error("Error getting subtasks: ", err);
    throw err;
  }
};

/**
 * getSubtask - Async function that retrieves a single subtask
 * @param {String} taskId ID of task containing the subtask to be retrieved
 * @param {String} subtaskId ID of subtask to be retrieved from subtasks array
 * @returns {object} subtask to be retrieved
 */
export const getSubtask = async (taskId, subtaskId) => {
  try {
    const task = await getTask(taskId);

    const subtask = task.subtasks.find((st) => st.id === subtaskId);
    if (!subtask) {
      throw new Error("Subtask not found");
    }
    return subtask;
  } catch (err) {
    console.error("Error retrieving subtask: ", err);
    throw err;
  }
};

/**
 * getNotes - Async function that returns notes of a subtask
 * @param {String} taskId ID of task containing notes to be retrieved
 * @returns {Promise<Array>} An array of notes
 */
export const getNotes = async (taskId) => {
  try {
    const task = await getTask(taskId);
    return task.notes;
  } catch (err) {
    console.error("Error retrieving notes: ", err);
    throw err;
  }
};

//CREATE ENDPOINTS
/**
 * createTask - Async function that creates a new task
 * @param {object} taskData: Task to be saved to db
 * @returns {object} The saved task to db
 */
export const createTask = async (taskData) => {
  try {
    //Create new task
    const newTask = {
      ...taskData,
      id: uuidv4(),
      subtasks: [],
      notes: [],
      createdAt: new Date().toISOString(),
    };
    //save data to db
    const res = await api.post("/tasks", newTask);
    return res.data;
  } catch (err) {
    console.error("Error creating task: ", err);
    throw err;
  }
};

/**
 * createSubtask - Async function to create a subtask
 * @param {String} taskId: task in which subtask is to be added
 * @param {object} subtaskData: Subtask to be added to a task
 * @returns an updated task object containing the subtask data
 */
export const createSubtask = async (taskId, subtaskData) => {
  try {
    //get task
    const task = await getTask(taskId);
    //create new subtask
    const newSubtask = { ...subtaskData, id: uuidv4() };
    //add new subtask to task
    task.subtasks.push(newSubtask);
    //indicate the updatedAt time
    task.updatedAt = new Date().toISOString();
    const updatedTask = await api.put(`/tasks/${taskId}`, task);
    return updatedTask.data;
  } catch (err) {
    console.error("Error creating subtask: ", err);
    throw err;
  }
};

/**
 * createNotes - Async function that creates a note for a task
 * @param {String} taskId task in which note is to be saved
 * @param {object} noteData note to be saved for a task
 * @returns an updated task with the note data
 */
export const createNote = async (taskId, noteData) => {
  try {
    //get task
    const task = await getTask(taskId);
    //create new Note
    const newNote = {
      ...noteData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    task.notes.push(newNote);
    //indicate the updatedAt time
    task.updatedAt = new Date().toISOString();
    const updatedTask = await api.put(`/tasks/${taskId}`, task);
    return updatedTask.data;
  } catch (err) {
    console.error("Error creating note: ", err);
    throw err;
  }
};

//UPDATE ENDPOINTS
/**
 * updateTask - updates a task
 * @pString} taskId ID of the task to be updated
 * @param {object} taskData new task to be updated
 * @returns returns the updated Task
 */
export const updateTask = async (taskId, taskData) => {
  try {
    //update the updated At time
    const updatedTaskData = {
      ...taskData,
      updatedAt: new Date().toISOString(),
    };
    //indicate the updatedAt time
    updatedTaskData.updatedAt = new Date().toISOString();
    const updatedTask = await api.patch(`/tasks/${taskId}`, updatedTaskData);
    return updatedTask.data;
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
export const updateSubtask = async (taskId, subtaskId, subtaskData) => {
  try {
    //get task
    const task = await getTask(taskId);
    //get Index of Subtask
    const subtaskIndex = task.subtasks.findIndex((st) => st.id === subtaskId);
    if (subtaskIndex === -1) {
      throw new Error("updateSubtask: Subtask not found");
    }
    //update specific subtask
    task.subtasks[subtaskIndex] = {
      ...task.subtasks[subtaskIndex],
      ...subtaskData,
    };
    //indicate the updatedAt time
    task.updatedAt = new Date().toISOString();
    //patch data and save to db
    const updatedTask = await api.patch(`/tasks/${taskId}`, task);
    return updatedTask.data;
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
 * @param {String} taskId ID of task which contains subtask to be deleted
 * @param {String} subtaskId ID of subtask to be deleted
 * @returns {object} An updated data with subtask deleted
 */
export const deleteSubtask = async (taskId, subtaskId) => {
  try {
    //get task
    const task = await getTask(taskId);

    const subtaskIndex = task.subtasks.findIndex((st) => st.id === subtaskId);
    if (subtaskIndex === -1) {
      throw new Error("deleteSubtask: Subtask not found");
    }
    //remove the subtask at this index
    task.subtasks.splice(subtaskIndex, 1);
    task.updatedAt = new Date().toISOString();
    const updatedTask = await api.patch(`/tasks/${taskId}`, task);
    return updatedTask.data;
  } catch (err) {
    console.error("Error deleting subtask: ", err);
    throw err;
  }
};

/**
 * deleteNote - deletes a note
 * @param {String} taskId ID of task which contains note to be deleted
 * @param {String} noteId ID of note to be deleted
 * @returns {object} An updated data with note deleted
 */
export const deleteNote = async (taskId, noteId) => {
  try {
    //get task
    const task = await getTask(taskId);

    const noteIndex = task.notes.findIndex((note) => note.id === noteId);
    if (noteIndex === -1) {
      throw new Error("deleteNote: Note not found");
    }
    //remove the Note at this index
    task.notes.splice(noteIndex, 1);
    task.updatedAt = new Date().toISOString();
    const updatedTask = await api.patch(`/tasks/${taskId}`, task);
    return updatedTask.data;
  } catch (err) {
    console.error("Error deleting Note: ", err);
    throw err;
  }
};
