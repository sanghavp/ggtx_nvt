import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { News } from '@/lib/db/models';
import NewsForm from '@/components/admin/NewsForm';

export const metadata: Metadata = {
  title: 'Sửa bài viết | Quản lý Tin Tức',
};

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const article = await News.findByPk(resolvedParams.id);
  
  if (!article) {
    notFound();
  }

  // Chuyển đối tượng sequelize thành plain object (vì chuyển qua Client Component)
  const initialData = article.toJSON();

  return <NewsForm initialData={initialData} />;
}
