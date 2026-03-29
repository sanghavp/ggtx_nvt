'use client';

import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import ConfirmModal from './ConfirmModal';
import 'react-quill-new/dist/quill.snow.css';
import styles from './NewsForm.module.css';

// Dynamic import ReactQuill to avoid 'document is not defined' error in SSR
const ReactQuill = dynamic(
  () => import('react-quill-new'),
  { ssr: false, loading: () => <div className={styles.loadingEditor}>Đang tải trình soạn thảo...</div> }
);

interface NewsFormProps {
  initialData?: any;
}

export default function NewsForm({ initialData }: NewsFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title || '');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || '');
  const [isPublished, setIsPublished] = useState(initialData?.isPublished || false);
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt
      ? new Date(initialData.publishedAt).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Track form changes để cảnh báo khi rời trang
  const markDirty = useCallback(() => setIsDirty(true), []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video'],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          ['clean'],
        ],
        handlers: {
          // You could override image handler here if you want Quill to upload directly to our API instead of base64
          // But for simplicity, default Quill handles base64. We will leave default for now.
        },
      },
    }),
    []
  );

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setError('');
      
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      setThumbnail(data.url);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải ảnh lên');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Vui lòng nhập Tên bài viết và Nội dung');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      const url = isEditing ? `/api/admin/news/${initialData.id}` : '/api/admin/news';
      const method = isEditing ? 'PUT' : 'POST';

      const body = {
        title,
        summary,
        content,
        thumbnail,
        isPublished,
        publishedAt: isPublished ? new Date(publishedAt).toISOString() : null,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error('Đã có lỗi xảy ra khi lưu bài viết');
      }

      router.push('/admin/news');
      router.refresh(); // Refresh lại danh sách
    } catch (err: any) {
      setError(err.message || 'Thất bại');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError('');
      const res = await fetch(`/api/admin/news/${initialData.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Không thể xóa bài viết');
      setIsDirty(false); // Ngăn trigger cảnh báo chưa lưu
      router.push('/admin/news');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Lỗi khi xóa bài viết');
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>{isEditing ? 'Sửa bài viết' : 'Thêm bài viết mới'}</h1>
      </header>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        
        {/* Cột chính: Nội dung */}
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <div className={styles.formGroup}>
              <label>Tiêu đề bài viết <span className={styles.required}>*</span></label>
              <input
                type="text"
                value={title}
                onChange={(e) => { setTitle(e.target.value); markDirty(); }}
                placeholder="Nhập tiêu đề..."
                className={styles.input}
                maxLength={255}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Mô tả ngắn</label>
              <textarea
                value={summary}
                onChange={(e) => { setSummary(e.target.value); markDirty(); }}
                placeholder="Tóm tắt nội dung bài viết..."
                className={styles.textarea}
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Nội dung <span className={styles.required}>*</span></label>
              <div className={styles.editorWrapper}>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={(val: string) => { setContent(val); markDirty(); }}
                  modules={modules}
                  className={styles.quillEditor}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cột bên phải: Cài đặt */}
        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Trạng thái</h3>
            
            <div className={styles.toggleGroup}>
              <label className={styles.toggleLabel}>
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className={styles.checkbox}
                />
                Xuất bản công khai
              </label>
            </div>

            {isPublished && (
              <div className={styles.formGroup}>
                <label>Ngày xuất bản</label>
                <input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className={styles.input}
                  suppressHydrationWarning
                />
              </div>
            )}
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Ảnh đại diện (Thumbnail)</h3>
            
            {thumbnail && (
              <div className={styles.thumbnailPreview}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumbnail} alt="Thumbnail preview" className={styles.thumbImage} />
                <button 
                  type="button" 
                  onClick={() => setThumbnail('')}
                  className={styles.removeThumbBtn}
                >
                  Xóa ảnh
                </button>
              </div>
            )}

            {!thumbnail && (
              <div className={styles.uploadBox} onClick={() => fileInputRef.current?.click()}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <span className={styles.uploadIcon}>🖼️</span>
                <p className={styles.uploadText}>{uploadingImage ? 'Đang tải lên...' : 'Bấm để chọn ảnh đại diện'}</p>
                <p className={styles.uploadHint}>PNG, JPG tối đa 5MB. Tỷ lệ 16:9 đẹp nhất.</p>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            {isEditing && (
              <>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className={styles.deleteBtn}
                  disabled={isSubmitting || uploadingImage || isDeleting}
                >
                  Xóa bài
                </button>
                <div style={{ flex: 1 }}></div>
              </>
            )}
            <button
              type="button"
              onClick={() => {
                if (isDirty && !confirm('Bạn có thay đổi chưa lưu. Chắc chắn muốn thoát?')) return;
                router.back();
              }}
              className={styles.cancelBtn}
            >
              ← Quay lại
            </button>
            <button
              type="submit"
              disabled={isSubmitting || uploadingImage || isDeleting}
              className={styles.submitBtn}
            >
              {isSubmitting ? 'Đang lưu...' : '💾 Lưu bài viết'}
            </button>
          </div>
        </div>
      </form>

      {isEditing && (
        <ConfirmModal
          isOpen={showDeleteModal}
          title="Xóa Bài Viết"
          message={`Bạn có chắc chắn muốn xóa bài viết "${title || 'này'}" không? Hành động này không thể hoàn tác.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
