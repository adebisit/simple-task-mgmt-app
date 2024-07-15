//importing files...
import api from "./axiosConfig";

//UTILITY FUNCTION
/**
 * getNextTaskId - Asynchronous function that determines the ID of the next task
 * @param {String} endpoint: the respective endpoint to get the task array from
 * @returns {Number} returns the ID that should be used for the next task to be created
 */
const getNextTaskId = async (endpoint) => {
  try {
    const res = await api.get(endpoint);
    const items = res.data;
    const validIds = items.map((item) => Number(item.id));
    const maxId = validIds.length > 0 ? Math.max(...validIds) : 0;
    return maxId + 1;
  } catch (err) {
    console.error("Error setting next ID for item:", err);
    throw err;
  }
};

/**
 * getNextSubtaskOrNoteId - Asynchronous function that determines the ID of the next subtask or note
 * @param {Array} items: Array of subtasks or notes
 * @returns {Number} returns the ID that should be used for the next subtask or note to be created
 */
const getNextSubtaskOrNoteId = async (items) => {
  try {
    const maxId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) : 0;
    return maxId + 1;
  } catch (err) {
    console.error("Error setting next ID for item:", err);
    throw err;
  }
};

/**
 * removeID - removes any ID passed with the task or subtask object
 * @param {object} data: task or subtask to strip ID off
 * @returns {object} returns a task or subtask without the ID
 */
const removeId = (data) => {
  const { id, ...rest } = data;

  return rest;
};

//GET ENDPOINTS
/**
 * getAllTasks - Asynchronous function that gets all tasks in the db
 * @returns {Promise<Array>} All tasks created
 */
export const getAllTasks = async () => {
  try {
    const res = await api.get("/tasks");
    return res.data;
  } catch (err) {
    console.error("Error retrieving tasks:", err);
    throw err;
  }
};

/**
 * getTask - Asynchronous function that gets a single task by ID
 * @param {Number} taskId: ID of task to retrieve
 * @returns {object} The task object received or throws error
 */
export const getTask = async (taskId) => {
  try {
    const res = await api.get(`/tasks/${taskId}`);
    return res.data;
  } catch (err) {
    console.error("Error retrieving task: ", err);
    throw err;
  }
};

/**
 * getAllSubtasks - Async function that retrieves all the subtasks for a task
 * @param {String} taskId: ID of tasks for which subtasks is to be retrieved
 * @returns {Promise<Array>} An array of tasks
 */
export const getAllSubTasks = async (taskId) => {
  try {
    const res = await api.get(`/tasks/${taskId}`);
    return res.data.subtasks;
  } catch (err) {
    console.error("Error getting subtasks: ", err);
    throw err;
  }
};

/**
 * getSubtask - Async function that retrieves a single subtask
 * @param {Number} taskId ID of task containing the subtask to be retrieved
 * @param {Number} subtaskId ID of subtask to be retrieved from subtasks array
 * @returns {object} subtask to be retrieved
 */
export const getSubtask = async (taskId, subtaskId) => {
  try {
    const res = await api.get(`/tasks/${taskId}`);
    const task = res.data;
   //if task doesn't exist
    if (!task || !task.subtasks) {
      throw new Error("Subtask not found");
    }

    const subtask = task.subtasks.find((st) => st.id === subtaskId);
    return subtask;
  } catch (err) {
    console.error("Error retrieving subtask: ", err);
    throw err;
  }
};

/**
 * getNotes - Async function that returns notes of a subtask
 * @param {Number} taskId ID of task containing notes to be retrieved
 * @returns {Promise<Array>} An array of notes
 */
export const getNotes = async (taskId) => {
  try {
    const res = await api.get(`/tasks/${taskId}`);
    return res.data.notes;
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
    //remove any existing ID on taskData
    const newTaskData = removeId(taskData);
    //get ID for newTaskID
    const newTaskId = await getNextTaskId("/tasks");
    //add ID to task
    const newTask = {
      ...newTaskData,
      id: newTaskId.toString(),
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
 * @param {Number} taskId: task in which subtask is to be added
 * @param {object} subtaskData: Subtask to be added to a task
 * @returns an updated task object containing the subtask data
 */
export const createSubtask = async (taskId, subtaskData) => {
  try {
    //get task
    const res = await api.get(`/tasks/${taskId}`);
    const task = res.data;
    if (!task) {
      throw new Error("CreateSubtask: Task not found");
    }
    //remove ID of subtask
    const newSubtaskData = removeId(subtaskData);
    //getNextTaskId
    const newSubtaskId = await getNextSubtaskOrNoteId(task.subtasks);
    //create new subtask
    const newSubtask = { ...newSubtaskData, id: newSubtaskId };
    //add new subtask to task
    task.subtasks.push(newSubtask);
    const updatedTask = await api.put(`/tasks/${taskId}`, task);
    return updatedTask.data;
  } catch (err) {
    console.error("Error creating subtask: ", err);
    throw err;
  }
};

/**
 * createNotes - Async function that creates a note for a task
 * @param {Number} taskId task in which note is to be saved
 * @param {object} noteData note to be saved for a task
 * @returns an updated task with the note data
 */
export const createNote = async (taskId, noteData) => {
  try {
    const res = await api.get(`/tasks/${taskId}`);
    const task = res.data;
    if (!task) {
      throw new Error("CreateNote: Task not found");
    }

    const newNoteId = await getNextSubtaskOrNoteId(task.notes);
    const noteDataWithId = { ...noteData, id: newNoteId.toString(), createdAt: new Date().toISOString() };
    task.notes.push(noteDataWithId);
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
 * @param {Number} taskId ID of the task to be updated
 * @param {object} taskData new task to be updated
 * @returns returns the updated Task
 */
export const updateTask = async (taskId, taskData) => {
  try {
    //remove ID from taskData
    const taskDataWithoutId = removeId(taskData);

    //update the updated At time
    const updatedTaskData = {...taskDataWithoutId, updatedAt: new Date().toISOString()};
    const updatedTask = await api.patch(`/tasks/${taskId}`, updatedTaskData);
    return updatedTask.data;
  } catch (err) {
    console.error("Error updating task:", err);
    throw err;
  }
};

/**
 * updateSubtask - updates a subtask
 * @param {Number} taskId Id of task of which subtask is to be updated
 * @param {Number} subtaskId Id of subtask to be updated
 * @param {object} subtaskData subtask update data
 * @returns returns the task with updated subtask
 */
export const updateSubtask = async (taskId, subtaskId, subtaskData) => {
  try {
    //get task
    const res = await api.get(`/tasks/${taskId}`);
    const task = res.data;
    if (!task) {
      throw new Error("updateSubtask: Task not found");
    }

    //get Index of Subtask
    const subtaskIndex = task.subtasks.findIndex((st) => st.id === subtaskId);
    if (subtaskIndex === -1) {
      throw new Error("updateSubtask: Subtask not found");
    }

    //strip the id off subtask data if present
    const subtaskDataWithoutId = removeId(subtaskData);

    //update specific subtask
    task.subtasks[subtaskIndex] = {...task.subtasks[subtaskIndex], ...subtaskDataWithoutId};

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
 * @param {Number} taskId ID of the task to be deleted
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
 * @param {Number} taskId ID of task which contains subtask to be deleted
 * @param {Number} subtaskId ID of subtask to be deleted
 * @returns {object} An updated data with subtask deleted
 */
export const deleteSubtask = async (taskId, subtaskId) => {
  try {
    //get Task
    const res = await api.get(`/tasks/${taskId}`);
    const task = res.data;

    if (!task) {
      throw new Error("deleteSubtask: Task not found");
    }
    const subtaskIndex = task.subtasks.findIndex((st) => st.id === subtaskId);
    if (subtaskIndex === -1) {
      throw new Error("deleteSubtask: Subtask not found");
    }
    //remove the subtask at this index
    task.subtasks.splice(subtaskIndex, 1);
    const updatedTask = await api.patch(`/tasks/${taskId}`, task);
    return updatedTask.data;
  } catch (err) {
    console.error("Error deleting subtask: ", err);
    throw err;
  }
};

// /**
//  * deleteNote - deletes a note
//  * @param {Number} taskId ID of task which contains note to be deleted
//  * @param {Number} noteId ID of note to be deleted
//  * @returns {object} An updated data with note deleted
//  */

// export const deleteNote = async (taskId, noteId) => {
//     try {
//       //get Task
//       const res = await api.get(`/tasks/${taskId}`);
//       const task = res.data;

//       if (!task) {
//         throw new Error("deleteNote: Task not found");
//       }
//       const noteIndex = task.Notes.findIndex((note) => note.id === noteId);
//       if (noteIndex === -1) {
//         throw new Error("deleteNote: Note not found");
//       }
//       //remove the Note at this index
//       task.Notes.splice(noteIndex, 1);
//       const updatedTask = await api.patch(`/tasks/${taskId}`, task);
//       return updatedTask.data;
//     } catch (err) {
//       console.error("Error deleting Note: ", err);
//       throw err;
//     }
//   };
