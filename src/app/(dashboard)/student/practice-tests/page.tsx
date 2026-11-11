'use client';

import React, { useState, useEffect } from 'react';
import { PRACTICE_TEST_QUESTIONS } from '@/lib/mock-data';
import {
  Clock,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Send,
  HelpCircle,
  AlertCircle,
  Award,
} from 'lucide-react';

export default function PracticeTestsPage() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({ 0: 1, 1: 1 });
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({ 1: true });
  const [secondsRemaining, setSecondsRemaining] = useState(1122); // 18 mins 42 secs
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining, isSubmitted]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentQ = PRACTICE_TEST_QUESTIONS[currentQIndex] || PRACTICE_TEST_QUESTIONS[0];

  const handleSelectOption = (optIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQIndex]: optIndex }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQIndex]: !prev[currentQIndex],
    }));
  };

  const handleNext = () => {
    if (currentQIndex < 29) {
      setCurrentQIndex((prev) => Math.min(prev + 1, PRACTICE_TEST_QUESTIONS.length - 1));
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Test Title Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Company Pattern Assessment
          </span>
          <h1 className="text-base md:text-lg font-bold text-slate-900 mt-1">
            Practice Test: Service Company Pattern · Aptitude & Reasoning
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded-lg">
            <Clock className="w-4 h-4 text-red-600 animate-pulse" />
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-red-500 block leading-tight">Time Remaining</span>
              <span className="font-mono text-base font-bold leading-tight">{formatTimer(secondsRemaining)}</span>
            </div>
          </div>

          <button
            onClick={() => setIsSubmitted(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Main Grid: Question Content & Question Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Active Question Card (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between min-h-[500px]">
          <div>
            {/* Section & Question numbering */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                  {currentQ.section} · Quantitative
                </span>
                <span className="text-xs text-slate-400">
                  Question {currentQIndex + 1} of 30
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                +1.0 / -0.25 Marks
              </span>
            </div>

            {/* Question Text */}
            <p className="text-sm font-medium text-slate-900 leading-relaxed mb-6">
              {currentQ.question}
            </p>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQIndex] === idx;
                const letter = String.fromCharCode(65 + idx);
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-semibold ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {letter}
                    </div>
                    <span className="text-xs md:text-sm">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={currentQIndex === 0}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMarkForReview}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
                  markedForReview[currentQIndex]
                    ? 'border-amber-500 bg-amber-50 text-amber-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{markedForReview[currentQIndex] ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>

              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 transition shadow-sm"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Question Palette & Section Breakdown (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Question Palette Grid */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Question Palette
            </h2>

            {/* 30 Question Numbers */}
            <div className="grid grid-cols-6 gap-2 mb-4">
              {Array.from({ length: 30 }, (_, i) => {
                const isCurrent = i === currentQIndex;
                const isAnswered = selectedAnswers[i] !== undefined;
                const isMarked = markedForReview[i];

                let btnClass = 'bg-slate-100 text-slate-600 border-slate-200';
                if (isMarked) {
                  btnClass = 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
                } else if (isAnswered) {
                  btnClass = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                }
                if (isCurrent) {
                  btnClass += ' ring-2 ring-blue-600 ring-offset-1';
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentQIndex(Math.min(i, PRACTICE_TEST_QUESTIONS.length - 1))}
                    className={`h-8 rounded-lg text-xs font-medium border transition flex items-center justify-center ${btnClass}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-600"></span>
                <span>Answered (11)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-400"></span>
                <span>Review (2)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border-2 border-blue-600"></span>
                <span>Current</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-200"></span>
                <span>Unvisited (17)</span>
              </div>
            </div>
          </div>

          {/* Section-Wise Progress */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Section Breakdown
            </h2>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-700">Quantitative</span>
                <span className="font-bold text-emerald-700">12 / 15 answered</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-700">Logical reasoning</span>
                <span className="font-medium text-slate-500">0 / 10 answered</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-700">Verbal ability</span>
                <span className="font-medium text-slate-500">0 / 5 answered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission & Scorecard Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Test Submitted Successfully!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Instant topic-wise performance analysis has been recorded to your readiness score.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Score:</span>
                <span className="font-bold text-slate-900">22 / 30 (73.3%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Quantitative (Time & Work):</span>
                <span className="font-bold text-emerald-600">80% Accuracy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Service Company Benchmark:</span>
                <span className="font-bold text-blue-600">Placement Ready Band</span>
              </div>
            </div>

            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Back to Test Overview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

