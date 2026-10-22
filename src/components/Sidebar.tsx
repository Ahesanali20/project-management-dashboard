const navigationItems = ["Dashboard", "My Tasks", "Projects", "Team"];

const Sidebar = () => {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-border bg-surface p-6">
      <h2 className="mb-8 text-xl font-bold tracking-tight text-brand-900">
        TaskFlow
      </h2>

      <nav aria-label="Main navigation" className="flex flex-col gap-1">
        {navigationItems.map((item) => {
          const isActive = item === "Dashboard";

          return (
            <a
              href="#"
              key={item}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-text-muted hover:bg-slate-50 hover:text-text-main"
              }`}
            >
              {item}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
