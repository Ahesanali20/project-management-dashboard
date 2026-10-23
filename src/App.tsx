import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { initialTasks } from "./data/tasks";
import { getTaskStats } from "./utils/taskStats";
import { priorityFilterOptions, statusFilterOptions, filterTasks } from "./utils/taskFilters";
import type { NewTaskData, Task } from "./types/tasks";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

type StatusFilter = (typeof statusFilterOptions)[number]["value"];
type PriorityFilter = (typeof priorityFilterOptions)[number]["value"];
const STORAGE_KEY = "taskflow.tasks.v1";

function readTasks(): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialTasks;
    const value: unknown = JSON.parse(saved);
    if (!Array.isArray(value) || !value.every(isTask)) return initialTasks;
    return value;
  } catch {
    return initialTasks;
  }
}

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) return false;
  const task = value as Record<string, unknown>;
  const validDate = typeof task.dueDate === "string" &&
    (task.dueDate === "" || /^\d{4}-\d{2}-\d{2}$/.test(task.dueDate)) &&
    (task.dueDate === "" || !Number.isNaN(Date.parse(`${task.dueDate}T00:00:00`)));
  return Number.isSafeInteger(task.id) && typeof task.title === "string" &&
    (task.status === "todo" || task.status === "in-progress" || task.status === "done") &&
    (task.priority === "low" || task.priority === "medium" || task.priority === "high") &&
    validDate && typeof task.assignee === "string";
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(readTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [searchTask, setSearchTask] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [selectedPriority, setSelectedPriority] = useState<PriorityFilter>("all");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // The dashboard remains usable when browser storage is unavailable or full.
    }
  }, [tasks]);

  const taskStats = getTaskStats(tasks);
  const filteredTasks = filterTasks(tasks, searchTask, selectedStatus, selectedPriority);

  const toggleTaskStatus = (taskId: number) => {
    setTasks((current) => current.map((task) => task.id === taskId
      ? { ...task, status: task.status === "todo" ? "in-progress" : task.status === "in-progress" ? "done" : "todo" }
      : task));
  };

  const addTask = (data: NewTaskData) => {
    setTasks((current) => {
      const id = current.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
      return [{ ...data, id }, ...current];
    });
    closeForm();
  };

  const updateTask = (data: NewTaskData) => {
    if (!editingTask) return;
    setTasks((current) => current.map((task) => task.id === editingTask.id ? { ...data, id: task.id } : task));
    closeForm();
  };

  const closeForm = () => { setIsTaskFormOpen(false); setEditingTask(null); };

  const deleteTask = (task: Task) => {
    if (window.confirm(`Delete “${task.title}”? This action cannot be undone.`)) {
      setTasks((current) => current.filter((item) => item.id !== task.id));
    }
  };

  const stats = [
    { label: "Total Tasks", value: taskStats.total, detail: "Across all projects" },
    { label: "Completed", value: taskStats.completed, detail: "Tasks finished" },
    { label: "In Progress", value: taskStats.inProgress, detail: "Currently active" },
    { label: "Overdue", value: taskStats.overdue, detail: "Need attention" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-page font-sans text-text-main md:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <header className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-sm text-text-muted">Welcome back! Here&apos;s your project overview.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="sr-only" htmlFor="status-filter">Filter by status</label>
            <select id="status-filter" value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value as StatusFilter)} className="min-w-36 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-brand-600">
              {statusFilterOptions.map((status) => <option key={status.id} value={status.value}>{status.label}</option>)}
            </select>
            <label className="sr-only" htmlFor="priority-filter">Filter by priority</label>
            <select id="priority-filter" value={selectedPriority} onChange={(event) => setSelectedPriority(event.target.value as PriorityFilter)} className="min-w-36 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-brand-600">
              {priorityFilterOptions.map((priority) => <option key={priority.id} value={priority.value}>{priority.label}</option>)}
            </select>
            <input type="search" placeholder="Search tasks..." aria-label="Search tasks" className="min-w-40 flex-1 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-brand-600 sm:flex-none sm:w-56" value={searchTask} onChange={(event) => setSearchTask(event.target.value)} />
            <button type="button" onClick={() => { setSearchTask(""); setSelectedStatus("all"); setSelectedPriority("all"); }} className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm font-medium text-text-muted transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-brand-600">Clear filters</button>
            <button type="button" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700" onClick={() => { setEditingTask(null); setIsTaskFormOpen(true); }}>+ New Task</button>
          </div>
        </header>
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="mb-4 text-lg font-semibold">Overview</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => <article key={stat.label} className="rounded-xl border border-border bg-surface p-5"><p className="text-sm font-medium text-text-muted">{stat.label}</p><p className="mt-3 text-3xl font-bold tracking-tight">{stat.value}</p><p className="mt-2 text-xs text-text-muted">{stat.detail}</p></article>)}
          </div>
          <div className="mb-4 mt-8 flex items-center justify-between"><h2 className="text-lg font-semibold">Tasks</h2><span className="text-sm text-text-muted">{filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}</span></div>
          <TaskList tasks={filteredTasks} onToggleStatus={toggleTaskStatus} onEdit={(task) => { setEditingTask(task); setIsTaskFormOpen(true); }} onDelete={deleteTask} />
        </section>
      </main>
      {isTaskFormOpen && (
        <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-3 backdrop-blur-sm sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) closeForm(); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="task-form-title" className="my-auto w-full"><TaskForm key={editingTask?.id ?? "new"} task={editingTask ?? undefined} onSubmit={editingTask ? updateTask : addTask} onCancel={closeForm} /></div>
        </div>
      )}
    </div>
  );
}

export default App;
