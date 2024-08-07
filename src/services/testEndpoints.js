// Importing files...
import {
  getTasks,
  getTask,
  getSubTasks,
  getNotes,
  createTask,
  createSubtask,
  createNote,
  deleteNote,
  deleteTask,
  deleteSubtask,
  updateTask,
  updateSubtask,
} from "./taskService";
import { getSubtask } from "./UtilityFunctions";

// Utility function to generate a random priority between 1 and 5
const getRandomPriority = () => Math.floor(Math.random() * 5) + 1;

export const testEndpoints = async () => {
  try {
    // Test creating a new task
    const newTask = {
      name: "New Task",
      description: "This is a new task",
      priority: getRandomPriority(),
    };
    const createdTask = await createTask(newTask);
    console.log("Created Task:", createdTask);

    // Test getting all tasks
    const tasks = await getTasks();
    console.log("All Tasks:", tasks);

    // Test getting tasks with parameters
    const tasksWithParams = await getTasks({
      priority: 5,
      name_like: "new",
      _embed: "notes",
    });
    console.log("Filtered Tasks:", tasksWithParams);

    // Test getting a single task by ID
    const taskId = createdTask.id;
    const task = await getTask(taskId);
    console.log("Single Task:", task);

    // Test updating a task
    const updatedTaskData = {
      name: "Updated Task",
      description: "This is an updated task",
    };
    const updatedTask = await updateTask(taskId, updatedTaskData);
    console.log("Updated Task:", updatedTask);

    // Test creating a new subtask
    const newSubtask = {
      name: "New Subtask",
      description: "This is a new subtask",
      priority: getRandomPriority(),
      taskId: createdTask.id,
    };
    const createdSubtask = await createSubtask(newSubtask);
    console.log("Created Subtask:", createdSubtask);

    // Test getting all subtasks
    const subtasks = await getSubTasks();
    console.log("All Subtasks:", subtasks);

    // Test getting subtasks with parameters
    const subtasksWithParams = await getSubTasks({ taskId });
    console.log("Filtered Subtasks:", subtasksWithParams);

    // Test getting a single subtask by ID
    const subtaskId = createdSubtask.id;
    const subtask = await getSubtask(subtaskId);
    console.log("Single Subtask:", subtask);

    // Test updating a subtask
    const updatedSubtaskData = {
      name: "Updated Subtask",
      description: "This is an updated subtask",
    };
    const updatedSubtask = await updateSubtask(subtaskId, updatedSubtaskData);
    console.log("Updated Subtask:", updatedSubtask);

    // Test creating a new note
    const newNote = {
      note: "This is a new note",
      taskId: createdTask.id,
    };
    const createdNote = await createNote(newNote);
    console.log("Created Note:", createdNote);

    // Test getting all notes
    const notes = await getNotes();
    console.log("All Notes:", notes);

    // Test getting notes with parameters
    const notesWithParams = await getNotes({ taskId });
    console.log("Filtered Notes:", notesWithParams);

    // Test deleting a subtask
    const updatedTaskAfterSubtaskDeletion = await deleteSubtask(subtaskId);
    console.log(
      "Subtask Deletion Response:",
      updatedTaskAfterSubtaskDeletion
    );

    // Test deleting a note
    const noteId = createdNote.id;
    const updatedTaskAfterNoteDeletion = await deleteNote(noteId);
    console.log("Note Deletion Response:", updatedTaskAfterNoteDeletion);

    // Test deleting a task
    const deleteResponse = await deleteTask(taskId);
    console.log("Delete Task Response:", deleteResponse);
  } catch (error) {
    console.error("Error testing endpoints:", error);
  }
};
