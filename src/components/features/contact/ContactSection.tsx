"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { CONTACT_CHANNELS } from "@/components/shared/AllOptions";
import { FormField, inputClassName } from "@/components/shared/FormField";

export function ContactSection() {
  const [form, setForm] = useState({
    phone: "",
    subject: "",
    message: "",
    fullName: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ fullName: "", phone: "", subject: "", message: "" });
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
          We&apos;re here to help and answer any question you might have about
          DoctorTracker, clinic onboarding, or enterprise deployments.
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
                  <h2 className="text-sm font-bold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {item.subtitle}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-800">
                    {item.value}
                  </p>
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
                  Thank you for reaching out. Our clinical support team will
                  respond shortly.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Full Name" htmlFor="contact-name" required>
                <input
                  required
                  type="text"
                  id="contact-name"
                  value={form.fullName}
                  placeholder="John Doe"
                  className={inputClassName}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                />
              </FormField>

              <FormField label="Phone Number" htmlFor="contact-phone" required>
                <input
                  required
                  type="text"
                  id="contact-phone"
                  value={form.phone}
                  className={inputClassName}
                  placeholder="+1 (555) 000-0000"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </FormField>
            </div>

            <FormField label="Subject" htmlFor="contact-subject" required>
              <input
                required
                type="text"
                id="contact-subject"
                value={form.subject}
                className={inputClassName}
                placeholder="How can we help?"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, subject: e.target.value }))
                }
              />
            </FormField>

            <FormField label="Message" htmlFor="contact-message" required>
              <textarea
                rows={4}
                required
                id="contact-message"
                value={form.message}
                className={inputClassName}
                placeholder="Type your question here..."
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
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
