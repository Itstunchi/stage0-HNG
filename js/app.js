import {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
  clearCompletedTasks,
} from "./state.js";

import { refreshUI } from "./ui.js";

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority-input");

const taskList = document.querySelector("#task-list");

const searchInput = document.querySelector("#search-input");

const filterButtons = document.querySelectorAll(".filter-button");

const clearCompletedButton = document.querySelector("#clear-completed");

let activeFilter = "all";
let searchTerm = "";

function getVisibleTasks() {
  const tasks = getTasks();

  return tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "active" && !task.completed) ||
      (activeFilter === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });
}

function render() {
  refreshUI(getVisibleTasks());
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskInput.value.trim();
  const priority = priorityInput.value;

  if (!title) {
    taskInput.focus();
    return;
  }

  addTask(title, priority);

  taskForm.reset();
  priorityInput.value = "medium";

  taskInput.focus();

  render();
});

taskList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  const taskItem = button.closest(".task-item");

  if (!taskItem) {
    return;
  }

  const taskId = taskItem.dataset.taskId;
  const action = button.dataset.action;

  if (action === "toggle") {
    toggleTask(taskId);
  }

  if (action === "delete") {
    deleteTask(taskId);
  }

  render();
});

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value.trim();

  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      filterButton.classList.toggle("active", filterButton === button);
    });

    render();
  });
});

clearCompletedButton.addEventListener("click", () => {
  clearCompletedTasks();

  render();
});

render();
