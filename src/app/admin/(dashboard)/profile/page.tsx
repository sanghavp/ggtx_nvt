import { Metadata } from 'next';
import ChangePasswordForm from '@/components/admin/ChangePasswordForm';

export const metadata: Metadata = {
  title: 'Hồ sơ tài khoản | Admin',
};

export default function ProfilePage() {
  return (
    <div>
      <ChangePasswordForm />
    </div>
  );
}
