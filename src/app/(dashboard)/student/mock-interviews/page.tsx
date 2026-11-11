'use client';

import React, { useState } from 'react';
import { MOCK_INTERVIEW_RECORDS } from '@/lib/mock-data';
import {
  Users2,
  Calendar,
  Clock,
  Play,
  TrendingUp,
  Award,
  CheckCircle,
  Video,
  FileCheck,
} from 'lucide-react';

export default function MockInterviewsPage() {
  const [selectedInterview, setSelectedInterview] = useState(MOCK_INTERVIEW_RECORDS[0]);
  const [bookedSlots, setBookedSlots] = useState<Record<string, boolean>>({});

  const bookSlot = (slotKey: string) => {
    setBookedSlots((prev) => ({ ...prev, [slotKey]: true }));
  };

  const rubric = selectedInterview.rubric;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">
          Mock Interviews & Feedback
        </h1>
        <p className="text-xs text-slate-500">
          Industry-pattern mock rounds with rubric scoring, video recordings & trainer feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Interview Scorecard & Feedback (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Recent Mock Card (Screen 7 Mockup) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Mock Interview #{selectedInterview.roundNumber} - Technical
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedInterview.date} · Interviewer: {selectedInterview.interviewer}
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-baseline gap-1 justify-end">
                  <span className="text-2xl font-black text-slate-900">{selectedInterview.overallScore}</span>
                  <span className="text-xs text-slate-400">/ 5</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Hire-ready for service roles
                </span>
              </div>
            </div>

            {/* Rubric Breakdown */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Rubric Evaluation
              </span>

              <div className="space-y-2.5">
                {[
                  { label: 'Problem solving', score: rubric.problemSolving },
                  { label: 'Coding & correctness', score: rubric.codingCorrectness },
                  { label: 'Thinking aloud', score: rubric.thinkingAloud },
                  { label: 'Core CS knowledge', score: rubric.coreCs },
                  { label: 'Project explanation', score: rubric.projectExplanation },
                  { label: 'Communication & confidence', score: rubric.communication },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((pill) => (
                          <div
                            key={pill}
                            className={`w-4 h-2 rounded-sm ${
                              pill <= item.score ? 'bg-blue-600' : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-slate-900 w-6 text-right">
                        {item.score}/5
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trainer Written Feedback */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-900">Trainer feedback</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                "{selectedInterview.trainerFeedback}"
              </p>
            </div>
          </div>

          {/* Video Recording Area */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
              Session Recording
            </span>
            <div className="relative rounded-lg overflow-hidden bg-slate-900 aspect-video flex flex-col items-center justify-center text-white">
              <button
                onClick={() => alert('Playing recorded mock interview with timestamped feedback overlay...')}
                className="w-14 h-14 rounded-full bg-blue-600/90 hover:bg-blue-600 flex items-center justify-center transition shadow-lg"
              >
                <Play className="w-6 h-6 fill-white text-white ml-1" />
              </button>
              <p className="text-xs text-slate-300 mt-3 font-medium">
                Watch your interview with timestamped trainer comments
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Progress Across Interviews & Book Next Slot (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Progress Chart Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-1">
              Progress across interviews
            </h2>
            <p className="text-xs text-slate-500 mb-4">Tracking improvement towards product-company tier</p>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Round #1</span>
                <p className="text-lg font-black text-slate-700">3.0</p>
              </div>
              <div className="text-blue-500 font-bold">→</div>
              <div className="text-center">
                <span className="text-[10px] text-blue-600 uppercase font-bold">Round #2</span>
                <p className="text-lg font-black text-blue-600">3.8</p>
              </div>
              <div className="text-emerald-500 font-bold">→</div>
              <div className="text-center">
                <span className="text-[10px] text-emerald-600 uppercase font-bold">Target</span>
                <p className="text-lg font-black text-emerald-600">4.2</p>
              </div>
            </div>
          </div>

          {/* Book Next Slot Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
            <h2 className="text-sm font-bold text-slate-900">Book next slot</h2>
            <p className="text-xs text-slate-500">Pick an open time with our industry trainers</p>

            <div className="space-y-2.5">
              {[
                { key: 'slot-1', date: 'Wed, Oct 15', time: '4:00 PM', type: 'Technical' },
                { key: 'slot-2', date: 'Sat, Oct 18', time: '10:30 AM', type: 'HR round' },
                { key: 'slot-3', date: 'Sat, Oct 18', time: '12:00 PM', type: 'AI-allowed coding' },
              ].map((slot) => {
                const isBooked = bookedSlots[slot.key];
                return (
                  <div
                    key={slot.key}
                    className="p-3 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-800">{slot.type}</p>
                      <p className="text-[11px] text-slate-500">
                        {slot.date} · {slot.time}
                      </p>
                    </div>

                    <button
                      onClick={() => bookSlot(slot.key)}
                      disabled={isBooked}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        isBooked
                          ? 'bg-emerald-100 text-emerald-800 cursor-default'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      }`}
                    >
                      {isBooked ? 'Booked ✓' : 'Book'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

