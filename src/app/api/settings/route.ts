import { NextResponse } from 'next/server';
import { SiteSetting } from '@/lib/db/models';
import logger from '@/lib/logger';

/**
 * GET /api/settings
 * Lấy danh sách cài đặt cấu hình giao diện (hero, about, stats...)
 */
export async function GET() {
  try {
    const settings = await SiteSetting.findAll({
      attributes: ['key', 'value', 'type'],
    });
    
    // Chuyển array thành object type map cho dễ sử dụng bên client
    const configMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json({ data: configMap });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch site settings');
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}
