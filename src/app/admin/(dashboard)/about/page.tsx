import { Metadata } from 'next';
import { SiteSetting } from '@/lib/db/models';
import AboutForm from '@/components/admin/AboutForm';

export const metadata: Metadata = {
  title: 'Giới Thiệu | Admin',
};

export default async function AdminAboutPage() {
  const settings = await SiteSetting.findAll({
    where: { type: 'about' }
  });
  
  const initialData = settings.reduce((acc: any, setting: any) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});

  return (
    <div>
      <AboutForm initialData={initialData} />
    </div>
  );
}
