'use client';

import React, { useState } from 'react';
import {
  Users2,
  Building2,
  MessagesSquare,
  Shield,
  Send,
  Languages,
  CheckCircle2,
  AlertTriangle,
  Megaphone,
  ExternalLink,
  Trash2,
  Check,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TrainerMessageHubPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'All' | 'Parents' | 'College' | 'Groups'>('Parents');
  const [translationActive, setTranslationActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const [moderationQueue, setModerationQueue] = useState([
    { id: 'mod-1', channel: 'Reported in DSA Daily', issue: 'Possible test answer shared' },
    { id: 'mod-2', channel: 'Reported in GD group', issue: 'Off-topic spam link' },
  ]);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'Mr. Ramesh K (Parent)',
      role: 'parent',
      time: '9:12 AM',
      text: 'Vanakkam sir, Priya says communication score is 3/5. How can we help at home?',
      tamilText: 'வணக்கம் ஐயா, பிரியா தனது தகவல் தொடர்பு மதிப்பெண் 3/5 என்று கூறுகிறார். வீட்டில் நாங்கள் எவ்வாறு உதவலாம்?',
    },
    {
      id: 'm2',
      sender: 'Arun Kumar (You)',
      role: 'trainer',
      time: '9:18 AM',
      text: 'Vanakkam! Priya is doing very well in coding and her ML project. For communication, please ask her to explain her project to you for 5 minutes, 3 times a week, in English.',
      tamilText: 'வணக்கம்! கோடிங் மற்றும் ML திட்டத்தில் பிரியா சிறப்பாக செயல்படுகிறார். தகவல் தொடர்புக்கு, வாரத்திற்கு 3 முறை 5 நிமிடங்கள் ஆங்கிலத்தில் திட்டத்தை விளக்குமாறு கூறவும்.',
    },
    {
      id: 'm3',
      sender: 'Arun Kumar (You)',
      role: 'trainer',
      time: '9:20 AM',
      text: 'We also run a free parent workshop on Nov 15. You are welcome to join.',
      tamilText: 'நவம்பர் 15 அன்று இலவச பெற்றோர் பயிலரங்கம் நடத்துகிறோம். நீங்கள் கலந்துகொள்ளலாம்.',
    },
    {
      id: 'm4',
      sender: 'Mr. Ramesh K (Parent)',
      role: 'parent',
      time: '11:30 AM',
      text: 'Thank you, we will encourage her. We will attend the workshop.',
      tamilText: 'மிக்க நன்றி, நாங்கள் அவரை ஊக்குவிப்போம். பயிலரங்கிலும் கலந்துகொள்வோம்.',
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages([
      ...messages,
      {
        id: `m-${Date.now()}`,
        sender: 'Arun Kumar (You)',
        role: 'trainer',
        time: 'Just now',
        text: inputText,
        tamilText: inputText,
      },
    ]);
    setInputText('');
  };

  const handleResolveMod = (id: string) => {
    setModerationQueue((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">
          Trainer Message Hub
        </h1>
        <p className="text-xs text-slate-500">
          Direct communication with parents and college coordinators with live Tamil/English translation.
        </p>
      </div>

      {/* 3-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[640px]">
        {/* Left: Message Inboxes (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 pb-2 border-b border-slate-100 text-xs mb-3">
              {(['All', 'Parents', 'College', 'Groups'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-1.5">
              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Mr. Ramesh K</span>
                  <span className="text-[10px] text-slate-400">11:30 AM</span>
                </div>
                <p className="text-[11px] text-slate-600 truncate mt-0.5">
                  Parent of Priya R · Sem 5 AI & DS
                </p>
                <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-block">
                  Prefers Tamil
                </span>
              </div>

              <div className="p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Dr. Kavitha</span>
                  <span className="text-[10px] text-slate-400">9:40 AM</span>
                </div>
                <p className="text-[11px] text-slate-600 truncate mt-0.5">
                  College Coordinator · Sem 4 report review
                </p>
              </div>

              <div className="p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Mrs. Lakshmi S</span>
                  <span className="text-[10px] text-slate-400">10:00 AM</span>
                </div>
                <p className="text-[11px] text-slate-600 truncate mt-0.5">
                  Parent · Karthik S · CSE-B
                </p>
              </div>

              <div className="p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Placement Cell</span>
                  <span className="text-[10px] text-slate-400">Yesterday</span>
                </div>
                <p className="text-[11px] text-slate-600 truncate mt-0.5">
                  Mock Drive 1 Venue Confirmed
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowBroadcastModal(true)}
            className="w-full mt-3 py-2 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>New Broadcast Announcement</span>
          </button>
        </div>

        {/* Center: Active Chat Thread with Translation (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden">
          {/* Chat Header */}
          <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Mr. Ramesh K</h2>
              <p className="text-[11px] text-slate-500">
                Parent of Priya R · Sem 5 AI & DS · Prefers Tamil
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push('/parent')}
                className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
              >
                <span>View progress card</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Translation Toggle Bar */}
          <div className="px-3.5 py-1.5 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between text-xs text-blue-900">
            <span className="flex items-center gap-1.5 font-medium">
              <Languages className="w-3.5 h-3.5 text-blue-600" />
              <span>Auto-translate: {translationActive ? 'Tamil (தமிழ்)' : 'English'}</span>
            </span>
            <button
              onClick={() => setTranslationActive(!translationActive)}
              className="px-2 py-0.5 bg-white border border-blue-200 rounded text-[11px] font-bold text-blue-700 hover:bg-blue-50"
            >
              Toggle {translationActive ? 'English' : 'தமிழ்'}
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m) => {
              const isTrainer = m.role === 'trainer';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isTrainer ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-slate-400 mb-0.5 px-1">{m.time}</span>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      isTrainer
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-100 text-slate-900 rounded-tl-none border border-slate-200'
                    }`}
                  >
                    <p>{translationActive ? m.tamilText : m.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Composer */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message... (Auto-translates for parent)"
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Who can message whom & Moderation Queue (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Permission Matrix Widget (Screen 12 Mockup) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-2.5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Who can message whom
            </h2>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Student ⇄ Student 1-1</span>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  Off (Enforced)
                </span>
              </div>
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Student groups</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Moderated
                </span>
              </div>
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Trainer ⇄ Parent</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  1-1 Active
                </span>
              </div>
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Trainer ⇄ College</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  1-1 Active
                </span>
              </div>
              <div className="py-1.5 flex items-center justify-between">
                <span className="text-slate-600">Announcements</span>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                  Broadcast
                </span>
              </div>
            </div>
          </div>

          {/* Moderation Queue Widget */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Moderation queue
              </h2>
              <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded-full font-bold">
                {moderationQueue.length}
              </span>
            </div>

            {moderationQueue.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-2">Queue is clear! 🎉</p>
            ) : (
              <div className="space-y-2 text-xs">
                {moderationQueue.map((m) => (
                  <div key={m.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="font-bold text-red-700 text-[11px]">{m.channel}</p>
                    <p className="text-slate-600 text-xs mt-0.5">{m.issue}</p>
                    <div className="flex items-center gap-2 mt-2 pt-1.5 border-t border-slate-200">
                      <button
                        onClick={() => handleResolveMod(m.id)}
                        className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => handleResolveMod(m.id)}
                        className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] font-bold hover:bg-slate-300"
                      >
                        Keep
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Broadcast Announcement Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">New Broadcast Announcement</h3>
              <button onClick={() => setShowBroadcastModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>All Batches & Parents</option>
                  <option>Students Only (AI & DS Sem 5)</option>
                  <option>Parents Only</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title</label>
                <input type="text" placeholder="e.g. Schedule for Saturday Track Project Lab" className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Message</label>
                <textarea rows={4} placeholder="Announcement details..." className="w-full p-2 border rounded-lg" />
              </div>
            </div>
            <button
              onClick={() => {
                alert('Broadcast dispatched to students and parents with SMS notifications!');
                setShowBroadcastModal(false);
              }}
              className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
            >
              Send Broadcast
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

