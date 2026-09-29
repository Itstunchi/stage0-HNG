import { loadTasks, saveTasks } from "./storage.js";

let tasks = loadTasks();

export function getTasks() {
  return [...tasks];
}

export function addTask(title, priority = "medium") {
  const task = {
    id: crypto.randomUUID(),
    title: title.trim(),
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks = [task, ...tasks];

  saveTasks(tasks);

  return task;
}

export function updateTask(id, updates) {
  tasks = tasks.map((task) =>
    task.id === id
      ? {
          ...task,
          ...updates,
        }
      : task,
  );

  saveTasks(tasks);
}

export function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id
      ? {
          ...task,
          completed: !task.completed,
        }
      : task,
  );

  saveTasks(tasks);
}

export function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks(tasks);
}

export function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);

  saveTasks(tasks);
}

export function getTaskStats() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const remaining = total - completed;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    remaining,
    percentage,
  };
}
