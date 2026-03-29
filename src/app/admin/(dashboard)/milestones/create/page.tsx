import { Metadata } from 'next';
import MilestoneForm from '@/components/admin/MilestoneForm';

export const metadata: Metadata = {
  title: 'Thêm Cột Mốc | Admin',
};

export default function CreateMilestonePage() {
  return <MilestoneForm />;
}
