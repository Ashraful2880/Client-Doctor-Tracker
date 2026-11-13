'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react';
import { FormField, inputClassName } from '@/components/shared/FormField';

const CONTACT_CHANNELS = [
  {
    title: 'Email Support',
    subtitle: 'Our team can help you at',
    value: 'support@careguide.com',
    icon: Mail,
  },
  {
    title: 'Call Center',
    subtitle: 'Available 24/7 for clinical teams',
    value: '+1 (555) 234-8900',
    icon: Headphones,
  },
  {
    title: 'Our Office',
    subtitle: 'Main Clinical Operations Hub',
    value: '420 Care Guide Plaza, Suite 300, Metro Medical District',
    icon: MapPin,
  },
  {
    title: 'WhatsApp Support',
    subtitle: 'Chat directly with our specialists',
    value: '+1 (555) 234-8905',
    icon: MessageCircle,
  },
];

export function ContactSection() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ fullName: '', phone: '', subject: '', message: '' });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <span className="h-3.5 w-0.5 bg-emerald-600" />
          Get in Touch
        </div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Have any Questions?
        </h1>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
          We&apos;re here to help and answer any question you might have about DoctorTracker,
          clinic onboarding, or enterprise deployments.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left: Contact Channels */}
        <div className="space-y-5 lg:col-span-5">
          {CONTACT_CHANNELS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-emerald-200 hover:shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">{item.title}</h2>
                  <p className="mt-0.5 text-xs text-slate-500">{item.subtitle}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-800">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Contact Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
          {submitted && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="font-semibold">Message received!</p>
                <p className="mt-0.5 text-xs text-emerald-700">
                  Thank you for reaching out. Our clinical support team will respond shortly.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Full Name" htmlFor="contact-name" required>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  className={inputClassName}
                />
              </FormField>

              <FormField label="Phone Number" htmlFor="contact-phone" required>
                <input
                  id="contact-phone"
                  type="text"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className={inputClassName}
                />
              </FormField>
            </div>

            <FormField label="Subject" htmlFor="contact-subject" required>
              <input
                id="contact-subject"
                type="text"
                required
                placeholder="How can we help?"
                value={form.subject}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, subject: e.target.value }))
                }
                className={inputClassName}
              />
            </FormField>

            <FormField label="Message" htmlFor="contact-message" required>
              <textarea
                id="contact-message"
                rows={4}
                required
                placeholder="Type your question here..."
                value={form.message}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
                className={inputClassName}
              />
            </FormField>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

