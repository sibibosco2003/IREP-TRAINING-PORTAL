import { UserProfile, StudentStats, SkillProgress, WeekPlanDay, CodingProblem, PracticeTestQuestion, VirtualLab, SprintTask, MockInterviewRecord, DiscussionMessage, LiveSessionInfo } from '@/types';

export const SAMPLE_USERS: Record<string, UserProfile> = {
  student: {
    id: 'user-student-001',
    email: 'student@irep.edu',
    fullName: 'Priya R',
    role: 'student',
    registerNumber: 'REG-2024-AIDS-042',
    collegeId: 'col-001',
    collegeName: 'Demo Engineering College',
    batchId: 'batch-002',
    batchName: 'AI & DS · Sem 5',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    preferredLanguage: 'en',
  },
  trainer: {
    id: 'user-trainer-001',
    email: 'trainer@irep.edu',
    fullName: 'Arun Kumar',
    role: 'trainer',
    collegeId: 'col-001',
    collegeName: 'Demo Engineering College',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    preferredLanguage: 'en',
  },
  college: {
    id: 'user-college-001',
    email: 'college@irep.edu',
    fullName: 'Dr. Kavitha',
    role: 'college',
    collegeId: 'col-001',
    collegeName: 'Demo Engineering College',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    preferredLanguage: 'en',
  },
  parent: {
    id: 'user-parent-001',
    email: 'parent@irep.edu',
    phone: '+91 98765 43210',
    fullName: 'Ramesh K',
    role: 'parent',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    preferredLanguage: 'ta',
  },
};

export const STUDENT_STATS: StudentStats = {
  readinessScore: 74,
  readinessBand: 'Nearly Ready',
  problemsSolved: 286,
  attendanceRate: 92,
  practiceStreak: 19,
  currentProject: {
    title: 'Crop Price Predictor',
    description: 'End-to-end ML pipeline with web deployment',
    progressPercentage: 45,
    tasksOpen: 3,
    dueWeek: 12,
    teamSize: 3,
  },
  upcomingEvents: [
    { id: '1', title: 'Mid-term DSA test', date: 'This Saturday, 10:00 AM', type: 'test' },
    { id: '2', title: 'Mock interview #3 (Technical)', date: 'Wed 4:00 PM', type: 'interview' },
    { id: '3', title: 'AWS Cloud Practitioner Certification', date: 'Nov 22', type: 'certification' },
  ],
  badges: [
    { id: 'b1', title: 'Cloud Deployer', description: 'Deployed first app on cloud', icon: '☁️', dateEarned: 'Oct 2026' },
    { id: 'b2', title: 'DSA Streak 15+', description: 'Solved daily DSA for 19 days', icon: '🔥', dateEarned: 'Nov 2026' },
    { id: 'b3', title: 'Top Peer Helper', description: 'Marked as top helper in discussion', icon: '🏆', dateEarned: 'Nov 2026' },
  ],
};

export const SKILL_PROGRESS: SkillProgress[] = [
  { category: 'DSA patterns', progress: 78 },
  { category: 'Aptitude & reasoning', progress: 71 },
  { category: 'Cloud & DevOps', progress: 64 },
  { category: 'AI & Data Science track', progress: 82 },
  { category: 'Future Skills: AI engineering', progress: 58 },
  { category: 'Communication', progress: 69 },
];

export const WEEK_PLAN: WeekPlanDay[] = [
  { day: 'Mon', title: 'DSA: Pattern drill - Union-Find', duration: '1 hr', type: 'weekday_1hr' },
  { day: 'Tue', title: 'Track: Model evaluation lab', duration: '1 hr', type: 'weekday_1hr' },
  { day: 'Wed', title: 'Aptitude: Data interpretation', duration: '1 hr', type: 'weekday_1hr' },
  { day: 'Thu', title: 'Future Skills: LLM APIs & RAG', duration: '1 hr', type: 'weekday_1hr' },
  { day: 'Fri', title: 'GD + weekly quiz', duration: '1 hr', type: 'weekday_1hr' },
  { day: 'Sat', title: 'Track project kick-off + RAG mini-lab', duration: '3 hrs', type: 'saturday_3hr_lab' },
];

export const CODING_PROBLEM: CodingProblem = {
  id: 'prob-connected-components',
  title: 'Number of Connected Components in an Undirected Graph',
  difficulty: 'Medium',
  category: 'Union-Find',
  tags: ['Graph', 'Disjoint Set Union', 'Breadth-First Search'],
  description: 'You are given n nodes labeled 0 to n - 1 and a list of undirected edges. Return the number of connected components in the graph.',
  inputDescription: 'Input: n = 5, edges = [[0,1],[1,2],[3,4]]',
  outputDescription: 'Output: 2',
  sampleInput: '5\n[[0,1],[1,2],[3,4]]',
  sampleOutput: '2',
  constraints: [
    '1 <= n <= 2000',
    '0 <= edges.length <= 5000',
    'edges[i].length == 2',
    '0 <= a_i, b_i < n',
    'No repeated edges and no self loops',
  ],
  starterCode: {
    python: `def count_components(n: int, edges: list[list[int]]) -> int:
    parent = list(range(n))
    components = n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x]) # Path compression
        return parent[x]

    for a, b in edges:
        ra = find(a)
        rb = find(b)
        if ra != rb:
            parent[ra] = rb
            components -= 1

    return components
`,
    javascript: `function countComponents(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  let components = n;

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  for (const [a, b] of edges) {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      components--;
    }
  }

  return components;
}`,
  },
  testCases: [
    { id: '1', name: 'Sample case 1 (n=5, 2 comps)', status: 'passed', runtime: '38 ms', memory: '16.1 MB' },
    { id: '2', name: 'Sample case 2 (Single line graph)', status: 'passed', runtime: '42 ms', memory: '16.2 MB' },
    { id: '3', name: 'Edge: no edges (isolated nodes)', status: 'passed', runtime: '29 ms', memory: '15.9 MB' },
    { id: '4', name: 'Large graph (n=2000)', status: 'passed', runtime: '65 ms', memory: '18.4 MB' },
  ],
  aiReview: {
    goodNotes: [
      'Path compression in find() is correctly implemented, ensuring nearly O(α(N)) performance.',
      'Memory consumption remains strictly linear O(V + E).',
    ],
    improvementHints: [
      'Try adding union by rank or size to balance trees even further.',
      'Can you explain why it helps achieve near O(1) amortized time complexity?',
    ],
    interviewTip: 'State the complexity aloud: O(E * α(V)) time, O(V) space. Be ready to explain Disjoint Set Union versus DFS.',
    trainerNote: 'Revisit recursion depth for large n. Try an iterative find() if n exceeds 10^5. — Arun K.',
  },
};

export const PRACTICE_TEST_QUESTIONS: PracticeTestQuestion[] = [
  {
    id: 1,
    section: 'Quantitative',
    question: 'A and B together can complete a project in 12 days. A alone can complete it in 20 days. If B works alone for the first 6 days and A joins after that, in how many more days will the project be finished?',
    options: ['6 days', '7.5 days', '8 days', '9 days'],
    selectedOption: 1,
    isMarkedForReview: false,
  },
  {
    id: 2,
    section: 'Quantitative',
    question: 'A train 180 meters long is running at a speed of 54 km/hr. How much time will it take to cross a platform 270 meters long?',
    options: ['25 seconds', '30 seconds', '32 seconds', '35 seconds'],
    selectedOption: 1,
    isMarkedForReview: true,
  },
  {
    id: 3,
    section: 'Logical',
    question: 'If "P + Q" means P is the father of Q, and "P * Q" means P is the sister of Q, which of the following shows that M is the aunt of N?',
    options: ['M * R + N', 'N + R * M', 'M + R * N', 'R * M + N'],
    selectedOption: 0,
    isMarkedForReview: false,
  },
];

export const VIRTUAL_LABS: VirtualLab[] = [
  {
    id: 'lab-1',
    title: 'Linux Sandbox',
    description: 'Full Ubuntu terminal for shell commands, scripting and file permissions practice.',
    category: 'Software Engineering',
    eligibleSemester: 2,
    status: 'Ready',
    credits: 'Unlimited',
  },
  {
    id: 'lab-2',
    title: 'Docker & Kubernetes Lab',
    description: 'Build images, run containers and deploy to a practice 3-node cluster.',
    category: 'Cloud & DevOps',
    eligibleSemester: 5,
    status: 'Ready',
  },
  {
    id: 'lab-3',
    title: 'Cloud Sandbox (GCP / AWS)',
    description: 'Education-tier cloud account to launch VMs, managed buckets and deploy container apps.',
    category: 'Cloud & DevOps',
    eligibleSemester: 5,
    status: 'Ready',
    credits: '68% left',
  },
  {
    id: 'lab-4',
    title: 'AI Notebook Lab (GPU)',
    description: 'Jupyter environment with high-performance compute for ML, deep learning and RAG systems.',
    category: 'AI & Data Science',
    eligibleSemester: 5,
    status: 'Ready',
    activeSession: {
      filename: 'rag_notes_demo.ipynb',
      runningDuration: '38 min',
    },
  },
  {
    id: 'lab-5',
    title: 'Cyber Range',
    description: 'Isolated private network with vulnerable targets for legal ethical hacking & security audits.',
    category: 'Cybersecurity',
    eligibleSemester: 6,
    status: 'Requires Approval',
  },
  {
    id: 'lab-6',
    title: 'Full-Stack Web Workspace',
    description: 'Browser IDE with Node, Java, Python and PostgreSQL pre-configured with hot reloading.',
    category: 'Software Engineering',
    eligibleSemester: 3,
    status: 'Ready',
  },
];

export const SPRINT_TASKS: SprintTask[] = [
  {
    id: 't-1',
    title: 'SMS reminder for appointments (CR-04)',
    status: 'todo',
    storyPoints: 5,
    assignee: { name: 'Karthik S', avatar: '', initials: 'KS' },
    tag: 'Feature',
  },
  {
    id: 't-2',
    title: 'Doctor availability calendar',
    status: 'todo',
    storyPoints: 3,
    assignee: { name: 'Priya R', avatar: '', initials: 'PR' },
    tag: 'Feature',
  },
  {
    id: 't-3',
    title: 'Accessibility review & WCAG audit',
    status: 'todo',
    storyPoints: 2,
    assignee: { name: 'Ananya P', avatar: '', initials: 'AN' },
    tag: 'QA',
  },
  {
    id: 't-4',
    title: 'AI symptom triage (LLM API Integration)',
    status: 'in_progress',
    storyPoints: 8,
    assignee: { name: 'Priya R', avatar: '', initials: 'PR' },
    tag: 'AI Feature',
    isAiFeature: true,
  },
  {
    id: 't-5',
    title: 'Patient medical history API',
    status: 'in_progress',
    storyPoints: 5,
    assignee: { name: 'Rahul V', avatar: '', initials: 'RV' },
    tag: 'Backend',
  },
  {
    id: 't-6',
    title: 'JWT refresh token & cookie auth',
    status: 'code_review',
    storyPoints: 3,
    assignee: { name: 'Rahul V', avatar: '', initials: 'RV' },
    tag: 'Security',
    prNumber: 'PR #41',
  },
  {
    id: 't-7',
    title: 'Unit tests for booking service',
    status: 'code_review',
    storyPoints: 3,
    assignee: { name: 'Karthik S', avatar: '', initials: 'KS' },
    tag: 'Testing',
    prNumber: 'PR #39',
  },
  {
    id: 't-8',
    title: 'Role-based login & user auth',
    status: 'done',
    storyPoints: 5,
    assignee: { name: 'Priya R', avatar: '', initials: 'PR' },
    tag: 'Done',
  },
  {
    id: 't-9',
    title: 'Appointment CRUD operations',
    status: 'done',
    storyPoints: 5,
    assignee: { name: 'Priya R', avatar: '', initials: 'PR' },
    tag: 'Done',
  },
  {
    id: 't-10',
    title: 'CI/CD pipeline with GitHub Actions',
    status: 'done',
    storyPoints: 3,
    assignee: { name: 'Rahul V', avatar: '', initials: 'RV' },
    tag: 'DevOps',
  },
];

export const MOCK_INTERVIEW_RECORDS: MockInterviewRecord[] = [
  {
    id: 'mock-02',
    roundNumber: 2,
    type: 'Technical (DSA & ML)',
    date: 'Oct 8 · 40 min',
    interviewer: 'Arun K (Lead Technical Trainer)',
    overallScore: 3.8,
    verdict: 'Hire-ready for service roles · Improve for product roles',
    rubric: {
      problemSolving: 4,
      codingCorrectness: 4,
      thinkingAloud: 3,
      coreCs: 4,
      projectExplanation: 4,
      communication: 3,
    },
    trainerFeedback: 'Strong on DSA and explained the ML project clearly. Pause less before speaking, and articulate your time/space complexity before typing code. Revise OS memory management.',
  },
];

export const TRAINER_DASHBOARD_DATA = {
  activeBatches: 5,
  todayAttendance: 91,
  pendingCodeReviews: 17,
  atRiskStudents: 12,
  batchScores: [
    { name: 'CSE-A', score: 82 },
    { name: 'CSE-B', score: 76 },
    { name: 'IT-A', score: 71 },
    { name: 'AI&DS', score: 79 },
    { name: 'Cyber', score: 88 },
  ],
  todaySchedule: [
    { time: '9:00 AM', batch: 'CSE-A · Sem 5', session: 'System design basics', status: 'Done' },
    { time: '11:00 AM', batch: 'AI&DS · Sem 5', session: 'LLM APIs & RAG architectures', status: 'Next' },
    { time: '2:00 PM', batch: 'IT-A · Sem 4', session: 'SQL window functions', status: 'Later' },
    { time: '3:30 PM', batch: 'Cyber · Sem 5', session: 'OWASP lab: XSS prevention', status: 'Later' },
  ],
  atRiskList: [
    { student: 'Karthik S', batch: 'CSE-B', score: 52, issue: 'Attendance 71%', action: 'Parent call' },
    { student: 'Divya M', batch: 'IT-A', score: 56, issue: 'DSA tests falling behind', action: 'Extra Saturday lab' },
    { student: 'Rahul V', batch: 'Cyber', score: 58, issue: 'Project task delay', action: 'Assign mentor' },
  ],
};

export const COLLEGE_DASHBOARD_DATA = {
  enrolledStudents: 612,
  averageAttendance: 89,
  certificationsEarned: 184,
  internshipsSecured: 73,
  readinessDistribution: {
    placementReady: 48,
    nearlyReady: 36,
    needsSupport: 16,
  },
  branches: [
    { name: 'Computer Science (CSE)', students: 228, attendance: 91, avgScore: 78, trend: '+5' },
    { name: 'Information Tech (IT)', students: 164, attendance: 88, avgScore: 73, trend: '+3' },
    { name: 'Artificial Intelligence (AI & DS)', students: 142, attendance: 90, avgScore: 77, trend: '+6' },
    { name: 'Cybersecurity', students: 78, attendance: 86, avgScore: 70, trend: '+2' },
  ],
  mouReports: [
    { title: 'September 2026 Monthly Progress Report', date: 'Oct 1', format: 'PDF', size: '2.4 MB' },
    { title: 'Semester 4 Consolidated Performance Report', date: 'Sep 15', format: 'PDF', size: '4.1 MB' },
    { title: 'Placement Readiness & Certification Analysis', date: 'Aug 30', format: 'PDF', size: '1.8 MB' },
  ],
};

export const PARENT_VIEW_DATA = {
  wardName: 'Priya R',
  wardBatch: 'Sem 5 · AI & DS',
  readinessScore: 74,
  attendance: 92,
  certifications: 1,
  problemsSolved: 286,
  monthlyComparison: [
    { area: 'Coding (problems solved)', sep: '252', oct: '286', status: 'On track' },
    { area: 'Aptitude test score', sep: '64%', oct: '71%', status: 'Improving' },
    { area: 'Semester Project', sep: 'Planning', oct: '45% built', status: 'On track' },
    { area: 'Spoken Communication', sep: '3 / 5', oct: '3.5 / 5', status: 'Needs practice' },
  ],
  helpAtHomeGuidance: 'Encourage 10 minutes of spoken English practice daily and ask Priya to explain her ML project to you at home in her own words.',
  upcomingEvents: [
    { title: 'Project Demo Day', date: 'Sat, Nov 8 · 10:00 AM', status: 'You are invited', rsvp: true },
    { title: 'Parent-Trainer Review Meeting', date: 'Nov 15', status: 'Scheduled' },
  ],
  portfolioLinks: [
    { title: 'GitHub Portfolio (5 projects)', url: 'https://github.com/demo-priya' },
    { title: 'Live App: Crop Price Predictor', url: 'https://crop-price.demo-irep.edu' },
    { title: 'Demo Video: Sem 4 Project', url: 'https://demo-irep.edu/videos/sem4' },
  ],
};

export const DISCUSSION_MESSAGES: DiscussionMessage[] = [
  {
    id: 'msg-1',
    senderName: 'Sneha N',
    senderRole: 'Student',
    senderInitials: 'SN',
    time: '10:42 AM',
    content: 'My cross-validation score is 0.97 on the crop dataset. Feels too good. Did I do something wrong?',
    codeSnippet: 'scores = cross_val_score(model, X, y, cv=5)\nprint(scores.mean()) # 0.9712',
  },
  {
    id: 'msg-2',
    senderName: 'Vikram R',
    senderRole: 'Student (Top Helper)',
    senderInitials: 'VR',
    time: '10:48 AM',
    content: 'Did you scale the whole dataset before splitting? That leaks test data into training.',
  },
  {
    id: 'msg-3',
    senderName: 'Arun Kumar',
    senderRole: 'Lead Trainer',
    senderInitials: 'AK',
    time: '10:51 AM',
    content: 'Good catch Vikram! Sneha, put the scaler inside a Pipeline so it fits only on each training fold. We will cover data leakage in Saturday lab.',
    isAnswer: true,
  },
];

export const LIVE_SESSIONS_LIST: LiveSessionInfo[] = [
  {
    id: 'sess-1',
    title: 'Future Skills: LLM APIs & RAG Architectures',
    trainer: 'Arun Kumar',
    time: '11:00 AM - 12:00 PM',
    date: 'Today, Oct 9',
    type: 'Live',
    status: 'Starting Soon',
  },
  {
    id: 'sess-2',
    title: 'DSA: Union-Find Drill & Disjoint Set Optimization',
    trainer: 'Arun Kumar',
    time: '9:00 - 10:00 AM',
    date: 'Mon, Oct 6',
    type: 'Live',
    status: 'Attended',
    recordingAvailable: true,
    recordingDuration: '58 min',
  },
  {
    id: 'sess-3',
    title: 'Track: Model Evaluation & Hyperparameter Tuning',
    trainer: 'Arun Kumar',
    time: '9:00 - 10:00 AM',
    date: 'Tue, Oct 7',
    type: 'Live',
    status: 'Attended',
    recordingAvailable: true,
    recordingDuration: '1 hr 02 min',
  },
  {
    id: 'sess-4',
    title: 'Aptitude: Data Interpretation & Venn Diagrams',
    trainer: 'Meena E',
    time: '9:00 - 10:00 AM',
    date: 'Wed, Oct 8',
    type: 'Live',
    status: 'Missed',
    recordingAvailable: true,
    recordingDuration: '54 min',
  },
  {
    id: 'sess-5',
    title: 'Track project + RAG mini-lab (Hands-on)',
    trainer: 'Arun Kumar',
    time: '10:00 AM - 1:00 PM',
    date: 'Sat, Oct 11',
    type: 'In-lab / Hybrid',
    status: 'Scheduled',
  },
];

