'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './MilestoneForm.module.css';

interface MilestoneFormProps {
  initialData?: any;
}

export default function MilestoneForm({ initialData }: MilestoneFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [year, setYear] = useState(initialData?.year || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [sortOrder, setSortOrder] = useState(initialData?.sortOrder || 0);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!year || !title) {
      setError('Vui lòng nhập Năm và Tên sự kiện');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      const url = isEditing ? `/api/admin/milestones/${initialData.id}` : '/api/admin/milestones';
      const method = isEditing ? 'PUT' : 'POST';

      const body = {
        year,
        title,
        description,
        sortOrder: Number(sortOrder),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error('Đã có lỗi xảy ra');
      }

      router.push('/admin/milestones');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Thất bại');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa hệ kiện này không?')) return;
    
    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/admin/milestones/${initialData.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Không thể xóa');
      router.push('/admin/milestones');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>{isEditing ? 'Sửa Cột Mốc' : 'Thêm Cột Mốc Mới'}</h1>
      </header>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        <div className={styles.card}>
          <div className={styles.grid2}>
            <div className={styles.formGroup}>
              <label>Năm (hoặc Thời gian) <span className={styles.required}>*</span></label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="VD: 1990 hoặc 2000 - 2005"
                className={styles.input}
                maxLength={50}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Thứ tự hiển thị</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value, 10))}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup} style={{ marginTop: 'var(--sp-4)' }}>
            <label>Tên Sự kiện <span className={styles.required}>*</span></label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Thành lập trung tâm"
              className={styles.input}
              maxLength={255}
              required
            />
          </div>

          <div className={styles.formGroup} style={{ marginTop: 'var(--sp-4)' }}>
            <label>Mô tả chi tiết</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nói thêm về sự kiện này..."
              className={styles.textarea}
              rows={4}
            />
          </div>

          <div className={styles.actions}>
            {isEditing && (
               <button
                 type="button"
                 onClick={handleDelete}
                 className={styles.deleteBtn}
                 disabled={isSubmitting}
               >
                 Xóa
               </button>
            )}
            <div style={{ flex: 1 }}></div>
            <button
              type="button"
              onClick={() => router.back()}
              className={styles.cancelBtn}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? 'Đang lưu...' : 'Lưu lại'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
