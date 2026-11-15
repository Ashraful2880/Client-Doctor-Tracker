import {
  Zap,
  Mail,
  Users,
  MapPin,
  Layers,
  BarChart3,
  Headphones,
  Stethoscope,
  ShieldCheck,
  MessageCircle,
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

export const CONTACT_CHANNELS = [
  {
    icon: Mail,
    title: 'Email Support',
    value: 'support@careguide.com',
    subtitle: 'Our team can help you at',
  },
  {
    icon: Headphones,
    title: 'Call Center',
    value: '+1 (555) 234-8900',
    subtitle: 'Available 24/7 for clinical teams',
  },
  {
    icon: MapPin,
    title: 'Our Office',
    subtitle: 'Main Clinical Operations Hub',
    value: '420 Care Guide Plaza, Suite 300, Metro Medical District',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    value: '+1 (555) 234-8905',
    subtitle: 'Chat directly with our specialists',
  },
];

export const PIE_COLORS = [
  "#3b82f6",
  "#f59e0b",
  "#10b981",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#64748b",
];

export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 9H16V6h-2.5C11.57 6 10 7.57 10 9.5V11H8v3h2v7h3v-7h2.3l.7-3H13v-1.5c0-.28.22-.5.5-.5z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.2 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com',
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.93 4.75 12 4.75 12 4.75s-5.93 0-7.64.49A2.75 2.75 0 0 0 2.42 7.19 28.7 28.7 0 0 0 2 12a28.7 28.7 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.95c1.71.49 7.64.49 7.64.49s5.93 0 7.64-.49a2.75 2.75 0 0 0 1.94-1.95A28.7 28.7 0 0 0 22 12a28.7 28.7 0 0 0-.42-4.81ZM10 15.25v-6.5L15.5 12 10 15.25Z" />
      </svg>
    ),
  },
];

export const NAV_LINKS = [
  { href: '/#specialisations', sectionId: 'specialisations', label: 'Specialists' },
  { href: '/#about', sectionId: 'about', label: 'About' },
  { href: '/#pricing', sectionId: 'pricing', label: 'Pricing' },
  { href: '/#faq', sectionId: 'faq', label: 'FAQ' },
  { href: '/contact', sectionId: null, label: 'Contact' },
];

export const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];