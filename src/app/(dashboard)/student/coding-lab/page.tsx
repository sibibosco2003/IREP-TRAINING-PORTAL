'use client';

import React, { useState } from 'react';
import { CODING_PROBLEM } from '@/lib/mock-data';
import {
  Play,
  Send,
  CheckCircle2,
  Sparkles,
  Bot,
  AlertCircle,
  Clock,
  HardDrive,
  Copy,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

export default function CodingLabPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'javascript'>('python');
  const [code, setCode] = useState(CODING_PROBLEM.starterCode.python);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState(CODING_PROBLEM.testCases);
  const [aiHintsShown, setAiHintsShown] = useState(1);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 600);
  };

  const handleLanguageChange = (lang: 'python' | 'javascript') => {
    setSelectedLanguage(lang);
    setCode(CODING_PROBLEM.starterCode[lang]);
  };

  return (
    <div className="space-y-4">
      {/* Top Header / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Week 6 · Pattern drill
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">3 of 6 solved</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-slate-900 mt-1">
            {CODING_PROBLEM.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAiHintsShown((prev) => Math.min(prev + 1, 3))}
            className="px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-semibold border border-purple-200 flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Ask AI Reviewer (Hints only)</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column IDE Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[640px]">
        {/* Left Column: Problem Statement & Constraints (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between overflow-y-auto max-h-[720px]">
          <div className="space-y-4">
            {/* Tags & Difficulty */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">
                {CODING_PROBLEM.difficulty}
              </span>
              <span className="px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-700">
                {CODING_PROBLEM.category}
              </span>
              <span className="text-[11px] text-slate-400">Asked: Product cos.</span>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Problem Description
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {CODING_PROBLEM.description}
              </p>
            </div>

            {/* Sample Input & Output */}
            <div className="space-y-2">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-500">Sample Input</span>
                <pre className="text-xs font-mono text-slate-800 mt-0.5">
                  {CODING_PROBLEM.sampleInput}
                </pre>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-500">Sample Output</span>
                <pre className="text-xs font-mono text-slate-800 mt-0.5">
                  {CODING_PROBLEM.sampleOutput}
                </pre>
              </div>
            </div>

            {/* Constraints */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                Constraints
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                {CODING_PROBLEM.constraints.map((c, i) => (
                  <li key={i} className="font-mono text-[11px]">{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trainer Note pinned at bottom of problem */}
          <div className="mt-4 p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>Trainer Note</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-normal">
              {CODING_PROBLEM.aiReview.trainerNote}
            </p>
          </div>
        </div>

        {/* Center Column: Code Editor & Test Results (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Editor Container */}
          <div className="bg-slate-900 rounded-xl shadow-md border border-slate-800 flex flex-col flex-1 overflow-hidden">
            {/* Editor Toolbar */}
            <div className="bg-slate-800/90 px-3 py-2 border-b border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-mono text-xs">solution.py</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value as any)}
                  className="bg-slate-700 text-slate-200 rounded px-2 py-0.5 text-[11px] border border-slate-600 focus:outline-none"
                >
                  <option value="python">Python 3.12</option>
                  <option value="javascript">JavaScript (ES2024)</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded font-medium flex items-center gap-1 transition text-xs"
                >
                  <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                  <span>Run</span>
                </button>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold flex items-center gap-1 transition text-xs"
                >
                  <Send className="w-3 h-3" />
                  <span>Submit</span>
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <div className="flex-1 p-3 bg-[#0d1527] font-mono text-xs text-slate-200">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                rows={18}
                className="w-full h-full bg-transparent resize-none border-none outline-none font-mono text-xs leading-relaxed text-blue-100 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Test Case Execution Output Panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
            <div className="flex items-center justify-between text-xs mb-2 pb-1 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">Test results</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full font-bold">
                  18 / 18 hidden tests passed
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> Runtime 42 ms
                </span>
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-slate-400" /> Memory 16.1 MB
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {testResults.map((tc) => (
                <div
                  key={tc.id}
                  className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-200/70 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium text-slate-700 truncate">{tc.name}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold">Passed</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Code Reviewer & Hints Panel (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between overflow-y-auto max-h-[720px]">
          <div className="space-y-4">
            {/* AI Reviewer Header */}
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900">AI Code Reviewer</h2>
                <p className="text-[10px] text-slate-500">Hints & interview prep only</p>
              </div>
            </div>

            {/* AI Habit Tracker Alert */}
            <div className="p-2 bg-purple-50 rounded-lg border border-purple-200 text-[11px] text-purple-900">
              <span className="font-bold">Responsible AI Habit:</span>
              <p className="text-[10px] text-purple-700 mt-0.5">
                AI help used: {aiHintsShown} hint. Full solutions are strictly disabled to build genuine problem-solving readiness.
              </p>
            </div>

            {/* Positive Observation */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                Good observation
              </span>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                {CODING_PROBLEM.aiReview.goodNotes[0]}
              </div>
            </div>

            {/* Improvement / Hints */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                Try next (Hint)
              </span>
              <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-200 text-xs text-slate-700">
                {CODING_PROBLEM.aiReview.improvementHints[0]}
              </div>
            </div>

            {/* Interview Tip */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                Interview tip
              </span>
              <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200 text-xs text-amber-900">
                {CODING_PROBLEM.aiReview.interviewTip}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 text-center">
            IREP Coding Lab · Monaco + AI Review Engine
          </div>
        </div>
      </div>
    </div>
  );
}

