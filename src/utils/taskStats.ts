import type { Task } from "../types/tasks";

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "done").length;
  const inProgress = tasks.filter((task) => task.status === "in-progress").length;
  const today = getLocalDateString();
  const overdue = tasks.filter((task) => Boolean(task.dueDate) && task.status !== "done" && task.dueDate < today).length;

  return { total, completed, inProgress, overdue };
}
