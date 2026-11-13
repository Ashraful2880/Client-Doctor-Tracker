import React from 'react';

const TONE_CLASSES: Record<string, string> = {
  blue: 'bg-sky-50 text-sky-700 ring-sky-200',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  rose: 'bg-rose-50 text-rose-700 ring-rose-200',
  violet: 'bg-violet-50 text-violet-700 ring-violet-200',
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
};

const VALUE_TONE_MAP: Record<string, string> = {
  Cardiology: 'rose',
  Hypertension: 'rose',
  Diabetes: 'amber',
  Neurology: 'violet',
  Neurological: 'violet',
  Pediatrics: 'emerald',
  Respiratory: 'blue',
  Pulmonology: 'blue',
  Orthopedics: 'slate',
  Orthopedic: 'slate',
};

interface StatusBadgeProps {
  label: string;
  tone?: keyof typeof TONE_CLASSES;
}

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  const resolvedTone = tone ?? VALUE_TONE_MAP[label] ?? 'blue';
  const classes = TONE_CLASSES[resolvedTone] ?? TONE_CLASSES.blue;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${classes}`}
    >
      {label}
    </span>
  );
}

