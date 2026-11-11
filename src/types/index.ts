export type UserRole = 'student' | 'trainer' | 'college' | 'parent' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  collegeId?: string;
  collegeName?: string;
  registerNumber?: string;
  batchId?: string;
  batchName?: string;
  preferredLanguage?: 'en' | 'ta';
}

export interface StudentStats {
  readinessScore: number;
  readinessBand: 'Placement Ready' | 'Nearly Ready' | 'Needs Support';
  problemsSolved: number;
  attendanceRate: number;
  practiceStreak: number;
  currentProject: {
    title: string;
    description: string;
    progressPercentage: number;
    tasksOpen: number;
    dueWeek: number;
    teamSize: number;
  };
  upcomingEvents: Array<{
    id: string;
    title: string;
    date: string;
    type: 'test' | 'interview' | 'certification';
  }>;
  badges: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    dateEarned: string;
  }>;
}

export interface SkillProgress {
  category: string;
  progress: number;
  target?: number;
}

export interface WeekPlanDay {
  day: string;
  title: string;
  duration: string;
  type: 'weekday_1hr' | 'saturday_3hr_lab';
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
  description: string;
  inputDescription: string;
  outputDescription: string;
  sampleInput: string;
  sampleOutput: string;
  constraints: string[];
  starterCode: Record<string, string>;
  testCases: Array<{
    id: string;
    name: string;
    status: 'passed' | 'failed';
    runtime?: string;
    memory?: string;
  }>;
  aiReview: {
    goodNotes: string[];
    improvementHints: string[];
    interviewTip: string;
    trainerNote: string;
  };
}

export interface PracticeTestQuestion {
  id: number;
  question: string;
  options: string[];
  selectedOption?: number;
  isMarkedForReview?: boolean;
  section: 'Quantitative' | 'Logical' | 'Verbal';
}

export interface VirtualLab {
  id: string;
  title: string;
  description: string;
  category: 'Software Engineering' | 'AI & Data Science' | 'Cybersecurity' | 'Cloud & DevOps';
  eligibleSemester: number;
  status: 'Ready' | 'Requires Approval' | 'Locked';
  credits?: string;
  activeSession?: {
    filename: string;
    runningDuration: string;
  };
}

export interface SprintTask {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'code_review' | 'done';
  storyPoints: number;
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  };
  tag: string;
  prNumber?: string;
  isAiFeature?: boolean;
}

export interface MockInterviewRecord {
  id: string;
  roundNumber: number;
  type: string;
  date: string;
  interviewer: string;
  overallScore: number;
  verdict: string;
  rubric: {
    problemSolving: number;
    codingCorrectness: number;
    thinkingAloud: number;
    coreCs: number;
    projectExplanation: number;
    communication: number;
  };
  trainerFeedback: string;
  recordingUrl?: string;
}

export interface DiscussionMessage {
  id: string;
  senderName: string;
  senderRole: string;
  senderInitials: string;
  time: string;
  content: string;
  codeSnippet?: string;
  isAnswer?: boolean;
  isPinned?: boolean;
}

export interface LiveSessionInfo {
  id: string;
  title: string;
  trainer: string;
  time: string;
  date: string;
  type: 'Live' | 'In-lab / Hybrid';
  status: 'Starting Soon' | 'Live' | 'Attended' | 'Missed' | 'Scheduled';
  recordingAvailable?: boolean;
  recordingDuration?: string;
}

