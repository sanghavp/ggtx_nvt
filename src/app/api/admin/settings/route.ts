import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { SiteSetting } from '@/lib/db/models';
import logger from '@/lib/logger';

// GET /api/admin/settings - Lấy tất cả cài đặt
export async function GET() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const settings = await SiteSetting.findAll();
    
    // Convert array to object { key: value }
    const settingsObj = settings.reduce((acc: any, setting: any) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});

    return NextResponse.json(settingsObj);
  } catch (error) {
    logger.error({ error }, 'Failed to fetch settings');
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

// PUT /api/admin/settings - Cập nhật nhiều cài đặt cùng lúc
export async function PUT(request: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Mảng các key được phép cập nhật
    const allowedKeys = Object.keys(body);
    
    // Update or Create each setting
    for (const key of allowedKeys) {
      const value = body[key];
      let record = await SiteSetting.findOne({ where: { key } });
      if (record) {
        if (record.value !== value) {
          await record.update({ value });
        }
      } else {
        await SiteSetting.create({ key, value, type: 'general' });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error({ error }, 'Failed to update settings');
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
