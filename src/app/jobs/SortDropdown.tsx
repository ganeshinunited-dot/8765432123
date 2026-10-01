"use client";

export function SortDropdown({ current }: { current: string }) {
  return (
    <select
      id="sort" name="sort" defaultValue={current}
      onChange={(e) => (e.target as HTMLSelectElement).form?.requestSubmit()}
      className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
    >
      <option value="newest">Newest</option>
      <option value="salary">Salary</option>
      <option value="featured">Featured</option>
    </select>
  );
}
