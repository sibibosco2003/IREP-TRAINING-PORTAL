'use client';

import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share2,
  Hand,
  PhoneOff,
  Users,
  MessageSquare,
  HelpCircle,
  BarChart2,
  CheckCircle2,
  Disc,
  Clock,
  Send,
  ThumbsUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export function LiveClassroomComponent({ isTrainer = false }: { isTrainer?: boolean }) {
  const router = useRouter();
  const { user } = useAuth();
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [activeTab, setActiveTab] = useState<'poll' | 'qa' | 'chat'>('poll');
  const [attendanceMinutes, setAttendanceMinutes] = useState(38);
  const [pollVoted, setPollVoted] = useState<number | null>(1); // 1 = "Say it doesn't know"

  const [qaQuestions, setQaQuestions] = useState([
    {
      id: 'q1',
      author: 'Vikram R',
      upvotes: 9,
      text: 'How do we choose top_k for RAG context?',
      status: 'Answered live at 31:40',
    },
    {
      id: 'q2',
      author: 'Sneha N',
      upvotes: 5,
      text: 'Can we use our own college notes for the RAG mini-lab?',
      status: 'Open',
    },
    {
      id: 'q3',
      author: 'Ananya P',
      upvotes: 2,
      text: 'Is chunk size related to accuracy in vector embeddings?',
      status: 'Open',
    },
  ]);

  const [newQuestion, setNewQuestion] = useState('');

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setQaQuestions([
      ...qaQuestions,
      {
        id: `q-${Date.now()}`,
        author: user?.fullName || 'Priya R',
        upvotes: 1,
        text: newQuestion,
        status: 'Open',
      },
    ]);
    setNewQuestion('');
  };

  return (
    <div className="bg-slate-950 text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col min-h-[740px]">
      {/* Top Session Bar (Screen 13 Mockup) */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs md:text-sm text-white">
                IREP Live · Future Skills: LLM APIs & RAG
              </span>
              <span className="text-[10px] bg-red-600 px-2 py-0.2 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                <Disc className="w-3 h-3 animate-spin" /> REC
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              AI & DS · Sem 5 · Week 6 · Lead Trainer: Arun Kumar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="font-mono text-slate-300 font-bold bg-slate-800 px-2.5 py-1 rounded">
            00:38:12 / 01:00:00
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded font-semibold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Attendance on track</span>
          </div>
        </div>
      </div>

      {/* Main Stage Grid: Presentation Stage + Interactive Sidebar */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
        {/* Left Video / Screen Sharing Stage (8 or 9 cols) */}
        <div className="lg:col-span-8 p-4 flex flex-col justify-between bg-slate-950 border-r border-slate-800">
          {/* Virtual Lab Screen Stream Surface */}
          <div className="flex-1 bg-[#0a0f1d] rounded-xl border border-slate-800 p-4 flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/80">
              <span className="font-mono text-blue-400 text-xs flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" />
                Arun K is sharing screen · rag_demo.ipynb
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Shared via Virtual Labs
              </span>
            </div>

            {/* Simulated Live Code & Diagram Content */}
            <div className="my-auto py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-700/60 font-mono text-xs text-blue-100 space-y-2">
                <p className="text-slate-400"># Step 3: Retrieve relevant notes</p>
                <p className="text-emerald-400">chunks = vector_db.search(q, top_k=3)</p>
                <p className="text-purple-300">context = "\n".join(c.text for c in chunks)</p>
                <p className="text-amber-300">prompt = f"Answer using only context:\n{'{context}'}"</p>
              </div>

              {/* RAG Flow Diagram */}
              <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-700/60 flex flex-col justify-center space-y-2 text-xs">
                <span className="font-bold text-slate-300 text-center uppercase text-[10px] tracking-wider mb-1">
                  RAG Execution Pipeline
                </span>
                <div className="p-1.5 bg-blue-900/40 border border-blue-600 rounded text-center font-bold text-blue-200">
                  1. Question Embedding
                </div>
                <div className="text-center text-slate-500 text-[10px]">↓</div>
                <div className="p-1.5 bg-indigo-900/40 border border-indigo-600 rounded text-center font-bold text-indigo-200">
                  2. Cosine Search Vector DB
                </div>
                <div className="text-center text-slate-500 text-[10px]">↓</div>
                <div className="p-1.5 bg-emerald-900/40 border border-emerald-600 rounded text-center font-bold text-emerald-200">
                  3. Context Injection to LLM
                </div>
              </div>
            </div>

            {/* Bottom Participant Camera Strip */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800">
              <div className="flex-shrink-0 w-24 h-16 bg-slate-800 rounded-lg border border-blue-500 relative flex flex-col items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  AK
                </div>
                <span className="text-[9px] text-white absolute bottom-1 left-1 truncate font-semibold">
                  Arun K (Trainer)
                </span>
              </div>

              <div className="flex-shrink-0 w-24 h-16 bg-slate-800 rounded-lg border border-slate-700 relative flex flex-col items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  PR
                </div>
                <span className="text-[9px] text-white absolute bottom-1 left-1 truncate font-semibold">
                  Priya R (You)
                </span>
              </div>

              <div className="flex-shrink-0 w-24 h-16 bg-slate-800 rounded-lg border border-slate-700 relative flex flex-col items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                  SN
                </div>
                <span className="text-[9px] text-white absolute bottom-1 left-1 truncate font-semibold">
                  Sneha N
                </span>
              </div>

              <div className="flex-shrink-0 w-24 h-16 bg-slate-800 rounded-lg border border-slate-700 relative flex flex-col items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                  VR
                </div>
                <span className="text-[9px] text-white absolute bottom-1 left-1 truncate font-semibold">
                  Vikram R
                </span>
              </div>

              <div className="flex-shrink-0 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-slate-400">
                + 36 more students
              </div>
            </div>
          </div>

          {/* Classroom Audio/Video Controls Bar */}
          <div className="mt-3 flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-2.5 rounded-full transition ${
                  micOn ? 'bg-slate-700 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`p-2.5 rounded-full transition ${
                  videoOn ? 'bg-slate-700 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {videoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setHandRaised(!handRaised)}
                className={`px-3 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 transition ${
                  handRaised ? 'bg-amber-500 text-black' : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                <Hand className="w-3.5 h-3.5" />
                <span>{handRaised ? 'Hand Raised' : 'Raise Hand'}</span>
              </button>
            </div>

            <button
              onClick={() => router.push(isTrainer ? '/trainer' : '/student')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              <span>Leave Session</span>
            </button>
          </div>
        </div>

        {/* Right Interactive Sidebar: Polls, Q&A, Attendance (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 p-4 flex flex-col justify-between space-y-4">
          <div>
            {/* Tab switchers */}
            <div className="flex items-center gap-1 pb-2 border-b border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('poll')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                  activeTab === 'poll'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Live Poll</span>
              </button>

              <button
                onClick={() => setActiveTab('qa')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                  activeTab === 'qa'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Q&A ({qaQuestions.length})</span>
              </button>
            </div>

            {/* Poll Tab View (Screen 13 Mockup) */}
            {activeTab === 'poll' && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Question from Trainer:</span>
                  <span className="text-[10px] text-blue-400 bg-blue-950 px-2 py-0.5 rounded">
                    31 votes cast
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-medium">
                  "If the required answer is not present in the notes, the RAG model should..."
                </p>

                <div className="space-y-2">
                  {[
                    { text: 'Make up an answer', pct: 6 },
                    { text: "Say it doesn't know", pct: 87 },
                    { text: 'Search the public web', pct: 7 },
                  ].map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPollVoted(idx)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition relative overflow-hidden ${
                        pollVoted === idx
                          ? 'border-blue-500 bg-blue-900/30 text-white font-bold'
                          : 'border-slate-800 bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-blue-600/20"
                        style={{ width: `${opt.pct}%` }}
                      ></div>
                      <div className="relative flex justify-between items-center">
                        <span>{opt.text}</span>
                        <span className="font-bold">{opt.pct}%</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q&A Tab View */}
            {activeTab === 'qa' && (
              <div className="mt-3 space-y-3">
                <div className="space-y-2 max-h-[360px] overflow-y-auto">
                  {qaQuestions.map((q) => (
                    <div key={q.id} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-300">{q.author}</span>
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950 px-1.5 py-0.5 rounded">
                          <ThumbsUp className="w-2.5 h-2.5" /> ▲ {q.upvotes}
                        </span>
                      </div>
                      <p className="text-slate-200">{q.text}</p>
                      {q.status !== 'Open' && (
                        <p className="text-[10px] text-emerald-400 font-semibold">{q.status}</p>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAskQuestion} className="flex gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-white border border-slate-700 focus:outline-none"
                  />
                  <button type="submit" className="px-3 py-1.5 bg-blue-600 rounded-lg text-xs font-bold">
                    Ask
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Auto Attendance Tracking Box (75% rule from Portal.pdf) */}
          <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Auto Attendance</span>
              <span className="text-[10px] text-emerald-400 font-bold">75% Rule Enforced</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Joined 10:58 AM · Present {attendanceMinutes} of 60 min so far.
            </p>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{ width: `${(attendanceMinutes / 60) * 100}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-400">
              Marked present automatically at 45 min stay. Feeds directly into parent progress report.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
