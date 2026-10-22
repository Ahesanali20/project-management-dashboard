import type { Task } from "../types/tasks";

type TaskListProps = {
  tasks: Task[];
  onToggleStatus: (taskId: number) => void;
};

const TaskList = ({ tasks, onToggleStatus }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-surface p-6 text-center text-sm text-text-muted">
        No tasks found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full min-w-[650px] text-left text-sm">
        <thead className="border-b border-border bg-slate-50 text-text-muted">
          <tr>
            <th className="px-5 py-3 font-medium">Task</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Priority</th>
            <th className="px-5 py-3 font-medium">Due Date</th>
            <th className="px-5 py-3 font-medium">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-slate-50">
              <td className="px-5 py-4 font-medium">{task.title}</td>
              <td className="px-5 py-4">{task.status}</td>
              <td className="px-5 py-4">{task.priority}</td>
              <td className="px-5 py-4">{task.dueDate}</td>
              <td className="px-5 py-4">
                <button
                  type="button"
                  onClick={() => onToggleStatus(task.id)}
                  className="font-medium text-brand-700 hover:text-brand-900"
                >
                  {task.status === "done" ? "Reopen" : "Complete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
