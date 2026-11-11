'use client';

import React, { useState } from 'react';
import { PARENT_VIEW_DATA } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import {
  Users,
  Award,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Globe,
  Sparkles,
  Send,
  TrendingUp,
  Clock,
  Check,
} from 'lucide-react';

export default function ParentViewPage() {
  const { language, setLanguage } = useAuth();
  const [rsvpStatus, setRsvpStatus] = useState<string>('RSVP Now');
  const [trainerMsg, setTrainerMsg] = useState('');
  const [chatSent, setChatSent] = useState(false);

  const data = PARENT_VIEW_DATA;

  const handleSendTrainerMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainerMsg.trim()) return;
    setChatSent(true);
    setTrainerMsg('');
    setTimeout(() => setChatSent(false), 4000);
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Top Header Card: Ward details & Tamil/English toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-sm">
        <div>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
            {language === 'ta' ? 'பெற்றோர் பார்வை' : 'Parent View'}
          </span>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {data.wardName} ({data.wardBatch})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ta'
              ? 'உங்கள் பிள்ளையின் தொழில்முனைவு, பயிற்சி நிலை மற்றும் பயிற்சியாளர் கருத்துக்கள்'
              : 'Ward progress, attendance & trainer remarks'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'தமிழில் படிக்கவும்' : 'View in English'}</span>
          </button>
        </div>
      </div>

      {/* Top 3 KPI Metric Cards (Responsive 1-col on mobile, 3-col on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Readiness score */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Readiness score</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {data.readinessScore}
            </span>
            <span className="text-xs text-slate-400 font-semibold">/100</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] font-bold text-amber-800 bg-[#fef3c7] px-2 py-0.5 rounded-full">
              Nearly Ready
            </span>
            <span className="text-[11px] text-[#059669] font-medium flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> ▲ 6 this month
            </span>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Attendance</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            {data.attendance}%
          </div>
          <p className="text-[11px] text-[#059669] font-medium mt-1.5">
            Excellent · Above 85% requirement
          </p>
        </div>

        {/* Certifications */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Certifications</span>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight mt-1">
            {data.certifications}
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1.5">
            AWS Cloud Practitioner exam on Nov 22
          </p>
        </div>
      </div>

      {/* Monthly Progress Card Table (Fully Responsive) */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {language === 'ta' ? 'மாதாந்திர முன்னேற்ற அட்டை' : 'Monthly progress card'}
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {language === 'ta' ? 'செப்டம்பர் vs அக்டோபர் ஒப்பீடு' : 'Comparing this month with last month'}
            </p>
          </div>
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            October 2026
          </span>
        </div>

        {/* Table wrapper with smooth touch horizontal scroll for smaller screens */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead className="bg-slate-50 text-slate-500 border-y border-slate-200/80">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Area</th>
                <th className="py-2.5 px-3 font-semibold">September</th>
                <th className="py-2.5 px-3 font-semibold">October</th>
                <th className="py-2.5 px-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.monthlyComparison.map((row) => (
                <tr key={row.area} className="hover:bg-slate-50/50 transition">
                  <td className="py-3 px-3 font-semibold text-slate-900">{row.area}</td>
                  <td className="py-3 px-3 text-slate-600 font-medium">{row.sep}</td>
                  <td className="py-3 px-3 font-bold text-slate-800">{row.oct}</td>
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        row.status === 'On track'
                          ? 'bg-[#ecfdf5] text-[#047857]'
                          : row.status === 'Improving'
                          ? 'bg-[#eff6ff] text-[#1d4ed8]'
                          : 'bg-[#fffbeb] text-[#b45309]'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How You Can Help Guidance Banner (Screenshot 10 match) */}
        <div className="mt-5 p-3.5 sm:p-4 rounded-xl bg-[#eff6ff] border border-blue-200/80 flex items-start gap-3 text-xs text-blue-950">
          <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-blue-900 block mb-0.5">
              {language === 'ta' ? 'பெற்றோர்கள் எவ்வாறு உதவலாம்:' : 'How you can help at home:'}
            </span>
            <p className="text-blue-800 text-[11px] sm:text-xs leading-relaxed">
              {language === 'ta'
                ? 'தினமும் 10 நிமிடங்கள் ஆங்கிலத்தில் பேச ஊக்கப்படுத்துங்கள் மற்றும் பிரியாவை தனது ML திட்டத்தைப் பற்றி வீட்டில் விளக்குமாறு கேளுங்கள்.'
                : data.helpAtHomeGuidance}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Portfolio & Live Demos + Upcoming Events & Direct Trainer Message */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Portfolio & Upcoming Events */}
        <div className="space-y-4">
          {/* Portfolio Links */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Portfolio & Practical Projects
            </h2>
            <p className="text-xs text-slate-500">Verified links to your ward's practical work</p>
            <div className="space-y-2 text-xs">
              {data.portfolioLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/60 hover:bg-blue-50/60 hover:border-blue-200 flex items-center justify-between text-blue-600 transition"
                >
                  <span className="font-medium text-slate-800">{link.title}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Upcoming Events with RSVP */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Upcoming Events & Sessions
            </h2>
            <div className="space-y-2.5 text-xs">
              {data.upcomingEvents.map((evt) => (
                <div
                  key={evt.title}
                  className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                >
                  <div>
                    <p className="font-bold text-slate-900">{evt.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{evt.date}</p>
                  </div>

                  {evt.rsvp && (
                    <button
                      onClick={() => setRsvpStatus('RSVP Confirmed ✓')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm ${
                        rsvpStatus.includes('Confirmed')
                          ? 'bg-[#ecfdf5] text-[#047857] border border-emerald-300'
                          : 'bg-[#0d9488] hover:bg-teal-700 text-white'
                      }`}
                    >
                      {rsvpStatus}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Message Lead Trainer Directly */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {language === 'ta' ? 'பயிற்சியாளரிடம் பேசவும்' : 'Message the Trainer'}
              </h2>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                Lead Trainer Arun Kumar
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Direct 1-on-1 verified channel for parents. Messages automatically support Tamil and English translation.
            </p>

            {/* Trainer Remark Box from screenshot */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-800">Trainer Remark (October):</span>
              <p className="text-slate-600 mt-1 leading-relaxed">
                "Priya is showing consistent practice and strong ML project work. Encourage speaking practice at home."
              </p>
            </div>

            <form onSubmit={handleSendTrainerMsg} className="space-y-2 pt-2">
              <textarea
                value={trainerMsg}
                onChange={(e) => setTrainerMsg(e.target.value)}
                placeholder={
                  language === 'ta'
                    ? 'உங்கள் கேள்வியை அல்லது கருத்தை இங்கு எழுதவும்...'
                    : 'Ask a question or send a note to the trainer...'
                }
                rows={4}
                className="w-full p-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Replies within 24 hours</span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>

              {chatSent && (
                <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 mt-2">
                  <Check className="w-3.5 h-3.5" />
                  <span>Message delivered to Lead Trainer Arun Kumar!</span>
                </div>
              )}
            </form>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center">
            IREP Parent Portal · Encrypted & Retained per College Policy
          </div>
        </div>
      </div>
    </div>
  );
}
