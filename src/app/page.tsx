'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Baby,
  BarChart3,
  Bone,
  Brain,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Database,
  Download,
  HeartPulse,
  Hospital,
  Layers,
  Microscope,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Stethoscope,
  Users,
  Wind,
  Zap,
} from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { Reveal } from '@/components/shared/Reveal';

const TRUST_STATS = [
  {
    label: 'Happy Patients',
    target: 50,
    suffix: 'K+',
    icon: Stethoscope,
    color: 'text-emerald-600',
    iconBg: 'bg-emerald-50 ring-emerald-100',
    hoverBorder: 'hover:border-emerald-200',
  },
  {
    label: 'Avg. Response Time',
    target: 10,
    suffix: ' Min',
    icon: Clock,
    color: 'text-violet-600',
    iconBg: 'bg-violet-50 ring-violet-100',
    hoverBorder: 'hover:border-violet-200',
  },
  {
    label: 'People Trusted Us',
    target: 700,
    suffix: 'K+',
    icon: Users,
    color: 'text-teal-600',
    iconBg: 'bg-teal-50 ring-teal-100',
    hoverBorder: 'hover:border-teal-200',
  },
  {
    label: '5-Star Rating',
    target: 95,
    suffix: '%',
    icon: Star,
    color: 'text-amber-500',
    iconBg: 'bg-amber-50 ring-amber-100',
    hoverBorder: 'hover:border-amber-200',
  },
  {
    label: 'Portal Syncs',
    target: 1,
    suffix: 'M+',
    icon: Download,
    color: 'text-sky-600',
    iconBg: 'bg-sky-50 ring-sky-100',
    hoverBorder: 'hover:border-sky-200',
  },
  {
    label: 'Partner Hospitals',
    target: 250,
    suffix: '+',
    icon: Hospital,
    color: 'text-rose-500',
    iconBg: 'bg-rose-50 ring-rose-100',
    hoverBorder: 'hover:border-rose-200',
  },
];

function AnimatedStatValue({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasAnimated(true);
        const duration = 1100;
        const start = performance.now();

        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {hasAnimated ? count : target}
      {suffix}
    </span>
  );
}

const TOP_SPECIALISATIONS = [
  {
    name: 'Cardiology',
    subtitle: 'Heart & Vascular',
    doctors: '14 Specialists',
    icon: HeartPulse,
    tone: 'text-rose-600 bg-rose-50 border-rose-100',
    hoverTone: 'hover:border-rose-200 hover:shadow-rose-500/5',
  },
  {
    name: 'Neurology',
    subtitle: 'Brain & Nervous System',
    doctors: '9 Specialists',
    icon: Brain,
    tone: 'text-violet-600 bg-violet-50 border-violet-100',
    hoverTone: 'hover:border-violet-200 hover:shadow-violet-500/5',
  },
  {
    name: 'Orthopedics',
    subtitle: 'Bones & Joint Care',
    doctors: '12 Specialists',
    icon: Bone,
    tone: 'text-amber-600 bg-amber-50 border-amber-100',
    hoverTone: 'hover:border-amber-200 hover:shadow-amber-500/5',
  },
  {
    name: 'Pediatrics',
    subtitle: 'Child & Newborn Care',
    doctors: '16 Specialists',
    icon: Baby,
    tone: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    hoverTone: 'hover:border-emerald-200 hover:shadow-emerald-500/5',
  },
  {
    name: 'Pulmonology',
    subtitle: 'Lung & Respiratory',
    doctors: '8 Specialists',
    icon: Wind,
    tone: 'text-sky-600 bg-sky-50 border-sky-100',
    hoverTone: 'hover:border-sky-200 hover:shadow-sky-500/5',
  },
  {
    name: 'Diagnostics',
    subtitle: 'Lab & Imaging',
    doctors: '11 Specialists',
    icon: Microscope,
    tone: 'text-teal-600 bg-teal-50 border-teal-100',
    hoverTone: 'hover:border-teal-200 hover:shadow-teal-500/5',
  },
  {
    name: 'General Medicine',
    subtitle: 'Primary & Preventive',
    doctors: '22 Specialists',
    icon: Stethoscope,
    tone: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    hoverTone: 'hover:border-indigo-200 hover:shadow-indigo-500/5',
  },
  {
    name: 'Endocrinology',
    subtitle: 'Diabetes & Hormones',
    doctors: '7 Specialists',
    icon: Activity,
    tone: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    hoverTone: 'hover:border-cyan-200 hover:shadow-cyan-500/5',
  },
  {
    name: 'Dermatology',
    subtitle: 'Skin & Clinical Care',
    doctors: '10 Specialists',
    icon: Sparkles,
    tone: 'text-pink-600 bg-pink-50 border-pink-100',
    hoverTone: 'hover:border-pink-200 hover:shadow-pink-500/5',
  },
  {
    name: 'ICU & Critical Care',
    subtitle: '24/7 Emergency Unit',
    doctors: '15 Specialists',
    icon: ShieldCheck,
    tone: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    hoverTone: 'hover:border-emerald-200 hover:shadow-emerald-500/5',
  },
];

const FEATURES = [
  {
    title: 'Doctor Directory & Workload',
    description:
      'Create, search, and filter doctors by specialization, hospital, or registration date with instant patient-load visibility.',
    icon: Stethoscope,
    tone: 'bg-sky-50 text-sky-600 border-sky-100',
  },
  {
    title: 'Patient Care Records',
    description:
      'Manage patients under specific doctors or across the entire clinic with condition, gender, and date-range filters.',
    icon: Users,
    tone: 'bg-violet-50 text-violet-600 border-violet-100',
  },
  {
    title: 'Real-Time Recharts Analytics',
    description:
      'Visualize patients per doctor, daily registration trends, and condition distributions powered by MongoDB aggregations.',
    icon: BarChart3,
    tone: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    title: 'Bearer JWT Security',
    description:
      'Protected portal routes and REST API endpoints secured with Zod validation, bcrypt hashing, and Bearer token auth.',
    icon: ShieldCheck,
    tone: 'bg-amber-50 text-amber-600 border-amber-100',
  },
  {
    title: 'Indexed Query Performance',
    description:
      'Compound MongoDB indexes and parallel count queries deliver sub-30ms paginated search and filtering.',
    icon: Zap,
    tone: 'bg-cyan-50 text-cyan-600 border-cyan-100',
  },
  {
    title: 'RTK Query Cache Sync',
    description:
      'Automatic tag invalidation keeps doctor counts, patient tables, and dashboard charts synchronized without manual reloads.',
    icon: Layers,
    tone: 'bg-rose-50 text-rose-600 border-rose-100',
  },
];

const PRICING_TIERS = [
  {
    name: 'Starter Clinic',
    subtitle: 'For small private practices getting organized.',
    monthlyPrice: 0,
    annualPrice: 0,
    badge: null,
    highlighted: false,
    cta: 'Start Free',
    features: [
      'Up to 5 registered doctors',
      'Up to 100 patient records',
      'Instant doctor & condition search',
      'Standard clinic overview dashboard',
      'Secure role-verified portal access',
    ],
  },
  {
    name: 'Professional Care',
    subtitle: 'For growing clinics needing full clinical visibility.',
    monthlyPrice: 49,
    annualPrice: 39,
    badge: 'Most Popular',
    highlighted: true,
    cta: 'Get Started',
    features: [
      'Unlimited doctors & patient records',
      'Full workload & trend analytics',
      'Date-range & multi-criteria filtering',
      'Doctor-specific patient assignment',
      'Real-time roster synchronization',
      'Priority clinical support',
    ],
  },
  {
    name: 'Enterprise Hospital',
    subtitle: 'For multi-branch hospitals and health networks.',
    monthlyPrice: 149,
    annualPrice: 119,
    badge: null,
    highlighted: false,
    cta: 'Contact Sales',
    features: [
      'Everything in Professional Care',
      'Multi-hospital department tracking',
      'Dedicated cloud infrastructure',
      'Custom reporting & audit logs',
      '99.9% uptime SLA guarantee',
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      'DoctorTracker replaced three separate spreadsheets in our clinic. Checking patient load per specialist now takes two seconds.',
    name: 'Dr. Nadia Karim',
    role: 'Medical Director',
    clinic: 'Metro Care Hospital',
    initials: 'NK',
    avatarTone: 'bg-sky-100 text-sky-700 ring-sky-200',
  },
  {
    quote:
      'The date-wise filtering and condition breakdown charts give our operations team immediate clarity every Monday morning.',
    name: 'Tariq Mahmud',
    role: 'Clinical Operations Lead',
    clinic: 'City General Clinic',
    initials: 'TM',
    avatarTone: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  },
  {
    quote:
      'Clean, fast, and effortless to navigate on both desktop and mobile. Adding patients directly under a doctor is seamless.',
    name: 'Dr. Sarah Jenkins',
    role: 'Senior Cardiologist',
    clinic: 'Heart & Vascular',
    initials: 'SJ',
    avatarTone: 'bg-violet-100 text-violet-700 ring-violet-200',
  },
  {
    quote:
      'Our front-desk coordinators onboarded in under ten minutes. Searching patients by condition or assigned specialist feels instantaneous.',
    name: 'Aisha Rahman',
    role: 'Head of Patient Care',
    clinic: 'Sunrise Health Hub',
    initials: 'AR',
    avatarTone: 'bg-amber-100 text-amber-700 ring-amber-200',
  },
  {
    quote:
      'Having live workload balance across all departments helps us prevent specialist burnout and reduce patient wait times.',
    name: 'Dr. Marcus Vance',
    role: 'Chief of Neurology',
    clinic: 'Apex Medical Center',
    initials: 'MV',
    avatarTone: 'bg-rose-100 text-rose-700 ring-rose-200',
  },
  {
    quote:
      'Whether I am reviewing pediatric rosters on a tablet or updating records at my desk, the layout stays crisp and responsive.',
    name: 'Dr. Hannah Cho',
    role: 'Lead Pediatrician',
    clinic: 'Hope Children Clinic',
    initials: 'HC',
    avatarTone: 'bg-teal-100 text-teal-700 ring-teal-200',
  },
];

const FAQS = [
  {
    q: 'How is DoctorTracker secured for clinic data?',
    a: 'All clinical routes and patient records are protected with encrypted sessions, role-verified access controls, and strict server-side validation.',
  },
  {
    q: 'Can I assign and manage patients under a specific doctor?',
    a: 'Yes. Every doctor has a dedicated profile view showing their hospital, specialization, and assigned patient list where you can add or update records anytime.',
  },
  {
    q: 'How fast are search and filtering on larger clinic datasets?',
    a: 'Search, condition filters, and date-range analytics are optimized for instant responses—even across thousands of doctor and patient records.',
  },
  {
    q: 'Is the portal available 24/7 on both mobile and desktop?',
    a: 'Yes. DoctorTracker is fully responsive across desktop, tablet, and mobile screens so coordinators can manage care rosters from anywhere.',
  },
  {
    q: 'Can our clinic switch plans or upgrade as we grow?',
    a: 'Yes. You can start free with Starter Clinic and upgrade to Professional Care or Enterprise Hospital anytime with zero data loss.',
  },
];

export default function LandingPage() {
  const token = useAppSelector((state) => state.auth.token);
  const portalHref = token ? '/dashboard' : '/login';

  const [annualBilling, setAnnualBilling] = useState(true);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#f5f6fa] text-slate-900">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-white pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32">
        {/* Ambient Clinical Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-sky-200/35 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
              Smart Care, Seamless{' '}
              <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                Doctor &amp; Patient
              </span>{' '}
              Tracking
            </h1>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              Coordinate specialist schedules, manage patient records, and monitor
              live clinic workloads from one secure healthcare portal.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Link
                href={portalHref}
                className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-700"
              >
                {token ? 'Go to Dashboard' : 'Launch Admin Portal'}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Contact Support
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Verified Specialists
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Real-Time Patient Records
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-sky-600" />
                Secure Clinical Portal
              </span>
            </div>
          </div>

          {/* Stylized Clinical Portal Preview */}
          <div className="relative lg:col-span-6">
            <div className="animate-float-slow rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-2xl shadow-sky-900/10 backdrop-blur sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-semibold text-slate-600">
                    DoctorTracker &bull; Clinical Overview
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live Sync
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50/90 to-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Active Doctors
                    </p>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                      <Stethoscope className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <p className="mt-1.5 text-2xl font-bold text-slate-900">12+</p>
                  <span className="mt-1 inline-block rounded bg-emerald-100/80 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                    8 Specializations
                  </span>
                </div>

                <div className="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50/90 to-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Total Patients
                    </p>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                      <Users className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <p className="mt-1.5 text-2xl font-bold text-slate-900">28+</p>
                  <span className="mt-1 inline-block rounded bg-sky-100/80 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700">
                    Tracked Live
                  </span>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800">Care Load by Doctor</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <Activity className="h-3.5 w-3.5" />
                    Balanced Load
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-7 items-end gap-2 sm:gap-2.5">
                  {[
                    { label: 'SJ', height: 62 },
                    { label: 'MV', height: 84 },
                    { label: 'AR', height: 68 },
                    { label: 'DC', height: 94 },
                    { label: 'HC', height: 74 },
                    { label: 'EB', height: 54 },
                    { label: 'NA', height: 86 },
                  ].map((bar) => (
                    <div key={bar.label} className="flex flex-col items-center gap-1.5">
                      <div className="flex h-20 w-full items-end">
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-sky-600 to-sky-400"
                          style={{ height: `${bar.height}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-xs shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                    SJ
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Dr. Sarah Jenkins</p>
                    <p className="text-[11px] text-slate-500">
                      Cardiology &bull; Metro General
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-semibold text-sky-700">
                  On Duty
                </span>
              </div>
            </div>

            {/* Floating Care Coordination Pill */}
            <div className="mt-3 hidden items-center gap-2.5 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2.5 shadow-lg shadow-slate-900/5 sm:absolute sm:-bottom-4 sm:-left-5 sm:mt-0 sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <HeartPulse className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">98% Care Sync</p>
                <p className="text-[10px] text-slate-500">Real-time doctor assignment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Column Trust Stats Row */}
      <section className="relative border-y border-slate-200/80 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/40 py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:gap-5 sm:px-6 lg:grid-cols-6 lg:px-8">
          {TRUST_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.label} delayMs={idx * 65}>
                <div
                  className={`group flex h-full flex-col items-center rounded-2xl border border-slate-200/80 bg-white px-3.5 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${stat.hoverBorder}`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110 ${stat.iconBg}`}
                  >
                    <Icon className={`h-5 w-5 ${stat.color}`} strokeWidth={2} />
                  </div>
                  <p className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                    <AnimatedStatValue target={stat.target} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{stat.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Top Specialisations Grid */}
      <section id="specialisations" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Specialists
              </div>
              <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Top Specialisations
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Coordinate across experienced doctors and clinical departments
              </p>
            </div>
            <Link
              href={portalHref}
              className="group inline-flex w-fit items-center gap-1.5 rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50/40 hover:text-sky-700"
            >
              View All Departments
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {TOP_SPECIALISATIONS.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <Reveal key={spec.name} delayMs={(idx % 5) * 60}>
                <Link
                  href={portalHref}
                  className={`group relative flex h-full flex-col items-center justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${spec.hoverTone}`}
                >
                  <span className="absolute right-3 top-3 text-slate-300 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-sky-600 group-hover:opacity-100">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${spec.tone}`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-bold text-slate-900 sm:text-sm">
                      {spec.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">{spec.subtitle}</p>
                  </div>

                  <span className="mt-3 inline-flex items-center rounded-full bg-slate-100/80 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 transition-colors group-hover:bg-sky-50 group-hover:text-sky-700">
                    {spec.doctors}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Healthcare at Your Fingertips */}
      <section className="relative overflow-hidden border-y border-slate-200/70 bg-gradient-to-br from-slate-50 via-sky-50/40 to-emerald-50/40 py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-xs backdrop-blur">
                <Smartphone className="h-3.5 w-3.5 text-emerald-600" />
                Portal &amp; Mobile Ready
              </div>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Healthcare at Your{' '}
                <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  Fingertips
                </span>
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
                Access DoctorTracker from desktop, tablet, or mobile. Coordinate
                specialists, update patient records, and monitor clinic activity
                in real time.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  {
                    title: 'Instant Doctor Lookup',
                    desc: 'Filter by specialty or hospital',
                    icon: Stethoscope,
                    tone: 'bg-sky-50 text-sky-600 border-sky-100',
                  },
                  {
                    title: 'Patient Assignment',
                    desc: 'Link patients to care teams',
                    icon: Users,
                    tone: 'bg-emerald-50 text-emerald-600 border-emerald-100',
                  },
                  {
                    title: 'Live Clinic Analytics',
                    desc: 'Condition & date insights',
                    icon: Activity,
                    tone: 'bg-violet-50 text-violet-600 border-violet-100',
                  },
                  {
                    title: 'Protected Access',
                    desc: 'Role-verified clinical portal',
                    icon: ShieldCheck,
                    tone: 'bg-amber-50 text-amber-600 border-amber-100',
                  },
                ].map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="group flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-110 ${item.tone}`}
                      >
                        <ItemIcon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{item.title}</p>
                        <p className="mt-0.5 text-[11px] text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={portalHref}
                  className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-700"
                >
                  <Smartphone className="h-4 w-4" />
                  Open Web Portal
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
                >
                  Request Demo
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Modern Layered Mobile Showcase */}
          <div className="flex justify-center lg:col-span-6">
            <Reveal delayMs={120}>
              <div className="relative flex items-center justify-center py-4 sm:px-8">
                {/* Soft Glowing Ring */}
                <div
                  aria-hidden="true"
                  className="absolute h-72 w-72 rounded-full bg-gradient-to-tr from-sky-300/25 via-emerald-200/25 to-violet-200/20 blur-2xl sm:h-80 sm:w-80"
                />

                {/* Phone Frame */}
                <div className="animate-float-slow relative w-[270px] rounded-[2.5rem] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 p-2.5 shadow-2xl shadow-sky-950/20 ring-1 ring-white/20 sm:w-[290px]">
                  <div className="overflow-hidden rounded-[2rem] bg-white">
                    {/* Dynamic Island */}
                    <div className="flex justify-center bg-gradient-to-r from-sky-600 to-emerald-600 pt-2.5">
                      <div className="h-4 w-20 rounded-full bg-slate-950/90" />
                    </div>

                    {/* App Header */}
                    <div className="bg-gradient-to-r from-sky-600 to-emerald-600 px-4 pb-5 pt-3 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-medium text-sky-100">
                            DoctorTracker Mobile
                          </p>
                          <p className="text-sm font-bold">Clinical Overview</p>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold backdrop-blur">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                          Live
                        </span>
                      </div>
                    </div>

                    {/* App Body */}
                    <div className="-mt-3 rounded-t-2xl bg-slate-50 px-3.5 pb-4 pt-3.5">
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-slate-500">
                              Doctors
                            </span>
                            <Stethoscope className="h-3.5 w-3.5 text-sky-600" />
                          </div>
                          <p className="mt-1 text-lg font-extrabold text-slate-900">12</p>
                        </div>
                        <div className="rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-slate-500">
                              Patients
                            </span>
                            <Users className="h-3.5 w-3.5 text-emerald-600" />
                          </div>
                          <p className="mt-1 text-lg font-extrabold text-slate-900">28</p>
                        </div>
                      </div>

                      <p className="mt-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        On-Duty Specialists
                      </p>

                      <div className="mt-2 space-y-2">
                        {[
                          {
                            initials: 'SJ',
                            name: 'Dr. Sarah Jenkins',
                            dept: 'Cardiology',
                            tone: 'bg-sky-100 text-sky-700',
                          },
                          {
                            initials: 'MV',
                            name: 'Dr. Marcus Vance',
                            dept: 'Neurology',
                            tone: 'bg-violet-100 text-violet-700',
                          },
                          {
                            initials: 'ER',
                            name: 'Dr. Elena Rostova',
                            dept: 'Pediatrics',
                            tone: 'bg-emerald-100 text-emerald-700',
                          },
                        ].map((doc) => (
                          <div
                            key={doc.name}
                            className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white px-2.5 py-2 shadow-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${doc.tone}`}
                              >
                                {doc.initials}
                              </span>
                              <div>
                                <p className="text-[11px] font-bold text-slate-800">
                                  {doc.name}
                                </p>
                                <p className="text-[9px] text-slate-500">{doc.dept}</p>
                              </div>
                            </div>
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                              Active
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Top-Right Notification Card */}
                <div className="hidden items-center gap-2 rounded-xl border border-slate-200/90 bg-white/95 px-3 py-2 shadow-lg shadow-slate-900/10 backdrop-blur sm:absolute sm:-right-4 sm:top-10 sm:flex">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                    <HeartPulse className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900">Patient Assigned</p>
                    <p className="text-[10px] text-emerald-600">Just now &bull; Synced</p>
                  </div>
                </div>

                {/* Floating Bottom-Left Status Card */}
                <div className="hidden items-center gap-2 rounded-xl border border-slate-200/90 bg-white/95 px-3 py-2 shadow-lg shadow-slate-900/10 backdrop-blur sm:absolute sm:-left-6 sm:bottom-12 sm:flex">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900">100% Responsive</p>
                    <p className="text-[10px] text-slate-500">Desktop &amp; Mobile UI</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-12 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
                  About DoctorTracker
                </div>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Built to Replace Fragmented{' '}
                  <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                    Clinic Spreadsheets
                  </span>
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Healthcare teams shouldn&apos;t rely on scattered spreadsheets to track
                  patient assignments. DoctorTracker unifies specialist rosters, patient
                  records, and live clinic workloads into one fast workspace.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="group flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:shadow-md">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 transition-transform duration-300 group-hover:scale-110">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Unified Doctor-Patient Hierarchy
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                        Inspect every doctor&apos;s hospital, specialization, and assigned
                        patient list from a single view.
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-md">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition-transform duration-300 group-hover:scale-110">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Instant Search &amp; Clinical Filtering
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                        Filter thousands of patient and doctor records by condition,
                        department, or date range in milliseconds.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {[
                {
                  title: 'Doctor Directory & Workload',
                  description:
                    'Create, search, and filter specialists by department or hospital with instant patient-load visibility.',
                  badge: 'Roster Sync',
                  icon: Stethoscope,
                  tone: 'bg-sky-50 text-sky-600 border-sky-100',
                  hoverTone: 'hover:border-sky-200 hover:shadow-sky-500/10',
                },
                {
                  title: 'Patient Care Records',
                  description:
                    'Manage patients under assigned doctors with condition, gender, and date-range filters.',
                  badge: 'Smart Filters',
                  icon: Users,
                  tone: 'bg-violet-50 text-violet-600 border-violet-100',
                  hoverTone: 'hover:border-violet-200 hover:shadow-violet-500/10',
                },
                {
                  title: 'Live Workload Analytics',
                  description:
                    'Visualize patients per doctor, registration trends, and condition breakdowns at a glance.',
                  badge: 'Visual Insights',
                  icon: BarChart3,
                  tone: 'bg-emerald-50 text-emerald-600 border-emerald-100',
                  hoverTone: 'hover:border-emerald-200 hover:shadow-emerald-500/10',
                },
                {
                  title: 'Protected Clinical Access',
                  description:
                    'Keep sensitive doctor and patient data secure with authenticated portal sessions and validation.',
                  badge: 'Verified Auth',
                  icon: ShieldCheck,
                  tone: 'bg-amber-50 text-amber-600 border-amber-100',
                  hoverTone: 'hover:border-amber-200 hover:shadow-amber-500/10',
                },
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <Reveal key={feat.title} delayMs={idx * 80}>
                    <div
                      className={`group flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${feat.hoverTone}`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div
                            className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${feat.tone}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 transition-colors group-hover:bg-sky-50 group-hover:text-sky-700">
                            {feat.badge}
                          </span>
                        </div>
                        <h3 className="mt-4 text-base font-bold text-slate-900">
                          {feat.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="relative overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 py-16 sm:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-200/25 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-700">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
                Transparent Pricing
              </div>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Plans Built for Every{' '}
                <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  Healthcare Team
                </span>
              </h2>

              <p className="mx-auto mt-2.5 max-w-xl text-sm text-slate-600 sm:text-base">
                Start free for small clinics or scale to unlimited doctors and
                multi-hospital analytics.
              </p>

              <div className="mt-7 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setAnnualBilling(false)}
                  className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 ${
                    !annualBilling
                      ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setAnnualBilling(true)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 ${
                    annualBilling
                      ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Annual
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      annualBilling
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-7">
            {PRICING_TIERS.map((tier, idx) => {
              const price = annualBilling ? tier.annualPrice : tier.monthlyPrice;
              return (
                <Reveal key={tier.name} delayMs={idx * 90}>
                  <div
                    className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                      tier.highlighted
                        ? 'border-sky-300 shadow-xl shadow-sky-600/10 ring-1 ring-sky-500/20 lg:-translate-y-2'
                        : 'border-slate-200/90 shadow-sm hover:border-sky-200 hover:shadow-lg'
                    }`}
                  >
                    {tier.highlighted && (
                      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-sky-500 to-emerald-500" />
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-extrabold text-slate-900">
                          {tier.name}
                        </h3>
                        {tier.badge && (
                          <span className="rounded-full bg-gradient-to-r from-sky-50 to-emerald-50 px-3 py-1 text-[11px] font-bold text-sky-700 ring-1 ring-sky-200/80">
                            {tier.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs text-slate-500">{tier.subtitle}</p>

                      <div className="mt-6 flex items-baseline gap-1.5">
                        <span className="text-4xl font-extrabold tracking-tight text-slate-900 tabular-nums">
                          ${price}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          / month
                        </span>
                        {annualBilling && price > 0 && (
                          <span className="ml-1.5 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                            Billed yearly
                          </span>
                        )}
                      </div>

                      <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-sm text-slate-600">
                        {tier.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                              <Check className="h-3 w-3" strokeWidth={2.5} />
                            </span>
                            <span className="text-xs sm:text-sm">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={tier.name === 'Enterprise Hospital' ? '/contact' : portalHref}
                      className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                        tier.highlighted
                          ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 hover:bg-sky-700'
                          : 'border border-slate-200 bg-slate-50/70 text-slate-800 hover:border-sky-200 hover:bg-sky-50/50 hover:text-sky-700'
                      }`}
                    >
                      {tier.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-white py-16 sm:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Trusted by Care Teams
              </div>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                What Clinical{' '}
                <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  Coordinators Say
                </span>
              </h2>

              <p className="mx-auto mt-2.5 max-w-xl text-sm text-slate-600 sm:text-base">
                Real feedback from medical directors, specialists, and clinic operations
                teams using DoctorTracker daily.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-xs">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[0, 1, 2, 3, 4].map((starIdx) => (
                    <Star key={starIdx} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <span>4.9 / 5 Average Rating from 250+ Clinics</span>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((item, idx) => (
              <Reveal key={item.name} delayMs={(idx % 3) * 80}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-500/5">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[0, 1, 2, 3, 4].map((starIdx) => (
                          <Star key={starIdx} className="h-3.5 w-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500 transition-colors group-hover:bg-sky-50 group-hover:text-sky-700">
                        {item.clinic}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-700">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-1 transition-transform duration-300 group-hover:scale-105 ${item.avatarTone}`}
                    >
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2-Column FAQ + Support Card */}
      <section
        id="faq"
        className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-slate-50/50 via-white to-white py-16 sm:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-16 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Frequently Asked Questions
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                We&apos;re here to help with{' '}
                <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  all your questions
                </span>
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Quick answers about clinic security, doctor-patient workflows, and
                onboarding.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left Smooth Accordion */}
            <div className="space-y-3.5 lg:col-span-8">
              {FAQS.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <Reveal key={item.q} delayMs={idx * 55}>
                    <div
                      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                        isOpen
                          ? 'border-sky-200 bg-white shadow-md shadow-sky-900/5'
                          : 'border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <div className="flex items-center gap-3.5">
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                              isOpen
                                ? 'bg-sky-600 text-white'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            0{idx + 1}
                          </span>
                          <span className="text-sm font-bold text-slate-900 sm:text-[15px]">
                            {item.q}
                          </span>
                        </div>
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                            isOpen ? 'bg-sky-50 text-sky-600' : 'bg-slate-50 text-slate-400'
                          }`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </span>
                      </button>

                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isOpen
                            ? 'grid-rows-[1fr] opacity-100'
                            : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-600 sm:pl-[3.75rem]">
                            {item.a}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Right Modern Support Card */}
            <div className="lg:col-span-4">
              <Reveal delayMs={160}>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-sky-50/80 via-white to-emerald-50/80 p-7 text-center shadow-lg shadow-sky-900/5">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-emerald-600 text-white shadow-md shadow-sky-600/20 transition-transform duration-300 group-hover:scale-105">
                    <Stethoscope className="h-8 w-8" />
                  </div>

                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200/70">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    24/7 Support Online
                  </div>

                  <h3 className="mt-3 text-xl font-extrabold text-slate-900">
                    Still have questions?
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    Our clinical onboarding team is ready to assist with clinic setup,
                    doctor rosters, and custom plans.
                  </p>

                  <div className="mt-5 space-y-2 rounded-xl border border-slate-200/70 bg-white/80 p-3 text-left text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>Under 10 min average response</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-600" />
                      <span>Guided clinic onboarding</span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-700"
                  >
                    Contact Support
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
