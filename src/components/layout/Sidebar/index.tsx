'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/analysis', label: '분석', icon: '📊' },
    { href: '/keywords', label: '키워드', icon: '🔍' },
    { href: '/reports', label: '리포트', icon: '📑' },
    { href: '/settings', label: '설정', icon: '⚙️' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>퍼널AI</span>
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.menuItem} ${
                    isActive ? styles.menuItemActive : styles.menuItemInactive
                  }`}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
