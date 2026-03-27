import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Milestone } from '@/lib/db/models';
import MilestoneForm from '@/components/admin/MilestoneForm';

export const metadata: Metadata = {
  title: 'Sửa Cột Mốc | Admin',
};

export default async function EditMilestonePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = await Milestone.findByPk(resolvedParams.id);
  
  if (!item) {
    notFound();
  }

  const initialData = item.toJSON();

  return <MilestoneForm initialData={initialData} />;
}
