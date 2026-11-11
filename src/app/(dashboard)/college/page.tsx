'use client';

import React from 'react';
import { COLLEGE_DASHBOARD_DATA } from '@/lib/mock-data';
import {
  Building2,
  Users2,
  CheckCircle2,
  Award,
  Briefcase,
  FileDown,
  Calendar,
  TrendingUp,
  FileText,
} from 'lucide-react';

export default function CollegeDashboardPage() {
  const data = COLLEGE_DASHBOARD_DATA;

  const downloadReport = (title: string) => {
    alert(`Downloading signed MoU Document: "${title}" (Official Format).`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Demo Engineering College
          </span>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-0.5">
            College & Placement Cell Overview
          </h1>
          <p className="text-xs text-slate-500">
            IREP Institutional MoU Performance & Readiness Tracking · Semesters 2 to 7
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadReport('IREP Consolidated MoU Audit')}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Export MoU Dossier</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Students enrolled</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {data.enrolledStudents}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Sem 2 to 7 · 4 branches</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Average attendance</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {data.averageAttendance}%
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Above 85% target</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Certifications earned</span>
          <div className="text-2xl font-black text-blue-600 mt-1">
            {data.certificationsEarned}
          </div>
          <p className="text-[11px] text-blue-600 font-medium mt-1">▲ 41 this semester</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Internships secured</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {data.internshipsSecured}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Sem 7 batch: 64%</p>
        </div>
      </div>

      {/* Middle Row: Placement Readiness Distribution & Branch Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Placement Readiness Donut Representation (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">Placement readiness</h2>
              <span className="text-xs text-slate-500">All semesters</span>
            </div>

            {/* Donut representation */}
            <div className="my-4 flex items-center justify-center">
              <div className="relative w-40 h-40 rounded-full border-8 border-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-black text-slate-900">612</span>
                  <span className="text-[11px] text-slate-500 block uppercase font-bold">Students</span>
                </div>
              </div>
            </div>

            {/* Legend Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-900 font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  Placement Ready
                </span>
                <span>{data.readinessDistribution.placementReady}%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 text-amber-900 font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Nearly Ready
                </span>
                <span>{data.readinessDistribution.nearlyReady}%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 text-red-900 font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  Needs Support
                </span>
                <span>{data.readinessDistribution.needsSupport}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Branch-Wise Readiness Table (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">Branch-wise readiness</h2>
              <span className="text-xs text-slate-500">Semester 2-7 Cohorts</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-y border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Branch</th>
                    <th className="py-2.5 px-3">Students</th>
                    <th className="py-2.5 px-3">Attendance</th>
                    <th className="py-2.5 px-3">Avg score</th>
                    <th className="py-2.5 px-3 text-right">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.branches.map((b) => (
                    <tr key={b.name} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-slate-900">{b.name}</td>
                      <td className="py-3 px-3 text-slate-600">{b.students}</td>
                      <td className="py-3 px-3 text-slate-600">{b.attendance}%</td>
                      <td className="py-3 px-3 font-bold text-slate-800">{b.avgScore}</td>
                      <td className="py-3 px-3 text-right font-bold text-emerald-600">
                        {b.trend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Upcoming Events & Downloadable MoU Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Institutional Events */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-3">Upcoming events</h2>
          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="font-bold text-slate-800">Mock Drive 1 · Sem 7</span>
              <span className="text-slate-500 font-mono">Oct 25</span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="font-bold text-slate-800">Project Demo Day</span>
              <span className="text-slate-500 font-mono">Nov 8</span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="font-bold text-slate-800">Parent review meeting</span>
              <span className="text-slate-500 font-mono">Nov 15</span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="font-bold text-slate-800">Guest session: GCC leaders</span>
              <span className="text-slate-500 font-mono">Nov 22</span>
            </div>
          </div>
        </div>

        {/* Downloadable MoU Reports */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-3">MoU reports</h2>
          <div className="space-y-2.5 text-xs">
            {data.mouReports.map((report) => (
              <div
                key={report.title}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-red-600" />
                  <div>
                    <p className="font-bold text-slate-900">{report.title}</p>
                    <p className="text-[11px] text-slate-500">{report.date} · {report.size}</p>
                  </div>
                </div>

                <button
                  onClick={() => downloadReport(report.title)}
                  className="px-2.5 py-1 bg-white border border-slate-200 text-blue-600 font-bold rounded hover:bg-blue-50 text-[11px] flex items-center gap-1 shadow-sm"
                >
                  <FileDown className="w-3 h-3" />
                  <span>PDF</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

