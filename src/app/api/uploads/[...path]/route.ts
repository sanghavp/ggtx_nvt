import { NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: Request,
  props: { params: Promise<{ path: string[] }> }
) {
  const params = await props.params;
  const pathArray = params.path;
  const filename = pathArray.join('/');
  
  // Bảo vệ không cho đọc thư mục khác ngoài public/uploads
  if (filename.includes('..')) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  const filepath = join(process.cwd(), 'public', 'uploads', filename);

  try {
    // Kiểm tra xem file có tồn tại không
    await stat(filepath);
    
    // Đọc nội dung file
    const fileBuffer = await readFile(filepath);
    
    // Phân loại Content-Type cơ bản dựa vào đuôi file
    let contentType = 'application/octet-stream';
    const lowerFilename = filename.toLowerCase();
    
    if (lowerFilename.endsWith('.jpg') || lowerFilename.endsWith('.jpeg')) {
      contentType = 'image/jpeg';
    } else if (lowerFilename.endsWith('.png')) {
      contentType = 'image/png';
    } else if (lowerFilename.endsWith('.gif')) {
      contentType = 'image/gif';
    } else if (lowerFilename.endsWith('.webp')) {
      contentType = 'image/webp';
    } else if (lowerFilename.endsWith('.svg')) {
      contentType = 'image/svg+xml';
    } else if (lowerFilename.endsWith('.pdf')) {
      // Để dự phòng sau này có up PDF
      contentType = 'application/pdf';
    }

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Cache trên trình duyệt client và CDN 1 năm
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error(`[Uploads API] File not found: ${filepath}`);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
