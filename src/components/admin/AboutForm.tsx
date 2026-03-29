'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import 'react-quill-new/dist/quill.snow.css';
import styles from './AboutForm.module.css';

const ReactQuill = dynamic(
  () => import('react-quill-new'),
  { ssr: false, loading: () => <div className={styles.loadingEditor}>Đang tải trình soạn thảo...</div> }
);

interface AboutFormProps {
  initialData: Record<string, string>;
}

export default function AboutForm({ initialData }: AboutFormProps) {
  const router = useRouter();
  
  const [aboutHeroTitle, setAboutHeroTitle] = useState(initialData['about_hero_title'] || '');
  const [aboutHeroDescription, setAboutHeroDescription] = useState(initialData['about_hero_description'] || '');
  const [aboutContent, setAboutContent] = useState(initialData['about_content'] || '');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          [{ align: [] }],
          [{ color: [] }],
          ['clean'],
        ],
      },
    }),
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        about_hero_title: aboutHeroTitle,
        about_hero_description: aboutHeroDescription,
        about_content: aboutContent,
      };

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Cập nhật thất bại');
      
      toast.success('Đã lưu cấu hình trang Giới thiệu thành công!');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Cài Đặt Trang Giới Thiệu</h1>
        <p className={styles.subtitle}>Thay đổi nội dung lịch sử và thành tựu của trung tâm.</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Banner Trang Giới Thiệu</h2>
          <div className={styles.formGroup}>
            <label>Tiêu đề Lớn (Hero Title)</label>
            <input type="text" value={aboutHeroTitle} onChange={(e) => setAboutHeroTitle(e.target.value)} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Mô tả ngắn (Hero Description)</label>
            <textarea 
              value={aboutHeroDescription} 
              onChange={(e) => setAboutHeroDescription(e.target.value)} 
              className={styles.textarea}
              rows={3}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Nội Dung Giới Thiệu Chi Tiết</h2>
          <div className={styles.formGroup}>
            <label>Nội dung (Rich Text)</label>
            <div className={styles.editorWrapper}>
              <ReactQuill
                theme="snow"
                value={aboutContent}
                onChange={setAboutContent}
                modules={modules}
                className={styles.quillEditor}
              />
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
