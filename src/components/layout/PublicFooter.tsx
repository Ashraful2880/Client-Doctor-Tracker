import React from 'react';
import Link from 'next/link';
import {
  Activity,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';

const SOCIAL_LINKS = [
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

export function PublicFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-sky-50/70 via-white to-slate-50 text-slate-600">
      {/* Decorative Background Shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-sky-200/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-white/80"
      >
        <path
          fill="currentColor"
          d="M0,48 C240,96 480,0 720,48 C960,96 1200,16 1440,56 L1440,0 L0,0 Z"
        />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-10 hidden h-48 w-48 rounded-full border border-sky-200/50 lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-20 top-20 hidden h-28 w-28 rounded-full border border-emerald-200/60 lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand + Social Links */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-emerald-600 text-white shadow-md shadow-sky-600/20">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-base font-extrabold tracking-tight text-slate-900">
                  DoctorTracker
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-sky-600">
                  Care Guide
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-600 sm:text-sm">
              Modern clinical administration for healthcare coordinators. Track
              specialist rosters, manage patient records, and monitor live clinic
              workloads in one secure platform.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-600 hover:text-white hover:shadow-md hover:shadow-sky-600/20"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/#specialisations"
                  className="text-slate-600 transition hover:text-sky-600"
                >
                  Specialists
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-slate-600 transition hover:text-sky-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-slate-600 transition hover:text-sky-600"
                >
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-slate-600 transition hover:text-sky-600"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 transition hover:text-sky-600"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Portal Modules */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Clinical Portal
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className="text-slate-600 transition hover:text-sky-600"
                >
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  className="text-slate-600 transition hover:text-sky-600"
                >
                  Doctors Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/patients"
                  className="text-slate-600 transition hover:text-sky-600"
                >
                  Patient Care Records
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-slate-600 transition hover:text-sky-600"
                >
                  Coordinator Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Live Status */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Get in Touch
            </h4>
            <ul className="mt-4 space-y-3 text-xs text-slate-600 sm:text-sm">
              <li className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <span>support@doctortracker.care</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <span>+880 1124-200905</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                <span>Care Guide Clinical Hub, Dhaka</span>
              </li>
            </ul>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              All Clinical Systems Operational
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} DoctorTracker &bull; Care Guide
            Administration. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Encrypted Clinical Portal
            </span>
            <Link href="/contact" className="transition hover:text-sky-600">
              Privacy Policy
            </Link>
            <Link href="/contact" className="transition hover:text-sky-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

