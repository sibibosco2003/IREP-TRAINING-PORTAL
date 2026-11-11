'use client';

import React from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Flame, ArrowUpRight } from 'lucide-react';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Top Banner & Greeting */}
      <div className="flex items-center justify-between pb-1">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
          Good morning, {user?.fullName?.split(' ')[0] || 'Priya'} 👋
        </h1>
      </div>

      {/* 4 KPI Metric Cards (Exact match to Screenshot 2) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Readiness score */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="text-[11px] font-medium text-slate-500">Readiness score</span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 tracking-tight">74</span>
            <span className="text-xs text-slate-400 font-semibold">/100</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] font-bold text-amber-800 bg-[#fef3c7] px-2 py-0.5 rounded-full">
              Nearly Ready
            </span>
            <span className="text-[11px] text-[#059669] font-medium">+5 this month</span>
          </div>
        </div>

        {/* Problems solved */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-medium text-slate-500">Problems solved</span>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            286
          </div>
          <p className="text-[11px] text-[#059669] font-medium mt-1.5 flex items-center gap-0.5">
            <span>▲ 34 this month</span>
          </p>
        </div>

        {/* Attendance */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-medium text-slate-500">Attendance</span>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            92%
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1.5">
            Target 85%
          </p>
        </div>

        {/* Practice streak */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-medium text-slate-500">Practice streak</span>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-1.5">
            <span className="text-lg">🔥</span>
            <span>19 days</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1.5">
            Best: 27 days
          </p>
        </div>
      </div>

      {/* Middle Grid: Skill progress & This week */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Skill progress (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Skill progress
            </h2>
            <span className="text-[10px] text-slate-400 font-medium">Semester 5</span>
          </div>

          <div className="space-y-3.5">
            {/* DSA patterns */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">DSA patterns</span>
                <span className="font-bold text-slate-800">78%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#10b981] h-full rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            {/* Aptitude & reasoning */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Aptitude & reasoning</span>
                <span className="font-bold text-slate-800">71%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#3b82f6] h-full rounded-full" style={{ width: '71%' }}></div>
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Cloud & DevOps</span>
                <span className="font-bold text-slate-800">64%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#8b5cf6] h-full rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>

            {/* AI & Data Science track */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">AI & Data Science track</span>
                <span className="font-bold text-slate-800">82%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#06b6d4] h-full rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>

            {/* Future Skills: AI engineering */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Future Skills: AI engineering</span>
                <span className="font-bold text-slate-800">58%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#f97316] h-full rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>

            {/* Communication */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Communication</span>
                <span className="font-bold text-slate-800">69%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#2563eb] h-full rounded-full" style={{ width: '69%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* This week (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                This week
              </h2>
              <span className="text-[10px] text-slate-400 font-medium">Week 6 of 12</span>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { day: 'Mon', title: 'DSA: Pattern drill - Union-Find', dur: '1 hr', pill: 'bg-[#e0e7ff] text-[#3730a3]' },
                { day: 'Tue', title: 'Track: Model evaluation lab', dur: '1 hr', pill: 'bg-[#e0e7ff] text-[#3730a3]' },
                { day: 'Wed', title: 'Aptitude: Data interpretation', dur: '1 hr', pill: 'bg-[#e0e7ff] text-[#3730a3]' },
                { day: 'Thu', title: 'Future Skills: LLM APIs & RAG', dur: '1 hr', pill: 'bg-[#e0e7ff] text-[#3730a3]' },
                { day: 'Fri', title: 'GD + weekly quiz', dur: '1 hr', pill: 'bg-[#e0e7ff] text-[#3730a3]' },
                { day: 'Sat', title: 'Track project kick-off + RAG mini-lab', dur: '3 hrs', pill: 'bg-[#f3e8ff] text-[#6b21a8] font-bold' },
              ].map((item) => (
                <div key={item.day} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-700 w-7">{item.day}</span>
                    <span className="text-slate-700 text-xs truncate max-w-[210px]">{item.title}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded ${item.pill}`}>
                    {item.dur}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3 Cards: Current project, Upcoming, Badges earned */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current project */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Current project
            </h2>
            <h3 className="text-sm font-bold text-slate-900">Crop Price Predictor</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              End-to-end ML · Team of 3 · Due Week 12
            </p>

            <div className="mt-4 space-y-1">
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#0d9488] h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                45% complete · 3 tasks open
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push('/student/sprint-board')}
            className="mt-3 text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View sprint board</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Upcoming */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Upcoming
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-slate-400 text-xs">📝</span>
              <span className="font-medium">Mid-term DSA test</span>
              <span className="text-slate-400">· Sat</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-slate-400 text-xs">🎤</span>
              <span className="font-medium">Mock interview</span>
              <span className="text-slate-400">· Wed 4:00 PM</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-slate-400 text-xs">🏆</span>
              <span className="font-medium">AWS Cloud Practitioner</span>
              <span className="text-slate-400">· Nov 22</span>
            </div>
          </div>
        </div>

        {/* Badges earned */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Badges earned
          </h2>

          {/* Medals row from screenshot */}
          <div className="flex items-center gap-2 text-xl mb-3">
            <span title="Top Solver">🏅</span>
            <span title="Code Master">💻</span>
            <span title="Cloud Deployer">☁️</span>
            <span title="AI Engineer">🤖</span>
            <span title="Streak Keeper">🔥</span>
          </div>

          <p className="text-[10px] text-slate-500">
            Latest: <span className="font-semibold text-slate-700">Cloud Deployer</span> - deployed first app on cloud
          </p>
        </div>
      </div>
    </div>
  );
}
