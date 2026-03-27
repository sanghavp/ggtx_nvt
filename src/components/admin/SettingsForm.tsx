'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SettingsForm.module.css';

interface SettingsFormProps {
  initialData: Record<string, string>;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();
  
  // States cho Hero Section
  const [heroTitle, setHeroTitle] = useState(initialData['hero_title'] || '');
  const [heroSubtitle, setHeroSubtitle] = useState(initialData['hero_subtitle'] || '');
  const [heroCtaText, setHeroCtaText] = useState(initialData['hero_cta_text'] || '');
  const [heroCtaLink, setHeroCtaLink] = useState(initialData['hero_cta_link'] || '');

  // States cho Footer
  const [footerAddress, setFooterAddress] = useState(initialData['footer_address'] || '');
  const [footerPhone, setFooterPhone] = useState(initialData['footer_phone'] || '');
  const [footerEmail, setFooterEmail] = useState(initialData['footer_email'] || '');

  // States cho Stats
  const [statStudents, setStatStudents] = useState(initialData['stat_students'] || '');
  const [statTeachers, setStatTeachers] = useState(initialData['stat_teachers'] || '');
  const [statYears, setStatYears] = useState(initialData['stat_years'] || '');
  const [statCourses, setStatCourses] = useState(initialData['stat_courses'] || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const payload = {
        hero_title: heroTitle,
        hero_subtitle: heroSubtitle,
        hero_cta_text: heroCtaText,
        hero_cta_link: heroCtaLink,
        footer_address: footerAddress,
        footer_phone: footerPhone,
        footer_email: footerEmail,
        stat_students: statStudents,
        stat_teachers: statTeachers,
        stat_years: statYears,
        stat_courses: statCourses,
      };

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Cập nhật thất bại');
      
      setMessage({ type: 'success', text: 'Đã lưu cấu hình thành công!' });
      router.refresh();
      
      // Tự tắt thông báo sau 3s
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Có lỗi xảy ra' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Cài Đặt Chung (Trang chủ & Footer)</h1>
        <p className={styles.subtitle}>Thay đổi các thông tin hiển thị cơ bản trên website.</p>
      </header>

      {message.text && (
        <div className={`${styles.alert} ${message.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Banner Chính */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Banner Trang Chủ</h2>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label>Tiêu đề chính (Hero Title)</label>
              <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label>Tiêu đề phụ (Hero Subtitle)</label>
              <input type="text" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label>Chữ Nút bấm (CTA Text)</label>
              <input type="text" value={heroCtaText} onChange={(e) => setHeroCtaText(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label>Link Nút bấm (CTA Link)</label>
              <input type="text" value={heroCtaLink} onChange={(e) => setHeroCtaLink(e.target.value)} className={styles.input} />
            </div>
          </div>
        </section>

        {/* Thông số nổi bật (Stats) */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Thông Số Nổi Bật (Trang chủ)</h2>
          <div className={styles.grid4}>
            <div className={styles.formGroup}>
              <label>Học viên</label>
              <input type="text" value={statStudents} onChange={(e) => setStatStudents(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label>Giảng viên</label>
              <input type="text" value={statTeachers} onChange={(e) => setStatTeachers(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label>Năm hoạt động</label>
              <input type="text" value={statYears} onChange={(e) => setStatYears(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label>Ngành đào tạo</label>
              <input type="text" value={statCourses} onChange={(e) => setStatCourses(e.target.value)} className={styles.input} />
            </div>
          </div>
        </section>

        {/* Thông tin liên hệ Footer */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Thông Tin Liên Hệ (Footer)</h2>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label>Địa chỉ</label>
              <input type="text" value={footerAddress} onChange={(e) => setFooterAddress(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label>Số điện thoại</label>
              <input type="text" value={footerPhone} onChange={(e) => setFooterPhone(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="text" value={footerEmail} onChange={(e) => setFooterEmail(e.target.value)} className={styles.input} />
            </div>
          </div>
        </section>

        <div className={styles.actions}>
          <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
            {isSubmitting ? 'Đang lưu...' : 'Lưu Thay Đổi'}
          </button>
        </div>
      </form>
    </div>
  );
}
