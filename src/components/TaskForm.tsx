import { useState, type FormEvent } from "react";
import type { NewTaskData, Task, TaskPriority, TaskStatus } from "../types/tasks";

type TaskFormProps = {
  onSubmit: (task: NewTaskData) => void;
  onCancel: () => void;
  task?: Task;
};

const fieldClassName = "mt-2 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-text-main outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

const TaskForm = ({ onSubmit, onCancel, task }: TaskFormProps) => {
  const [title, setTitle] = useState(task?.title ?? "");
  const [assignee, setAssignee] = useState(task?.assignee ?? "");
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "");
  const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? "medium");
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "todo");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!title.trim()) nextErrors.title = "Please enter a task name.";
    if (!assignee.trim()) nextErrors.assignee = "Please enter an assignee.";
    if (!dueDate) nextErrors.dueDate = "Please choose a due date.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    onSubmit({ title: title.trim(), assignee: assignee.trim(), dueDate, priority, status });
  };

  const errorMessage = (field: string) => errors[field] && (
    <span id={`task-${field}-error`} role="alert" className="mt-1.5 block text-xs text-rose-600">{errors[field]}</span>
  );

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-surface shadow-xl shadow-slate-900/10">
      <div className="border-b border-border px-6 py-5 sm:px-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Task details</p>
            <h2 id="task-form-title" className="mt-1 text-xl font-bold tracking-tight">{task ? "Edit task" : "Create a new task"}</h2>
            <p className="mt-1 text-sm text-text-muted">Add the details so your team knows what to work on.</p>
          </div>
          <button type="button" onClick={onCancel} aria-label="Close task form" className="rounded-lg p-2 text-text-muted transition hover:bg-slate-100 hover:text-text-main focus:outline-none focus:ring-4 focus:ring-brand-100">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} aria-labelledby="task-form-title" noValidate>
        <div className="grid gap-5 px-6 py-6 sm:grid-cols-2 sm:px-7">
          <label className="sm:col-span-2">
            <span className="text-sm font-medium">Task name <span className="text-rose-500">*</span></span>
            <input autoFocus maxLength={120} value={title} onChange={(event) => { setTitle(event.target.value); if (event.target.value.trim()) setErrors((current) => ({ ...current, title: "" })); }} aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "task-title-error" : undefined} placeholder="e.g. Prepare project kickoff" className={fieldClassName} />
            {errorMessage("title")}
          </label>
          <label>
            <span className="text-sm font-medium">Assignee <span className="text-rose-500">*</span></span>
            <input value={assignee} onChange={(event) => { setAssignee(event.target.value); if (event.target.value.trim()) setErrors((current) => ({ ...current, assignee: "" })); }} aria-invalid={Boolean(errors.assignee)} aria-describedby={errors.assignee ? "task-assignee-error" : undefined} placeholder="Who owns this task?" className={fieldClassName} />
            {errorMessage("assignee")}
          </label>
          <label>
            <span className="text-sm font-medium">Due date <span className="text-rose-500">*</span></span>
            <input type="date" value={dueDate} onChange={(event) => { setDueDate(event.target.value); if (event.target.value) setErrors((current) => ({ ...current, dueDate: "" })); }} aria-invalid={Boolean(errors.dueDate)} aria-describedby={errors.dueDate ? "task-dueDate-error" : undefined} className={fieldClassName} />
            {errorMessage("dueDate")}
          </label>
          <label>
            <span className="text-sm font-medium">Priority</span>
            <select value={priority} onChange={(event) => setPriority(event.target.value as TaskPriority)} className={fieldClassName}>
              <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
            </select>
          </label>
          <label>
            <span className="text-sm font-medium">Status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value as TaskStatus)} className={fieldClassName}>
              <option value="todo">To do</option><option value="in-progress">In progress</option><option value="done">Done</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col-reverse gap-3 rounded-b-2xl border-t border-border bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end sm:px-7">
          <button type="button" onClick={onCancel} className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-text-main transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200">Cancel</button>
          <button type="submit" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100">{task ? "Save changes" : "Create task"}</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
