import { useEffect } from 'react';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
            disabled={isLoading}
          >
            Hủy
          </button>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xóa...' : 'Xóa'}
          </button>
        </div>
      </div>
    </div>
  );
}
