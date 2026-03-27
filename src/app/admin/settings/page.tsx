import { Metadata } from 'next';
import { SiteSetting } from '@/lib/db/models';
import SettingsForm from '@/components/admin/SettingsForm';

export const metadata: Metadata = {
  title: 'Cài đặt chung | Admin',
};

export default async function SettingsPage() {
  const settings = await SiteSetting.findAll();
  
  // Convert array to plain object for Client Component
  const initialData = settings.reduce((acc: any, setting: any) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});

  return (
    <div>
      <SettingsForm initialData={initialData} />
    </div>
  );
}
