import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { User } from '@/lib/db/models';
import bcrypt from 'bcryptjs';
import logger from '@/lib/logger';

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Vui lòng nhập đầy đủ mật khẩu cũ và mật khẩu mới' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Mật khẩu mới phải có ít nhất 6 ký tự' },
        { status: 400 }
      );
    }

    // Lấy thông tin user từ DB
    const user = await User.findOne({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json(
        { error: 'Người dùng không tồn tại' },
        { status: 404 }
      );
    }

    // Kiểm tra mật khẩu cũ
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Mật khẩu cũ không chính xác' },
        { status: 400 }
      );
    }

    // Hash mật khẩu mới và update DB
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    logger.info(`Tài khoản ${session.user.email} đã đổi mật khẩu thành công.`);

    return NextResponse.json({ message: 'Đổi mật khẩu thành công' });

  } catch (error) {
    logger.error({ error }, 'Lỗi khi cập nhật mật khẩu');
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi hệ thống khi đổi mật khẩu' },
      { status: 500 }
    );
  }
}
