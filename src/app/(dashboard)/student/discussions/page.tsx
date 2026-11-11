'use client';

import React, { useState } from 'react';
import { DISCUSSION_MESSAGES } from '@/lib/mock-data';
import { DiscussionMessage } from '@/types';
import {
  ShieldAlert,
  Send,
  Code,
  Paperclip,
  CheckCircle2,
  ThumbsUp,
  Award,
  Users,
  Clock,
  Pin,
  Flag,
} from 'lucide-react';

export default function DiscussionGroupsPage() {
  const [messages, setMessages] = useState<DiscussionMessage[]>(DISCUSSION_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [activeChannel, setActiveChannel] = useState('Track Doubts · ML');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: DiscussionMessage = {
      id: `msg-${Date.now()}`,
      senderName: 'Priya R (You)',
      senderRole: 'Student',
      senderInitials: 'PR',
      time: 'Just now',
      content: inputText,
    };

    setMessages([...messages, newMsg]);
    setInputText('');
  };

  return (
    <div className="space-y-4">
      {/* Safety Policy Banner (Screen 11 Requirement) */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5 text-xs text-amber-900 shadow-sm">
        <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
        <p className="text-[11px] leading-relaxed">
          <span className="font-bold">Safe learning space:</span> Students chat in moderated groups only. One-to-one messaging between students is turned off. All groups are moderated by faculty & trainers.
        </p>
      </div>

      {/* 3-Column Discussion Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[620px]">
        {/* Left: Channels List (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">
              My Groups & Channels
            </span>

            {[
              { name: 'AI & DS · Sem 5 Batch', unread: 3 },
              { name: 'Track Doubts · ML', unread: 0 },
              { name: 'DSA Daily Problem', unread: 5 },
              { name: 'Team: Crop Price Predictor', unread: 2 },
              { name: 'Placement Updates', unread: 1, announcement: true },
              { name: 'GD & Communication', unread: 0 },
            ].map((ch) => (
              <button
                key={ch.name}
                onClick={() => setActiveChannel(ch.name)}
                className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold flex items-center justify-between transition ${
                  activeChannel === ch.name
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{ch.name}</span>
                {ch.unread > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      activeChannel === ch.name
                        ? 'bg-white text-blue-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {ch.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] text-slate-500">
            Announcement groups are read-only for students.
          </div>
        </div>

        {/* Center: Active Chat Thread (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden">
          {/* Thread Header */}
          <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">{activeChannel}</h2>
              <p className="text-[11px] text-slate-500">
                42 members · Moderated by Arun K & Meena E
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>18 online</span>
            </div>
          </div>

          {/* Pinned Message */}
          <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-2 text-[11px] text-slate-600">
            <Pin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span className="truncate">
              Pinned: Post code as snippets, never share answers to graded tests. Be respectful.
            </span>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div key={m.id} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {m.senderInitials}
                  </div>
                  <span className="text-xs font-bold text-slate-900">{m.senderName}</span>
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                  {m.isAnswer && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Marked as answer
                    </span>
                  )}
                </div>

                <div className="pl-8 text-xs text-slate-700 leading-relaxed">
                  <p>{m.content}</p>

                  {m.codeSnippet && (
                    <pre className="mt-2 p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto">
                      {m.codeSnippet}
                    </pre>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Composer */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask a doubt or reply to discussion..."
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />
              <button
                type="button"
                onClick={() => setInputText((prev) => prev + '\n```python\n# write code here\n```')}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition"
                title="Add code snippet"
              >
                <Code className="w-4 h-4" />
              </button>
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

        {/* Right: Group Info & Top Helpers (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Group Stats */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Group info</h2>
            <div className="space-y-2 text-xs text-slate-600">
              <p className="flex items-center justify-between">
                <span>Students:</span>
                <span className="font-bold text-slate-900">42 enrolled</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Moderators:</span>
                <span className="font-bold text-slate-900">2 trainers</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Doubts answered:</span>
                <span className="font-bold text-emerald-600">128 solved</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Avg trainer reply:</span>
                <span className="font-bold text-blue-600">35 min</span>
              </p>
            </div>
          </div>

          {/* Top Helpers Recognition */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Top helpers</h2>
              <span className="text-[10px] text-slate-400 font-medium">This month</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="font-bold text-slate-800">🥇 Vikram R</span>
                <span className="font-semibold text-blue-600">24 answers</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="font-bold text-slate-800">🥈 Ananya P</span>
                <span className="font-semibold text-blue-600">19 answers</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="font-bold text-slate-800">🥉 Sneha N</span>
                <span className="font-semibold text-blue-600">15 answers</span>
              </div>
            </div>
          </div>

          {/* Safety Reporting Pill */}
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Flag className="w-3.5 h-3.5 text-red-600" />
              <span>Safety & Moderation</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Report any inappropriate message with one tap. Chats are logged according to college institutional policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

