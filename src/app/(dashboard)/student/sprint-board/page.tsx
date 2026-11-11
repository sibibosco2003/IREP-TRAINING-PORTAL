'use client';

import React, { useState } from 'react';
import { SPRINT_TASKS } from '@/lib/mock-data';
import { SprintTask } from '@/types';
import {
  KanbanSquare,
  AlertTriangle,
  Users2,
  CheckCircle2,
  Clock,
  Sparkles,
  GitPullRequest,
  Check,
  Plus,
  PlayCircle,
} from 'lucide-react';

export default function SprintBoardPage() {
  const [tasks, setTasks] = useState<SprintTask[]>(SPRINT_TASKS);
  const [showStandupModal, setShowStandupModal] = useState(false);

  const columns: Array<{ id: SprintTask['status']; title: string }> = [
    { id: 'todo', title: 'To Do' },
    { id: 'in_progress', title: 'In Progress' },
    { id: 'code_review', title: 'Code Review' },
    { id: 'done', title: 'Done' },
  ];

  const moveTask = (taskId: string, newStatus: SprintTask['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div className="space-y-5">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Sprint 2 of 3
            </span>
            <span className="text-slate-500 font-medium">
              Clinic Appointment System · Client: Trainer Arun K · Ends Week 8
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
            Company Simulation · Team Phoenix
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Client Change Request Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Change request: SMS reminders</span>
          </div>

          <button
            onClick={() => setShowStandupModal(true)}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5"
          >
            <Users2 className="w-3.5 h-3.5" />
            <span>Daily stand-up</span>
          </button>
        </div>
      </div>

      {/* 4 Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              className="bg-slate-100/80 rounded-xl p-3 border border-slate-200 flex flex-col min-h-[480px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {col.title}
                </span>
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards */}
              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition group relative"
                  >
                    {/* Tags row */}
                    <div className="flex items-center justify-between text-[10px] mb-2">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold ${
                          task.isAiFeature
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {task.tag}
                      </span>
                      <span className="font-semibold text-slate-500">
                        {task.storyPoints} pts
                      </span>
                    </div>

                    {/* Task Title */}
                    <p className="text-xs font-semibold text-slate-900 leading-snug mb-3">
                      {task.title}
                    </p>

                    {/* Assignee & PR */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center">
                          {task.assignee.initials}
                        </div>
                        <span className="text-slate-600 text-[11px] font-medium truncate max-w-[80px]">
                          {task.assignee.name}
                        </span>
                      </div>

                      {task.prNumber && (
                        <span className="flex items-center gap-0.5 text-blue-600 font-mono text-[10px] bg-blue-50 px-1.5 py-0.5 rounded">
                          <GitPullRequest className="w-3 h-3" />
                          {task.prNumber}
                        </span>
                      )}
                    </div>

                    {/* Move controls for demo */}
                    <div className="hidden group-hover:flex items-center gap-1 mt-2 pt-2 border-t border-slate-100">
                      {col.id !== 'todo' && (
                        <button
                          onClick={() => {
                            const prev = col.id === 'done' ? 'code_review' : col.id === 'code_review' ? 'in_progress' : 'todo';
                            moveTask(task.id, prev);
                          }}
                          className="text-[10px] text-slate-500 hover:text-slate-900 bg-slate-50 px-1.5 py-0.5 rounded"
                        >
                          ← Move
                        </button>
                      )}
                      {col.id !== 'done' && (
                        <button
                          onClick={() => {
                            const nxt = col.id === 'todo' ? 'in_progress' : col.id === 'in_progress' ? 'code_review' : 'done';
                            moveTask(task.id, nxt);
                          }}
                          className="text-[10px] text-blue-600 hover:text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded font-semibold ml-auto"
                        >
                          Advance →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Metrics Footer (Screen 6 Mockup) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs text-slate-500 font-medium">Sprint progress</span>
          <div className="text-2xl font-black text-slate-900 mt-1">58%</div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '58%' }}></div>
          </div>
        </div>

        <div>
          <span className="text-xs text-slate-500 font-medium">Story points</span>
          <div className="text-2xl font-black text-slate-900 mt-1">21 / 36</div>
          <p className="text-[11px] text-slate-500 mt-1">Velocity last sprint: 30</p>
        </div>

        <div>
          <span className="text-xs text-slate-500 font-medium">Build status</span>
          <div className="flex items-center gap-1.5 text-emerald-600 font-black text-2xl mt-1">
            <Check className="w-5 h-5 stroke-[3]" />
            <span>Passing</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Deployed to staging 2 hrs ago</p>
        </div>
      </div>

      {/* Daily Stand-up Modal */}
      {showStandupModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Team Phoenix · Daily Stand-up</h3>
              <button onClick={() => setShowStandupModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-bold text-slate-800">Priya R (You):</p>
                <p className="text-slate-600 mt-1">• Completed role-based auth and JWT refresh handling.</p>
                <p className="text-slate-600">• Today: Connecting LLM API for symptom triage feature.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-bold text-slate-800">Karthik S:</p>
                <p className="text-slate-600 mt-1">• Worked on PR #39 booking unit test coverage.</p>
                <p className="text-slate-600">• Blocked: Need SMS gateway API keys for CR-04.</p>
              </div>
            </div>
            <button
              onClick={() => setShowStandupModal(false)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
            >
              Close Stand-up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

