import type { Task } from "../types/tasks";

type TaskListProps = {
  tasks: Task[];
  onToggleStatus: (taskId: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const statusLabels: Record<Task["status"], string> = { todo: "To do", "in-progress": "In progress", done: "Done" };
const statusStyles: Record<Task["status"], string> = { todo: "bg-slate-100 text-slate-700", "in-progress": "bg-sky-100 text-sky-800", done: "bg-brand-100 text-brand-800" };
const priorityStyles: Record<Task["priority"], string> = { low: "bg-slate-100 text-slate-700", medium: "bg-amber-100 text-amber-800", high: "bg-rose-100 text-rose-800" };

const TaskList = ({ tasks, onToggleStatus, onEdit, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p className="rounded-xl border border-border bg-surface p-8 text-center text-sm text-text-muted">No tasks match these filters. Try changing your search or filters.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-border bg-slate-50 text-text-muted">
          <tr><th scope="col" className="px-5 py-3 font-medium">Task</th><th scope="col" className="px-5 py-3 font-medium">Assignee</th><th scope="col" className="px-5 py-3 font-medium">Status</th><th scope="col" className="px-5 py-3 font-medium">Priority</th><th scope="col" className="px-5 py-3 font-medium">Due date</th><th scope="col" className="px-5 py-3 font-medium">Actions</th></tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-slate-50">
              <td className="max-w-xs break-words px-5 py-4 font-medium" title={task.title}>{task.title}</td>
              <td className="px-5 py-4">{task.assignee || "Unassigned"}</td>
              <td className="px-5 py-4"><span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[task.status]}`}>{statusLabels[task.status]}</span></td>
              <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${priorityStyles[task.priority]}`}>{task.priority}</span></td>
              <td className="whitespace-nowrap px-5 py-4">{task.dueDate ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString() : "No date"}</td>
              <td className="px-5 py-4"><div className="flex items-center gap-3 whitespace-nowrap">
                <button type="button" onClick={() => onToggleStatus(task.id)} aria-label={`${task.status === "todo" ? "Start" : task.status === "in-progress" ? "Complete" : "Reopen"} ${task.title}`} className="font-medium text-brand-700 hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-brand-700">{task.status === "todo" ? "Start" : task.status === "in-progress" ? "Complete" : "Reopen"}</button>
                <button type="button" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`} className="font-medium text-slate-600 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-brand-700">Edit</button>
                <button type="button" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`} className="font-medium text-rose-700 hover:text-rose-900 focus-visible:outline-2 focus-visible:outline-rose-700">Delete</button>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
