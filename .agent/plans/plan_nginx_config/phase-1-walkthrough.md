# Phase 1 Walkthrough: Chuẩn bị Script và Config Deploy Nginx

**Plan:** `PLAN_NGINX_CONFIG.md`
**Ngày triển khai:** 29/03/2026
**Trạng thái:** ✅ Hoàn thành

---

## 📋 Tóm tắt công việc đã thực hiện

### Task 1: Tạo Nginx Configuration
- [x] Tạo file config Nginx chuẩn cho domain `gdnn-gdtxnguyenvantohoankiem.com` (và www)
- [x] Cấu hình reverse proxy sang Next.js server (chạy PM2 cổng `3001`)
- [x] Cấu hình thiết lập static cache tĩnh cho Nginx
- Files changed: `deploy/gdnn_gdtx.conf`

### Task 2: Tạo Deployment Script
- [x] Viết bash script tự động hóa quá trình deploy config, áp dụng symlink, restart Nginx
- [x] Tích hợp tùy chọn cài phần SSL Let's Encrypt qua Certbot
- Files changed: `deploy/setup_nginx.sh`

---

## ⚠️ Risks/Issues phát hiện (nếu có)

| Issue | Mức độ | Mô tả | Trạng thái |
|-------|--------|-------|------------|
| **Môi trường triển khai** | Low | IDE đang chạy ở máy (Windows), trong khi Nginx thì cài ở máy chủ VPS (Ubuntu). Nghĩa là lệnh Nginx không thể tự chạy từ đây. | ✅ Đã cung cấp sẵn 2 file Script để tải lên và tự chạy gọn gàng trên VPS. |

---

## 🧪 Hướng dẫn Manual Deployment

### Preconditions
- Đăng nhập **SSH** vào VPS (Ubuntu)
- Đảm bảo đã kéo (git pull) cập nhật code mới nhất lên server vào `deploy`.
- Hoặc sao chép 2 file vừa tạo lên máy chủ bằng (SCP / WinSCP / FileZilla)

### Test Steps
1. Mở terminal SSH, cấp quyền thực thi cho file setup:
```bash
chmod +x path/to/deploy/setup_nginx.sh
```
2. Thực thi script (yêu cầu điền mật khẩu sudo nếu có):
```bash
sudo ./path/to/deploy/setup_nginx.sh
```
*Ghi chú: Khi đến bước hỏi **chạy cài SSL ngay không? (y/n)**, nhấn phím `y` nếu bạn đã trỏ DNS của domain về VPS thành công.*

### Expected Results
- Thông báo Nginx start thành công không có lỗi cú pháp
- Domain HTTPS hoạt động: `https://gdnn-gdtxnguyenvantohoankiem.com/` hiển thị app Next.js

---

## 📁 Files Changed

| File | Action | Description |
|------|--------|-------------|
| `deploy/gdnn_gdtx.conf` | Created | File cấu hình Nginx thiết lập reverse proxy cho Next.js |
| `deploy/setup_nginx.sh` | Created | Bash script chạy lệnh tự động áp dụng cấu hình và tạo SSL bằng Certbot trên VPS |
