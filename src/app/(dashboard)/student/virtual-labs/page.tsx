'use client';

import React, { useState } from 'react';
import { VIRTUAL_LABS } from '@/lib/mock-data';
import {
  Terminal,
  Cpu,
  Cloud,
  Shield,
  Code2,
  Lock,
  Play,
  Square,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function VirtualLabsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All labs');
  const [activeSession, setActiveSession] = useState(true);

  const categories = [
    'All labs',
    'Software Engineering',
    'AI & Data Science',
    'Cybersecurity',
    'Cloud & DevOps',
  ];

  const filteredLabs =
    selectedCategory === 'All labs'
      ? VIRTUAL_LABS
      : VIRTUAL_LABS.filter((lab) => lab.category === selectedCategory);

  const getLabIcon = (id: string) => {
    switch (id) {
      case 'lab-1':
        return <Terminal className="w-5 h-5 text-slate-800" />;
      case 'lab-2':
        return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'lab-3':
        return <Cloud className="w-5 h-5 text-sky-600" />;
      case 'lab-4':
        return <Code2 className="w-5 h-5 text-purple-600" />;
      case 'lab-5':
        return <Shield className="w-5 h-5 text-red-600" />;
      case 'lab-6':
      default:
        return <Code2 className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">Virtual Labs</h1>
        <p className="text-xs text-slate-500">
          One-click isolated cloud sandbox environments. Unlocked automatically by semester & track.
        </p>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Session Notification Strip (Screen 5 Mockup) */}
      {activeSession && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
            <div>
              <p className="text-xs font-bold text-emerald-950 flex items-center gap-2">
                <span>Active session:</span>
                <span className="font-mono text-emerald-800">AI Notebook Lab · rag_notes_demo.ipynb</span>
              </p>
              <p className="text-[11px] text-emerald-700">Running for 38 min · Auto-stops in 22 min to save credits</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Opening interactive GPU notebook instance in separate tab...')}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-sm transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open</span>
            </button>
            <button
              onClick={() => setActiveSession(false)}
              className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-bold rounded-lg flex items-center gap-1 transition"
            >
              <Square className="w-3.5 h-3.5 fill-red-600" />
              <span>Stop</span>
            </button>
          </div>
        </div>
      )}

      {/* Lab Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLabs.map((lab) => {
          const isApprovalNeeded = lab.status === 'Requires Approval';
          return (
            <div
              key={lab.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    {getLabIcon(lab.id)}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isApprovalNeeded
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {lab.status}
                  </span>
                </div>

                <h2 className="text-sm font-bold text-slate-900 mb-1">{lab.title}</h2>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {lab.description}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-slate-600 mb-4">
                  <span className="font-semibold bg-slate-100 px-2 py-0.5 rounded">
                    Sem {lab.eligibleSemester}+
                  </span>
                  {lab.credits && (
                    <span className="text-blue-600 font-medium">Credits: {lab.credits}</span>
                  )}
                </div>
              </div>

              <div>
                {isApprovalNeeded ? (
                  <button
                    disabled
                    className="w-full py-2 bg-slate-100 text-slate-400 rounded-lg text-xs font-bold cursor-not-allowed flex items-center justify-center gap-1.5 border border-slate-200"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Trainer Approval Needed</span>
                  </button>
                ) : (
                  <button
                    onClick={() => alert(`Launching ${lab.title} cloud container...`)}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Launch Environment</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

