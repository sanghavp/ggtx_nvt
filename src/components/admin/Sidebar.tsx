"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSidebar } from "./SidebarContext";
import styles from "./Sidebar.module.css";

const MENU_ITEMS = [
  { name: "Tổng quan", path: "/admin", icon: "📊" },
  { name: "Quản lý Tin tức", path: "/admin/news", icon: "📰" },
  { name: "Cài đặt chung", path: "/admin/settings", icon: "⚙️" },
  { name: "Trang Giới thiệu", path: "/admin/about", icon: "🏢" },
  { name: "Cột mốc Lịch sử", path: "/admin/milestones", icon: "⏳" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <>
      <div 
        className={`${styles.sidebarOverlay} ${isOpen ? styles.open : ""}`} 
        onClick={closeSidebar}
      />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>N</span>
        <span className={styles.logoText}>NVT Admin</span>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {MENU_ITEMS.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`${styles.menuItem} ${
                  pathname === item.path || (item.path !== "/admin" && pathname.startsWith(item.path))
                    ? styles.active
                    : ""
                }`}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <button className={styles.logoutBtn} onClick={() => signOut({ callbackUrl: "/admin/login" })}>
          🚪 Đăng xuất
        </button>
      </div>
    </aside>
    </>
  );
}
