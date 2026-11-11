'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/types';
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  CheckSquare,
  Terminal,
  FolderKanban,
  Mic,
  Bot,
  Award,
  UserCheck,
  Video,
  MessagesSquare,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Building2,
  Calendar,
  FileText,
  ShieldCheck,
  Languages,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, logout, switchRole, language, setLanguage } = useAuth();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Exact Student Nav items from screenshots
  const studentNav: NavItem[] = [
    { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
    { label: 'My Courses', href: '/student#courses', icon: BookOpen },
    { label: 'Coding Lab', href: '/student/coding-lab', icon: Code2 },
    { label: 'Practice Tests', href: '/student/practice-tests', icon: CheckSquare },
    { label: 'Virtual Labs', href: '/student/virtual-labs', icon: Terminal },
    { label: 'Projects', href: '/student/sprint-board', icon: FolderKanban },
    { label: 'Mock Interviews', href: '/student/mock-interviews', icon: Mic },
    { label: 'AI Study Buddy', href: '/student#ai-buddy', icon: Bot },
    { label: 'Certificates', href: '/student#certificates', icon: Award },
    { label: 'Portfolio', href: '/student#portfolio', icon: UserCheck },
    { label: 'Live Sessions', href: '/student/live-sessions', icon: Video },
    { label: 'Discussions', href: '/student/discussions', icon: MessagesSquare },
  ];

  // Exact Trainer Nav items from screenshots
  const trainerNav: NavItem[] = [
    { label: 'Dashboard', href: '/trainer', icon: LayoutDashboard },
    { label: 'Batches', href: '/trainer#batches', icon: Building2 },
    { label: 'Schedule', href: '/trainer#schedule', icon: Calendar },
    { label: 'Attendance', href: '/trainer#attendance', icon: CheckSquare },
    { label: 'Assessments', href: '/student/practice-tests', icon: FileText },
    { label: 'Code Reviews', href: '/student/coding-lab', icon: Code2 },
    { label: 'Mock Interviews', href: '/student/mock-interviews', icon: Mic },
    { label: 'At-Risk Students', href: '/trainer#at-risk', icon: ShieldCheck },
    { label: 'Reports', href: '/college', icon: FileText },
    { label: 'Messages', href: '/trainer/message-hub', icon: MessagesSquare },
    { label: 'Live Classroom', href: '/trainer/live-classroom', icon: Video },
  ];

  // Exact College Nav items from screenshots
  const collegeNav: NavItem[] = [
    { label: 'Overview', href: '/college', icon: LayoutDashboard },
    { label: 'Branches & Batches', href: '/college#branches', icon: Building2 },
    { label: 'Placement Readiness', href: '/college#readiness', icon: Award },
    { label: 'Certifications', href: '/college#certs', icon: Award },
    { label: 'Mock Drives', href: '/student/mock-interviews', icon: Mic },
    { label: 'Timetable', href: '/student/live-sessions', icon: Calendar },
    { label: 'MoU Reports', href: '/college#mou', icon: FileText },
    { label: 'Settings', href: '/college#settings', icon: Building2 },
  ];

  // Exact Parent Nav items from screenshots
  const parentNav: NavItem[] = [
    { label: 'Overview', href: '/parent', icon: LayoutDashboard },
    { label: 'Progress Reports', href: '/parent#progress', icon: FileText },
    { label: 'Attendance', href: '/parent#attendance', icon: CheckSquare },
    { label: 'Projects & Portfolio', href: '/parent#portfolio', icon: FolderKanban },
    { label: 'Certificates', href: '/parent#certs', icon: Award },
    { label: 'Events', href: '/parent#events', icon: Calendar },
    { label: 'Message Trainer', href: '/trainer/message-hub', icon: MessagesSquare },
    { label: 'Feedback Survey', href: '/parent#survey', icon: FileText },
  ];

  const getNavItems = () => {
    switch (role) {
      case 'trainer':
        return trainerNav;
      case 'college':
        return collegeNav;
      case 'parent':
        return parentNav;
      case 'student':
      default:
        return studentNav;
    }
  };

  const navItems = getNavItems();

  const getSubLabel = () => {
    switch (role) {
      case 'student':
        return 'STUDENT · SEM 5 · AI & DS';
      case 'trainer':
        return 'TRAINER · ARUN KUMAR';
      case 'college':
        return 'COLLEGE · PLACEMENT CELL';
      case 'parent':
        return 'PARENT · MR. RAMESH K';
      default:
        return role.toUpperCase();
    }
  };

  const getAvatarInitials = () => {
    switch (role) {
      case 'student':
        return 'PR';
      case 'trainer':
        return 'AK';
      case 'college':
        return 'DC';
      case 'parent':
        return 'RK';
      default:
        return 'PR';
    }
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <div className="min-h-screen flex bg-[#f4f6fa] text-slate-800 font-sans">
      {/* Desktop Sidebar - Exact match to screenshots navy tone #0e1e38 */}
      <aside className="w-56 bg-[#0e1e38] text-white flex-shrink-0 flex-col justify-between hidden md:flex z-30 select-none shadow-md">
        <div>
          {/* Brand header */}
          <div className="p-4 pt-5 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#0284c7] flex items-center justify-center font-bold text-white text-xs shadow-sm">
                IR
              </div>
              <div>
                <h1 className="font-bold text-sm tracking-tight text-white leading-tight">
                  IREP Portal
                </h1>
                <p className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider mt-0.5">
                  {getSubLabel()}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Role Switcher pill bar */}
          <div className="px-3 pb-2">
            <div className="bg-[#142646] rounded-md p-1.5 flex items-center justify-between text-[10px]">
              <span className="text-slate-400 font-medium pl-1">ROLE:</span>
              <div className="flex gap-1">
                {(['student', 'trainer', 'college', 'parent'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => switchRole(r)}
                    className={`px-1.5 py-0.5 rounded uppercase font-bold text-[9px] transition ${
                      role === r
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
                    }`}
                  >
                    {r.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="px-2 py-1 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== `/${role}` && pathname.startsWith(item.href) && !item.href.includes('#'));

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                    isActive
                      ? 'bg-[#1e40af] text-white font-medium shadow-sm'
                      : 'text-slate-300 hover:bg-[#152542] hover:text-white'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info from screenshot */}
        <div className="p-4 text-[10px] text-slate-400/80 border-t border-slate-800/60">
          <p className="leading-tight">Industry-Ready Engineer Program</p>
          <p className="text-[9px] text-slate-500 mt-0.5">B.Tech Semesters 2 to 7</p>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />

          {/* Off-canvas sidebar */}
          <div className="relative w-64 bg-[#0e1e38] text-white flex flex-col justify-between z-10 p-4 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#0284c7] flex items-center justify-center font-bold text-white text-xs shadow-sm">
                    IR
                  </div>
                  <div>
                    <h1 className="font-bold text-sm tracking-tight text-white leading-tight">
                      IREP Portal
                    </h1>
                    <p className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider">
                      {getSubLabel()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Role switcher on mobile */}
              <div className="py-3 border-b border-slate-800">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Select User Role:
                </p>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {(['student', 'trainer', 'college', 'parent'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchRole(r);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`p-1.5 rounded text-left capitalize font-semibold transition ${
                        role === r
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {r === 'student' && '🎓 Student'}
                      {r === 'trainer' && '👨‍🏫 Trainer'}
                      {r === 'college' && '🏛️ College'}
                      {r === 'parent' && '👨‍👩‍👧 Parent'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation links on mobile */}
              <nav className="py-3 space-y-1 overflow-y-auto max-h-[calc(100vh-260px)]">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== `/${role}` && pathname.startsWith(item.href) && !item.href.includes('#'));

                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                        isActive
                          ? 'bg-[#1e40af] text-white font-semibold'
                          : 'text-slate-300 hover:bg-[#152542] hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2 bg-slate-800 hover:bg-red-900/40 text-red-400 hover:text-red-300 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        {/* Top Header Bar */}
        <header className="h-14 bg-white border-b border-slate-200/80 px-3 sm:px-4 md:px-6 flex items-center justify-between flex-shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg transition"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Screen Breadcrumb / Category */}
            <span className="font-bold text-slate-800 text-xs sm:text-sm truncate">
              {role === 'student' && 'Student Portal'}
              {role === 'trainer' && 'Trainer Portal'}
              {role === 'college' && 'College Placement Portal'}
              {role === 'parent' && 'Parent Portal'}
            </span>
          </div>

          {/* Right Header Controls (Search, Bell, Avatar from screenshots) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Box - Rounded Pill from screenshot */}
            <div className="relative w-36 sm:w-56 md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-7 sm:pl-8 pr-2.5 sm:pr-3 py-1.5 text-xs bg-[#f1f5f9] rounded-full border-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 placeholder-slate-400"
              />
            </div>

            {/* Notification Bell with red/orange indicator dot */}
            <button className="relative p-1.5 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
            </button>

            {/* Circular Avatar from screenshots (e.g. PR, AK, DC, RK) */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="w-7 h-7 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs flex items-center justify-center shadow-sm transition"
                title="Switch User / Role"
              >
                {getAvatarInitials()}
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="font-bold text-slate-900">{user?.fullName}</p>
                    <p className="text-[10px] text-slate-500">{user?.email}</p>
                  </div>
                  <div className="px-3 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Test Account:
                  </div>
                  <button
                    onClick={() => {
                      switchRole('student');
                      setIsRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                  >
                    <span>🎓 Student (Priya R)</span>
                    {role === 'student' && <span className="text-blue-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      switchRole('trainer');
                      setIsRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                  >
                    <span>👨‍🏫 Trainer (Arun Kumar)</span>
                    {role === 'trainer' && <span className="text-blue-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      switchRole('college');
                      setIsRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                  >
                    <span>🏛️ College (Dr. Kavitha)</span>
                    {role === 'college' && <span className="text-blue-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      switchRole('parent');
                      setIsRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                  >
                    <span>👨‍👩‍👧 Parent (Ramesh K)</span>
                    {role === 'parent' && <span className="text-blue-600 font-bold">✓</span>}
                  </button>
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content Surface */}
        <main className="flex-1 p-3.5 sm:p-4 md:p-6 bg-[#f4f6fa]">
          {children}
        </main>
      </div>
    </div>
  );
}
