'use client';

import { usePathname } from 'next/navigation';
import styles from './styles.module.css';

const Header = () => {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/analysis':
        return '분석';
      case '/keywords':
        return '키워드';
      case '/reports':
        return '리포트';
      case '/settings':
        return '설정';
      default:
        return '대시보드';
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {getPageTitle(pathname)}
        </h1>
        
        <div className={styles.actions}>
          <button className={styles.notificationButton}>
            🔔
          </button>
          <div className={styles.profileButton}>
            👤
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
