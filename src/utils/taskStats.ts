import type { Task } from "../types/tasks";

function getStartOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}
const today = getStartOfToday();

export function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "done").length;
  const inProgress = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;
  const overdue = tasks.filter(
    (task) => task.status !== "done" && new Date(task.dueDate) < today,
  ).length;

  return { total, completed, inProgress, overdue };
}
