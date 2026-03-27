import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { auth } from '@/auth';

export async function POST(request: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Xử lý tên file an toàn
    const safeName = file.name.replace(/[^a-z0-9.\-_]/gi, '');
    const filename = `${Date.now()}-${safeName}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Đảm bảo thư mục tồn tại
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch {}

    const path = join(uploadDir, filename);
    await writeFile(path, buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload' }, { status: 500 });
  }
}
