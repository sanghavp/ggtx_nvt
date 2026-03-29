import { SiteSetting } from '@/lib/db/models';
import logger from '@/lib/logger';

/**
 * Lấy toàn bộ cấu hình chung từ database
 * Trả về object dạng { [key]: value }
 */
export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const settings = await SiteSetting.findAll();
    return settings.reduce((acc: Record<string, string>, setting: any) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});
  } catch (error) {
    logger.warn({ error }, 'Failed to fetch site settings');
    return {};
  }
}
