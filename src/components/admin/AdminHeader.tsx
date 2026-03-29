import { auth } from "@/auth";
import MobileMenuToggle from "./MobileMenuToggle";
import styles from "./AdminHeader.module.css";

export default async function AdminHeader() {
  const session = await auth();

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <MobileMenuToggle />
        <div className={styles.welcome}>
          <h2>Chào mừng, {session?.user?.name || "Admin"}! 👋</h2>
          <p className={styles.date}>{new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </div>
      <div className={styles.userProfile}>
        <div className={styles.avatar}>
          {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "A"}
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{session?.user?.name || "Admin"}</span>
          <span className={styles.userRole}>{(session?.user as any)?.role || "ADMIN"}</span>
        </div>
      </div>
    </header>
  );
}
