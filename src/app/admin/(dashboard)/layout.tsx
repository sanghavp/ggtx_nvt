import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import AuthProvider from '@/components/admin/AuthProvider';
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import "@/styles/variables.css";
import "../../globals.css";
import styles from "./layout.module.css";
import { SidebarProvider } from '@/components/admin/SidebarContext';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: "Quản trị NVT",
    template: "%s | Quản trị NVT",
  },
  description: "Trang quản trị hệ thống website NVT",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <div className={styles.adminLayout}>
          <Sidebar />
          <div className={styles.mainContent}>
            <AdminHeader />
            <main className={styles.pageContent}>{children}</main>
          </div>
        </div>
        <Toaster position="top-right" />
      </SidebarProvider>
    </AuthProvider>
  );
}
