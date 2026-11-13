import {
  Users,
  BarChart3,
  ShieldCheck,
  Stethoscope,
  LayoutDashboard,
} from "lucide-react";
import { NavItem } from "@/types/InterfaceAll";

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    group: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/doctors",
    label: "Doctors",
    group: "Management",
    icon: Stethoscope,
  },
  { href: "/patients", label: "Patients", group: "Management", icon: Users },
];

export const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  doctors: "Doctors",
  patients: "Patients",
};

export const FEATURES = [
  {
    title: "Doctor Directory & Workload",
    description:
      "Create, search, and filter doctors by specialization, hospital, or registration date with instant patient-load visibility.",
    icon: Stethoscope,
    tone: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    title: "Patient Care Records",
    description:
      "Manage patients under specific doctors or across the entire clinic with condition, gender, and date-range filters.",
    icon: Users,
    tone: "bg-violet-50 text-violet-600 border-violet-100",
  },
  {
    title: "Real-Time Recharts Analytics",
    description:
      "Visualize patients per doctor, daily registration trends, and condition distributions powered by MongoDB aggregations.",
    icon: BarChart3,
    tone: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    title: "Bearer JWT Security",
    description:
      "Protected portal routes and REST API endpoints secured with Zod validation, bcrypt hashing, and Bearer token auth.",
    icon: ShieldCheck,
    tone: "bg-amber-50 text-amber-600 border-amber-100",
  },
];
