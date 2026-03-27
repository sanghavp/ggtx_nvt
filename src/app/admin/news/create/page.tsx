import { Metadata } from 'next';
import NewsForm from '@/components/admin/NewsForm';

export const metadata: Metadata = {
  title: 'Thêm bài viết | Quản lý Tin Tức',
};

export default function CreateNewsPage() {
  return <NewsForm />;
}
