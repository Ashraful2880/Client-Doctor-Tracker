import React from 'react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { ContactSection } from '@/components/features/contact/ContactSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5f6fa] text-slate-900">
      <PublicNavbar />

      <main>
        <ContactSection />
      </main>

      <PublicFooter />
    </div>
  );
}

