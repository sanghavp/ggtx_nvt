import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/variables.css";
import "./globals.css";
// Root Layout không chứa các thành phần public để dùng chung cho cả admin

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Trung tâm GDNN-GDTX Nguyễn Văn Tố",
    template: "%s | NVT",
  },
  description:
    "Trung tâm Giáo dục Nghề nghiệp - Giáo dục Thường xuyên Nguyễn Văn Tố. Nơi ươm mầm tri thức - Vững bước tương lai.",
  keywords: [
    "GDNN",
    "GDTX",
    "Nguyễn Văn Tố",
    "giáo dục nghề nghiệp",
    "giáo dục thường xuyên",
    "trung tâm đào tạo",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
