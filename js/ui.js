import { getTasks, getTaskStats } from "./state.js";

const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");

const totalCount = document.querySelector("#total-count");
const completedCount = document.querySelector("#completed-count");
const remainingCount = document.querySelector("#remaining-count");

const progressPercentage = document.querySelector("#progress-percentage");

const progressFill = document.querySelector("#progress-fill");
const progressBar = document.querySelector("#progress-bar");

function escapeHTML(value) {
  const element = document.createElement("div");
  element.textContent = value;

  return element.innerHTML;
}

function getPriorityLabel(priority) {
  const labels = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  return labels[priority] ?? "Medium";
}

function createTaskElement(task) {
  const article = document.createElement("article");

  article.className = `task-item ${task.completed ? "completed" : ""}`;

  article.dataset.taskId = task.id;

  article.innerHTML = `
    <button
      class="task-checkbox"
      type="button"
      aria-label="${
        task.completed ? "Mark task as incomplete" : "Mark task as complete"
      }"
      data-action="toggle"
    >
      ${task.completed ? "✓" : ""}
    </button>

    <div class="task-content">
      <p class="task-title">
        ${escapeHTML(task.title)}
      </p>

      <div class="task-meta">
        <span class="priority priority-${task.priority}">
          ${getPriorityLabel(task.priority)}
        </span>
      </div>
    </div>

    <button
      class="delete-button"
      type="button"
      aria-label="Delete ${escapeHTML(task.title)}"
      data-action="delete"
    >
      ×
    </button>
  `;

  return article;
}

export function renderTasks(tasks) {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  const fragment = document.createDocumentFragment();

  tasks.forEach((task) => {
    fragment.appendChild(createTaskElement(task));
  });

  taskList.appendChild(fragment);
}

export function updateStats() {
  const stats = getTaskStats();

  totalCount.textContent = stats.total;
  completedCount.textContent = stats.completed;
  remainingCount.textContent = stats.remaining;

  progressPercentage.textContent = `${stats.percentage}%`;

  progressFill.style.width = `${stats.percentage}%`;

  progressBar.setAttribute("aria-valuenow", String(stats.percentage));
}

export function refreshUI(tasks = getTasks()) {
  renderTasks(tasks);
  updateStats();
}
