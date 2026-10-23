import type { Task, TaskPriority, TaskStatus } from "../types/tasks";

type StatusFilter = TaskStatus | "all";
type PriorityFilter = TaskPriority | "all";

export const statusFilterOptions: {
  id: number;
  value: StatusFilter;
  label: string;
}[] = [
  { id: 1, value: "all", label: "All Statuses" },
  { id: 2, value: "todo", label: "Todo" },
  { id: 3, value: "in-progress", label: "In Progress" },
  { id: 4, value: "done", label: "Done" },
];

export const priorityFilterOptions: {
  id: number;
  value: PriorityFilter;
  label: string;
}[] = [
  { id: 1, value: "all", label: "All Priorities" },
  { id: 2, value: "high", label: "High" },
  { id: 3, value: "medium", label: "Medium" },
  { id: 4, value: "low", label: "Low" },
];

export function filterTasks(
  tasks: Task[],
  searchTask: string,
  status: StatusFilter,
  priority: PriorityFilter,
): Task[] {
  const search = searchTask.trim().toLowerCase();

  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search) &&
      (status === "all" || task.status === status) &&
      (priority === "all" || task.priority === priority),
  );
}
