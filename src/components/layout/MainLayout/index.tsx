'use client';

import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import styles from './styles.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
