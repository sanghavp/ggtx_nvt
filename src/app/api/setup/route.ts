import { initDatabase } from '@/lib/db/models';
import seed from '@/lib/db/seed';
import { NextResponse } from 'next/server';
import logger from '@/lib/logger';

/**
 * API endpoint để init database và seed data
 * CHỈ DÙNG Ở DEVELOPMENT
 * GET /api/setup
 */
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    await initDatabase();
    logger.info('Database initialized');

    await seed();
    logger.info('Database seeded');

    return NextResponse.json({ message: 'Database setup completed successfully!' });
  } catch (error) {
    logger.error({ error }, 'Database setup failed');
    return NextResponse.json(
      { error: 'Database setup failed', details: String(error) },
      { status: 500 }
    );
  }
}
