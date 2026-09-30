function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            ResumeForge
          </h1>

          <p className="text-sm text-slate-500">
            Build a professional resume
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          New Resume
        </button>
      </div>
    </header>
  )
}

export default Header