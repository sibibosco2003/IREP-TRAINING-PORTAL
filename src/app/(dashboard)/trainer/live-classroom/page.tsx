'use client';

import React from 'react';
import { LiveClassroomComponent } from '@/components/classroom/live-classroom-view';

export default function TrainerLiveClassroomPage() {
  return <LiveClassroomComponent isTrainer={true} />;
}

