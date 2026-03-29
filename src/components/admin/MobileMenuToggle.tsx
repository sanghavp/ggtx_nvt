'use client';

import { useSidebar } from './SidebarContext';
import styles from './AdminHeader.module.css'; // Re-use header specific styles if needed or inline

export default function MobileMenuToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      className={styles.mobileToggleBtn}
      onClick={toggleSidebar}
      aria-label="Toggle menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        width="24"
        height="24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
  );
}
