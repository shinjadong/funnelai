'use client';

import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { D3Component } from '@/components/common/D3Component';
import type { Node } from './types';

export function FunnelAI() {
  const chartRef = React.useRef<SVGSVGElement>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedRegion] = useState<string>('KR');
  const [viewMode] = useState<string>('전체');

  const handleNodeClick = (node: Node) => {
    console.log('Node clicked:', node);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (typeof window !== 'undefined') {
      timer = setTimeout(() => {
        setIsFullscreen(false);
      }, 1500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        <D3Component
          chartRef={chartRef}
          data={{
            nodes: [],
            links: []
          }}
          onNodeClick={handleNodeClick}
        />
      </div>
    </div>
  );
}
