import { cookies } from "next/headers";

/** Which "hat" an admin is currently wearing. Employer-only users always see the employer view. */
export const VIEW_COOKIE = "gx_view";
export type ViewMode = "admin" | "employer";

export async function getViewMode(isAdmin: boolean): Promise<ViewMode> {
  if (!isAdmin) return "employer";
  const jar = await cookies();
  const v = jar.get(VIEW_COOKIE)?.value;
  return v === "employer" ? "employer" : "admin";
}

export function viewHome(view: ViewMode): string {
  return view === "admin" ? "/admin/home" : "/employer/home";
}
