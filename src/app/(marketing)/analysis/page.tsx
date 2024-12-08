'use client';

import { FunnelAI } from '@/components/features/analysis/FunnelAI';
import { PathFinder } from '@/components/features/analysis/PathFinder';

export default function AnalysisPage() {
  return (
    <div className="space-y-8">
      <FunnelAI />
      <PathFinder />
    </div>
  );
}