'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './ChangePasswordForm.module.css';
import { signOut } from 'next-auth/react';

export default function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!oldPassword) {
      newErrors.oldPassword = 'Vui lòng nhập mật khẩu hiện tại';
    }

    if (!newPassword) {
      newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/admin/profile/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra khi đổi mật khẩu');
      }

      toast.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
      
      // Clear form form data
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Redirect to login naturally using signOut
      setTimeout(() => {
        signOut({ callbackUrl: "/admin/login" });
      }, 1500);
      
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Hồ sơ tài khoản</h1>
        <p className={styles.subtitle}>Quản lý thông tin bảo mật và mật khẩu của bạn.</p>
      </header>

      <section className={styles.section}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="oldPassword">Mật khẩu hiện tại</label>
            <input
              id="oldPassword"
              type="password"
              className={`${styles.input} ${errors.oldPassword ? styles.error : ''}`}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Nhập mật khẩu hiện tại"
            />
            {errors.oldPassword && <span className={styles.errorText}>{errors.oldPassword}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Mật khẩu mới</label>
            <input
              id="newPassword"
              type="password"
              className={`${styles.input} ${errors.newPassword ? styles.error : ''}`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Ít nhất 6 ký tự"
            />
            {errors.newPassword && <span className={styles.errorText}>{errors.newPassword}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
            <input
              id="confirmPassword"
              type="password"
              className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu mới"
            />
            {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
          </div>

          <div className={styles.actions}>
            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
