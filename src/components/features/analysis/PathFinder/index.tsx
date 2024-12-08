'use client';

import React from 'react';
import styles from './styles.module.css';
import { PathFinderSearch } from './PathFinderSearch';
import { PathFinderTrends } from './PathFinderTrends';
import { PathFinderControls } from './PathFinderControls';
import { PathFinderSummary } from './PathFinderSummary';
import { PathFinderCompetition } from './PathFinderCompetition';
import { PathFinderIncludeWords } from './PathFinderIncludeWords';
import { PathFinderKeywordList } from './PathFinderKeywordList';
import { PathFinderSearchIntent } from './PathFinderSearchIntent';
import { PathFinderSearchFeatures } from './PathFinderSearchFeatures';

export function PathFinder() {
  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <PathFinderSearch />
        <PathFinderControls />
      </div>
      
      <div className={styles.mainSection}>
        <div className={styles.leftPanel}>
          <PathFinderTrends />
          <PathFinderSummary />
          <PathFinderCompetition />
        </div>
        
        <div className={styles.rightPanel}>
          <PathFinderIncludeWords />
          <PathFinderKeywordList />
          <PathFinderSearchIntent />
          <PathFinderSearchFeatures />
        </div>
      </div>
    </div>
  );
}
