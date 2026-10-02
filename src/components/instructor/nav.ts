import { icons, type NavItem } from "@/components/dashboard/Shell";

export const INSTRUCTOR_NAV: NavItem[] = [
  { href: "/instructor/home", label: "Dashboard", icon: icons.chart },
  { href: "/instructor/courses", label: "My courses", icon: icons.briefcase },
  { href: "/instructor/reviews", label: "Reviews", icon: icons.chat },
  { href: "/instructor/billing", label: "Billing", icon: icons.card },
];
