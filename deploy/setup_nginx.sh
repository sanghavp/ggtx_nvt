#!/bin/bash
# Script tự động cấu hình Nginx cho dự án ggtx_nvt
# Cách dùng: Tải file này và file gdnn_gdtx.conf lên VPS chạy Ubuntu, sau đó chạy: sudo bash setup_nginx.sh

set -e

# Đảm bảo lệnh chạy bằng quyền root
if [ "$EUID" -ne 0 ]; then
  echo "Vui lòng chạy lệnh bằng quyền root (thêm sudo ở trước)"
  exit
fi

echo "1. Cập nhật file cấu hình Nginx..."
cp gdnn_gdtx.conf /etc/nginx/sites-available/gdnn_gdtx

echo "2. Kích hoạt cấu hình..."
if [ -f /etc/nginx/sites-enabled/gdnn_gdtx ]; then
  echo "Symlink đã tồn tại, bỏ qua tạo mới."
else
  ln -s /etc/nginx/sites-available/gdnn_gdtx /etc/nginx/sites-enabled/
fi

# Xóa cấu hình default nếu cần (tùy chọn)
if [ -f /etc/nginx/sites-enabled/default ]; then
  echo "Đang gỡ bỏ cấu hình Nginx default..."
  rm /etc/nginx/sites-enabled/default
fi

echo "3. Kiểm tra cú pháp Nginx..."
nginx -t

echo "4. Khởi động lại Nginx..."
systemctl reload nginx

echo "5. Gọi Certbot sinh SSL bảo mật HTTPS..."
# Cần kiểm tra xem đã trỏ domain chưa trước khi nhấn đồng ý.
echo "⚠️ CHÚ Ý: Đảm bảo bạn đã trỏ A record cho gdnn-gdtxnguyenvantohoankiem.com về IP của máy chủ này."
echo "Bạn có muốn chạy cài SSL ngay không? (y/n)"
read run_ssl

if [ "$run_ssl" = "y" ] || [ "$run_ssl" = "Y" ]; then
    certbot --nginx -d gdnn-gdtxnguyenvantohoankiem.com
    echo "Cài đặt SSL thành công!"
else
    echo "Vui lòng tự chạy lệnh sau khi trỏ DNS:"
    echo "sudo certbot --nginx -d gdnn-gdtxnguyenvantohoankiem.com"
fi

echo "HOÀN TẤT."
