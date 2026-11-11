'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/types';
import { GraduationCap, Users, BookOpen, Building2, Lock, Mail, Phone, Languages, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login, loginWithOtp, isLoading, language, setLanguage } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [emailOrRegister, setEmailOrRegister] = useState('student@irep.edu');
  const [password, setPassword] = useState('password123');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'student') setEmailOrRegister('student@irep.edu');
    else if (role === 'trainer') setEmailOrRegister('trainer@irep.edu');
    else if (role === 'college') setEmailOrRegister('college@irep.edu');
    else if (role === 'parent') setPhoneNumber('+91 98765 43210');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'parent') {
      if (!otpSent) {
        setOtpSent(true);
        setOtp('123456');
        return;
      }
      await loginWithOtp(phoneNumber, otp);
    } else {
      await login(emailOrRegister, selectedRole);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 font-sans">
      {/* Left Deep Blue Hero Section (Exact match to screenshot 1) */}
      <div className="md:col-span-6 bg-[#0f2b5c] p-10 md:p-14 text-white flex flex-col justify-between select-none">
        <div>
          <div className="flex items-center gap-2.5 mb-12">
            <div className="w-8 h-8 rounded-lg bg-[#0284c7] flex items-center justify-center font-bold text-white text-sm shadow">
              IR
            </div>
            <span className="font-bold text-base tracking-wide text-white">IREP Portal</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
            One portal for students, trainers, colleges and parents
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed mb-12 max-w-md">
            Practice, labs, tests, projects, mock interviews and progress reports for the Industry-Ready Engineer Program, all in one place.
          </p>

          {/* 3 Metrics Row from screenshot */}
          <div className="grid grid-cols-3 gap-6 pt-6">
            <div>
              <p className="text-3xl font-black text-white">576</p>
              <p className="text-xs text-slate-300 mt-0.5">training hours</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">6</p>
              <p className="text-xs text-slate-300 mt-0.5">real-time projects</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">4</p>
              <p className="text-xs text-slate-300 mt-0.5">role-based views</p>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-slate-400">
          Industry-Ready Engineer Program · B.Tech Semesters 2 to 7
        </div>
      </div>

      {/* Right Soft Peach / Warm Canvas Section (Exact match to screenshot 1) */}
      <div className="md:col-span-6 bg-[#faeceb] p-6 md:p-12 flex items-center justify-center">
        {/* Floating White Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-[#f3dada]/70">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#b91c1c] tracking-tight">Welcome back</h2>
            <p className="text-xs text-slate-500 mt-0.5">Choose how you are signing in</p>
          </div>

          {/* 2x2 Role Selector Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition ${
                selectedRole === 'student'
                  ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              <div className="text-lg">🎓</div>
              <span className="text-xs">Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('parent')}
              className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition ${
                selectedRole === 'parent'
                  ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              <div className="text-lg">👨‍👩‍👧</div>
              <span className="text-xs">Parent</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('trainer')}
              className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition ${
                selectedRole === 'trainer'
                  ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              <div className="text-lg">👨‍🏫</div>
              <span className="text-xs">Trainer</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('college')}
              className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition ${
                selectedRole === 'college'
                  ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              <div className="text-lg">🏛️</div>
              <span className="text-xs">College</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {selectedRole === 'parent' ? (
              <>
                <div>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Mobile number"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    required
                  />
                </div>

                {otpSent && (
                  <div>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP (123456)"
                      className="w-full px-3.5 py-2.5 text-xs text-center font-bold tracking-widest border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-sm mt-1"
                >
                  {otpSent ? 'Verify OTP & Enter' : 'Get OTP'}
                </button>
              </>
            ) : (
              <>
                <div>
                  <input
                    type="text"
                    value={emailOrRegister}
                    onChange={(e) => setEmailOrRegister(e.target.value)}
                    placeholder="Register number / email"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-sm mt-1"
                >
                  Sign in
                </button>
              </>
            )}

            {/* Footer link exact match to screenshot */}
            <p className="text-center text-[11px] text-slate-500 pt-3">
              Parents sign in with mobile number + OTP ·{' '}
              <button
                type="button"
                onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
                className="text-blue-600 hover:underline font-medium"
              >
                {language === 'en' ? 'தமிழ்' : 'English'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
