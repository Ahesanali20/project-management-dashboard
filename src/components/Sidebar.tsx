const navigationItems = ["Dashboard", "My Tasks", "Projects", "Team"];

const Sidebar = () => (
  <aside className="flex w-full shrink-0 flex-col border-b border-border bg-surface p-4 md:min-h-screen md:w-56 md:border-b-0 md:border-r md:p-6 lg:w-64">
    <h2 className="mb-4 text-xl font-bold tracking-tight text-brand-900 md:mb-8">TaskFlow</h2>
    <nav aria-label="Main navigation" className="flex gap-1 overflow-x-auto md:flex-col">
      {navigationItems.map((item) => {
        const isActive = item === "Dashboard";
        return <a href="#" key={item} aria-current={isActive ? "page" : undefined} className={`whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-brand-50 text-brand-700" : "text-text-muted hover:bg-slate-50 hover:text-text-main"}`}>{item}</a>;
      })}
    </nav>
  </aside>
);

export default Sidebar;
