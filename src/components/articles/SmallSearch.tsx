/** Small search bar — submits to the Stories (/stories) page. Used on Jobs, News, Tech and category pages. */
export function SmallSearch({ placeholder = "Search job news…", defaultValue = "" }: { placeholder?: string; defaultValue?: string }) {
  return (
    <form
      action="/stories"
      method="get"
      role="search"
      className="flex max-w-md items-center rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200"
    >
      <label htmlFor="small-search" className="sr-only">
        Search job news
      </label>
      <input
        id="small-search"
        name="search"
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-9 w-full flex-1 bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </button>
    </form>
  );
}
