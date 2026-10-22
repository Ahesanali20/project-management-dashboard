import type { Task } from "../types/tasks";

export const initialTasks: Task[] = [
  {
    id: 1,
    title: "Build Dashboard UI",
    status: "done",
    priority: "high",
    dueDate: "2026-10-20",
    assignee: "Ahesan",
  },
  {
    id: 2,
    title: "Create Task Form",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-10-25",
    assignee: "Rahul",
  },
  {
    id: 3,
    title: "Add Search Feature",
    status: "todo",
    priority: "medium",
    dueDate: "2026-10-27",
    assignee: "Ahesan",
  },
  {
    id: 4,
    title: "Write Unit Tests",
    status: "in-progress",
    priority: "medium",
    dueDate: "2026-10-28",
    assignee: "Priya",
  },
  {
    id: 5,
    title: "Fix Responsive Layout",
    status: "todo",
    priority: "low",
    dueDate: "2026-10-30",
    assignee: "Rahul",
  },
];
