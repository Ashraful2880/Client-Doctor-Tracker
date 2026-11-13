import {
  Zap,
  Users,
  Layers,
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

export const DASH_FEATURES = [
  {
    icon: Stethoscope,
    title: "Doctor Directory & Workload",
    tone: "bg-sky-50 text-sky-600 border-sky-100",
    description:
      "Create, search, and filter doctors by specialization, hospital, or registration date with instant patient-load visibility.",
  },
  {
    icon: Users,
    title: "Patient Care Records",
    tone: "bg-violet-50 text-violet-600 border-violet-100",
    description:
      "Manage patients under specific doctors or across the entire clinic with condition, gender, and date-range filters.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Recharts Analytics",
    tone: "bg-emerald-50 text-emerald-600 border-emerald-100",
    description:
      "Visualize patients per doctor, daily registration trends, and condition distributions powered by MongoDB aggregations.",
  },
  {
    icon: ShieldCheck,
    title: "Bearer JWT Security",
    tone: "bg-amber-50 text-amber-600 border-amber-100",
    description:
      "Protected portal routes and REST API endpoints secured with Zod validation, bcrypt hashing, and Bearer token auth.",
  },
  {
    icon: Zap,
    title: "Indexed Query Performance",
    tone: "bg-cyan-50 text-cyan-600 border-cyan-100",
    description:
      "Compound MongoDB indexes and parallel count queries deliver sub-30ms paginated search and filtering.",
  },
  {
    icon: Layers,
    title: "RTK Query Cache Sync",
    tone: "bg-rose-50 text-rose-600 border-rose-100",
    description:
      "Automatic tag invalidation keeps doctor counts, patient tables, and dashboard charts synchronized without manual reloads.",
  },
];

export const PRICING_TIERS = [
  {
    badge: null,
    annualPrice: 0,
    monthlyPrice: 0,
    cta: "Start Free",
    highlighted: false,
    name: "Starter Clinic",
    subtitle: "For small private practices getting organized.",
    features: [
      "Up to 5 registered doctors",
      "Up to 100 patient records",
      "Regex search & condition filters",
      "Standard dashboard overview",
      "Bearer JWT authentication",
    ],
  },
  {
    annualPrice: 39,
    monthlyPrice: 49,
    highlighted: true,
    cta: "Get Started",
    badge: "Most Popular",
    name: "Professional Care",
    subtitle: "For growing clinics needing full clinical visibility.",
    features: [
      "Unlimited doctors & patients",
      "Full Recharts analytics suite",
      "Date-range & multi-criteria filtering",
      "Doctor-specific patient assignment",
      "RTK Query instant cache sync",
      "Priority email support",
    ],
  },
  {
    badge: null,
    annualPrice: 119,
    monthlyPrice: 149,
    highlighted: false,
    cta: "Contact Sales",
    name: "Enterprise Hospital",
    subtitle: "For multi-branch hospitals and health networks.",
    features: [
      "Everything in Professional Care",
      "Multi-hospital department tracking",
      "Dedicated MongoDB cluster support",
      "Custom API & audit log retention",
      "99.9% uptime SLA guarantee",
    ],
  },
];

export const TESTIMONIALS = [
  {
    initials: "NK",
    name: "Dr. Nadia Karim",
    role: "Medical Director, Metro Care",
    quote:
      "DoctorTracker replaced three separate spreadsheets in our clinic. Checking patient load per specialist now takes two seconds.",
  },
  {
    initials: "TM",
    name: "Tariq Mahmud",
    role: "Clinical Operations Lead",
    quote:
      "The date-wise filtering and condition breakdown charts give our operations team immediate clarity every Monday morning.",
  },
  {
    initials: "SJ",
    name: "Sarah Jenkins",
    role: "Senior Cardiologist",
    quote:
      "Clean, fast, and effortless to navigate on both desktop and mobile. Adding patients directly under a doctor is seamless.",
  },
];

export const FAQS = [
  {
    q: "How is DoctorTracker secured?",
    a: "All administrative routes and API endpoints are protected with Bearer JWT authentication, bcrypt password hashing, and strict Zod request validation.",
  },
  {
    q: "Can I assign and manage patients under a specific doctor?",
    a: "Yes. Every doctor has a dedicated detail view showing their profile and assigned patients, where you can add new patients or remove existing ones.",
  },
  {
    q: "How fast are search, filtering, and analytics on larger datasets?",
    a: "Backend queries use MongoDB compound indexes, lean projections, parallel countDocuments, and $lookup/$group aggregation pipelines for fast responses.",
  },
  {
    q: "Can I switch plans or self-host the portal?",
    a: "Yes. DoctorTracker runs on a decoupled Next.js client and Express/MongoDB server, making it easy to deploy on Vercel, Render, Railway, or your own infrastructure.",
  },
];