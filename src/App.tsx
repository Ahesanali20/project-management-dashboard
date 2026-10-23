import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { initialTasks } from "./data/tasks";
import { getTaskStats } from "./utils/taskStats";
import {
  priorityFilterOptions,
  statusFilterOptions,
  filterTasks,
} from "./utils/taskFilters";
import type { Task } from "./types/tasks";
import TaskList from "./components/TaskList";

type StatusFilter = (typeof statusFilterOptions)[number]["value"];
type PriorityFilter = (typeof priorityFilterOptions)[number]["value"];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchTask, setSearchTask] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [selectedPriority, setSelectedPriority] =
    useState<PriorityFilter>("all");
  const taskStats = getTaskStats(tasks);

  const filteredTasks = filterTasks(
    tasks,
    searchTask,
    selectedStatus,
    selectedPriority,
  );

  const toggleTaskStatus = (taskId: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === "todo"
                  ? "in-progress"
                  : task.status === "in-progress"
                    ? "done"
                    : "todo",
            }
          : task,
      ),
    );
  };

  const stats = [
    {
      label: "Total Tasks",
      value: taskStats.total,
      detail: "Across all projects",
    },
    {
      label: "Completed",
      value: taskStats.completed,
      detail: "Tasks finished",
    },
    {
      label: "In Progress",
      value: taskStats.inProgress,
      detail: "Currently active",
    },
    { label: "Overdue", value: taskStats.overdue, detail: "Need attention" },
  ];

  return (
    <div className="flex min-h-screen bg-page font-sans text-text-main">
      <Sidebar />

      <main className="min-w-0 flex-1 p-6 lg:p-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-sm text-text-muted">
              Welcome back! Here's your project overview.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedStatus}
              onChange={(event) =>
                setSelectedStatus(event.target.value as StatusFilter)
              }
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            >
              {statusFilterOptions.map((status) => (
                <option key={status.id} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            <select
              value={selectedPriority}
              onChange={(event) =>
                setSelectedPriority(event.target.value as PriorityFilter)
              }
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            >
              {priorityFilterOptions.map((priority) => (
                <option key={priority.id} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>

            <input
              type="search"
              placeholder="Search tasks..."
              aria-label="Search tasks"
              className="w-40 rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand-600 sm:w-56"
              value={searchTask}
              onChange={(e) => setSearchTask(e.target.value)}
            />

            <button
              type="button"
              className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              + New Task
            </button>
          </div>
        </header>

        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="mb-4 text-lg font-semibold">
            Overview
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <p className="text-sm font-medium text-text-muted">
                  {stat.label}
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-text-muted">{stat.detail}</p>
              </article>
            ))}
          </div>
          <TaskList tasks={filteredTasks} onToggleStatus={toggleTaskStatus} />
        </section>
      </main>
    </div>
  );
}

export default App;
