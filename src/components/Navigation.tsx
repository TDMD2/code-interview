export default function Navigation() {
  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-900 dark:text-slate-100 font-manrope antialiased tracking-tight docked full-width top-0 border-b border-outline-variant shadow-sm fixed w-full z-50 flex justify-between items-center px-8 h-16">
      <div className="flex items-center gap-8">
        <div className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          CommuteFlow
        </div>
      </div>
    </nav>
  );
}
