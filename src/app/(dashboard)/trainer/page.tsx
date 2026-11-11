'use client';

import React, { useState } from 'react';
import { TRAINER_DASHBOARD_DATA } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import {
  Users2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Clock,
  PhoneCall,
  UserPlus,
  FileText,
  Video,
  Send,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TrainerDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [markedAction, setMarkedAction] = useState<Record<string, boolean>>({});

  const handleAction = (studentName: string) => {
    setMarkedAction((prev) => ({ ...prev, [studentName]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">
            Trainer Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Welcome back, {user?.fullName || 'Arun Kumar'} · Lead Technical Trainer
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/trainer/live-classroom')}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5 animate-pulse"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Launch Live Classroom</span>
          </button>
        </div>
      </div>

      {/* 4 Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Active batches</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {TRAINER_DASHBOARD_DATA.activeBatches}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">248 students · 2 colleges</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Today's attendance</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {TRAINER_DASHBOARD_DATA.todayAttendance}%
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">▲ 3% vs last week</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Pending code reviews</span>
          <div className="text-2xl font-black text-blue-600 mt-1">
            {TRAINER_DASHBOARD_DATA.pendingCodeReviews}
          </div>
          <p className="text-[11px] text-amber-600 font-medium mt-1">6 older than 2 days</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">At-risk students</span>
          <div className="text-2xl font-black text-red-600 mt-1">
            {TRAINER_DASHBOARD_DATA.atRiskStudents}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Parents notified: 9</p>
        </div>
      </div>

      {/* Middle Row: Batch Readiness Chart & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Batch Readiness Bar Chart (Screen 8 Mockup) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Batch readiness score</h2>
              <p className="text-[11px] text-slate-500">Average benchmark across active cohorts</p>
            </div>
            <span className="text-xs font-semibold text-slate-500">This semester</span>
          </div>

          <div className="flex items-end justify-between h-44 pt-6 px-4 border-b border-slate-100">
            {TRAINER_DASHBOARD_DATA.batchScores.map((b) => (
              <div key={b.name} className="flex flex-col items-center gap-2">
                <span className="text-[11px] font-bold text-slate-800">{b.score}</span>
                <div
                  className="w-10 bg-blue-600 rounded-t-md transition-all hover:bg-blue-700"
                  style={{ height: `${(b.score / 100) * 120}px` }}
                ></div>
                <span className="text-xs font-semibold text-slate-600">{b.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule Table */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">Today's schedule</h2>
              <span className="text-xs text-slate-500">Thu, Oct 9</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {TRAINER_DASHBOARD_DATA.todaySchedule.map((s, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-600 w-16">{s.time}</span>
                    <div>
                      <p className="font-bold text-slate-800">{s.batch}</p>
                      <p className="text-[11px] text-slate-500">{s.session}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      s.status === 'Done'
                        ? 'bg-slate-100 text-slate-600'
                        : s.status === 'Next'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-50 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Students Needing Support & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* At-Risk / Support Table (8 cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Students needing support</h2>
              <p className="text-[11px] text-slate-500">Score below 60 threshold</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Student</th>
                  <th className="py-2.5 px-3">Batch</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3">Issue</th>
                  <th className="py-2.5 px-3 text-right">Suggested Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TRAINER_DASHBOARD_DATA.atRiskList.map((st) => {
                  const done = markedAction[st.student];
                  return (
                    <tr key={st.student} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{st.student}</td>
                      <td className="py-2.5 px-3 text-slate-600">{st.batch}</td>
                      <td className="py-2.5 px-3 font-bold text-red-600">{st.score}</td>
                      <td className="py-2.5 px-3 text-slate-600">{st.issue}</td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => handleAction(st.student)}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                            done
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                          }`}
                        >
                          {done ? 'Action Taken ✓' : st.action}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions (4 cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-3">Quick actions</h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => alert('Attendance session opened for active batch.')}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 text-slate-700 font-bold transition text-center"
              >
                Mark attendance
              </button>
              <button
                onClick={() => alert('Opening assessment authoring modal...')}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 text-slate-700 font-bold transition text-center"
              >
                Create test
              </button>
              <button
                onClick={() => router.push('/student/sprint-board')}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 text-slate-700 font-bold transition text-center"
              >
                Review PRs (17)
              </button>
              <button
                onClick={() => router.push('/trainer/message-hub')}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 text-slate-700 font-bold transition text-center"
              >
                Send parent update
              </button>
              <button
                onClick={() => router.push('/student/mock-interviews')}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 text-slate-700 font-bold transition text-center"
              >
                Schedule mock
              </button>
              <button
                onClick={() => alert('Monthly IREP Progress Report generated in PDF.')}
                className="p-2.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 transition text-center shadow-sm"
              >
                Monthly report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

