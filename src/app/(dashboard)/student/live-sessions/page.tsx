'use client';

import React, { useState } from 'react';
import { LIVE_SESSIONS_LIST } from '@/lib/mock-data';
import {
  Video,
  Clock,
  Calendar,
  CheckCircle2,
  Play,
  FileText,
  AlertCircle,
  ExternalLink,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LiveSessionsAndRecordingsPage() {
  const router = useRouter();
  const [deviceCheckPassed, setDeviceCheckPassed] = useState(true);
  const [activeRecordingModal, setActiveRecordingModal] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">
          Live Sessions & Recordings
        </h1>
        <p className="text-xs text-slate-500">
          Daily 1-hour live lectures, Saturday 3-hour labs, and recording library with AI transcripts.
        </p>
      </div>

      {/* Starting Soon Hero Banner (Screen 14 Mockup) */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-2xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-blue-700">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700">
              Starting in 4 min
            </span>
          </div>

          <h2 className="text-lg md:text-xl font-extrabold text-white">
            Future Skills: LLM APIs & RAG Architectures
          </h2>
          <p className="text-xs text-blue-200">
            Thu, Oct 9 · 11:00 AM to 12:00 PM · Trainer: Arun Kumar · Lab: AI Notebook pre-loaded
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2">
          <button
            onClick={() => router.push('/student/live-classroom')}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2 transform active:scale-95"
          >
            <Video className="w-4 h-4" />
            <span>Join Live Classroom</span>
          </button>
          <span className="text-[11px] text-blue-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mic & camera check passed</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Weekly Schedule + Attendance & Recording Library */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: This Week's Sessions Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">This week's sessions</h2>
              <p className="text-[11px] text-slate-500">Week 6 · Join from the portal, no separate app needed</p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Mon to Sat Plan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">When</th>
                  <th className="py-2.5 px-3">Session</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {LIVE_SESSIONS_LIST.map((sess) => (
                  <tr key={sess.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap">
                      {sess.date}
                      <span className="block text-[10px] text-slate-400 font-normal">{sess.time}</span>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">
                      {sess.title}
                      <span className="block text-[11px] text-slate-400">{sess.trainer}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {sess.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sess.status === 'Starting Soon'
                            ? 'bg-blue-100 text-blue-800'
                            : sess.status === 'Attended'
                            ? 'bg-emerald-100 text-emerald-800'
                            : sess.status === 'Missed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {sess.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      {sess.status === 'Starting Soon' ? (
                        <button
                          onClick={() => router.push('/student/live-classroom')}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded text-[11px] shadow-sm"
                        >
                          Join
                        </button>
                      ) : sess.recordingAvailable ? (
                        <button
                          onClick={() => setActiveRecordingModal(sess.title)}
                          className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-blue-600 font-bold rounded text-[11px] flex items-center gap-1 ml-auto"
                        >
                          <Play className="w-3 h-3 fill-blue-600" />
                          <span>Recording</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">Scheduled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Attendance Summary & Recording Library (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Attendance Gauge Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                My attendance
              </h2>
              <span className="text-[10px] text-slate-400 font-medium">Semester 5</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">92%</span>
              <span className="text-xs text-slate-500">53 of 58 sessions</span>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-100 pt-1">
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Weekday (1 hr)</span>
                <span className="font-bold text-slate-900">93%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Saturday labs (3 hrs)</span>
                <span className="font-bold text-slate-900">89%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Recordings watched for missed</span>
                <span className="font-bold text-emerald-600">4 of 5</span>
              </div>
            </div>
          </div>

          {/* Recording Library List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Recording library
            </h2>

            <div className="space-y-2 text-xs">
              {[
                { title: 'Cloud deploy walkthrough', duration: '58 min' },
                { title: 'Docker Compose lab', duration: '2 hr 51 min' },
                { title: 'Mock interview tips & rubric', duration: '42 min' },
                { title: 'SQL window functions', duration: '55 min' },
              ].map((rec) => (
                <div
                  key={rec.title}
                  onClick={() => setActiveRecordingModal(rec.title)}
                  className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-200 cursor-pointer transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Play className="w-3.5 h-3.5 text-blue-600 fill-blue-600 flex-shrink-0" />
                    <span className="font-semibold text-slate-800 truncate">{rec.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">
                    {rec.duration}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-400 text-center pt-1">
              Includes chapter marks, transcripts and AI summaries for quick revision.
            </p>
          </div>

          {/* How Attendance Works Box */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1 text-blue-950">
            <span className="font-bold">How attendance works:</span>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Join from the portal and attendance is marked automatically after 75% of the session. Saturday in-lab sessions use QR check-in. Parents see attendance in their monthly progress card.
            </p>
          </div>
        </div>
      </div>

      {/* Recording Player Modal */}
      {activeRecordingModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{activeRecordingModal}</h3>
                <p className="text-xs text-slate-500">Live Recording · AI Summary & Transcript</p>
              </div>
              <button
                onClick={() => setActiveRecordingModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Video Player Box */}
            <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center text-white relative">
              <Play className="w-12 h-12 fill-blue-600 text-blue-600" />
              <span className="absolute bottom-3 left-3 text-xs bg-black/60 px-2 py-0.5 rounded">
                Chapter 1: Architecture Overview (00:00 - 15:20)
              </span>
            </div>

            {/* AI Summary Pills */}
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-950 space-y-1">
              <span className="font-bold flex items-center gap-1 text-purple-900">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" /> AI Key Takeaways
              </span>
              <p className="text-[11px] text-purple-800">
                1. Always separate data preprocessing to prevent test leakage in cross-validation.<br />
                2. Use Cosine Similarity for semantic query matching over token embeddings.<br />
                3. Enforce 75% threshold tracking for verified attendance.
              </p>
            </div>

            <button
              onClick={() => setActiveRecordingModal(null)}
              className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
            >
              Close Recording
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

