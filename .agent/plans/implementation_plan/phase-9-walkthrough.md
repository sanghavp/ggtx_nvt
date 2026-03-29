# Phase 9 Walkthrough: Deployment

**Plan:** implementation_plan
**Ngày triển khai:** 2026-03-29
**Trạng thái:** ⚠️ Hoàn thành có lưu ý (Chờ cấu hình server thực tế)

---

## 📋 Tóm tắt công việc đã thực hiện

### Task 1: Chuẩn bị môi trường & Scripts Deploy
- [x] Tạo cấu hình PM2 (`ecosystem.config.js`) để chạy và quản lý uptime cho Next.js server.
- [x] Tạo cấu hình Nginx (`deploy/nginx.conf`) để reverse proxy vào Next.js (port 3000), kèm các cấu hình về cache static & cache uploads.
- [x] Viết công cụ cài đặt server (`deploy/setup.sh`) với Node.js, MySQL, PM2, Nginx, Certbot.
- [x] Viết công cụ deploy app (`deploy/deploy.sh`) để update code nhanh trong tương lai.
- [x] Viết script backup database hàng ngày bằng cron job (`deploy/backup.sh`).

---

## ⚠️ Risks/Issues phát hiện (nếu có)

| Issue | Mức độ | Mô tả | Trạng thái |
|-------|--------|-------|------------|
| Cần Server | High | Phase này yêu cầu chạy thật trên VPS (Droplet), do không có kết nối trực tiếp lên server Ubuntu hiện tại của bạn nên mình đã soạn bộ công cụ script tự động hoá. | ⏳ Chờ hướng dẫn User |
| App Build | Medium | Để build Next.js thành công cần setup đầy đủ các biến môi trường Production trong `.env.production` (hoặc thiết lập tay trên PM2 / Server) chứa DATABASE_URL, NEXTAUTH_SECRET,... | ⏳ Chờ cung cấp Env |

---

## 🧪 Hướng dẫn Manual Test

### Preconditions
- 1 Server / VPS Ubuntu 20.04+ (Ví dụ DigitalOcean Droplet).
- Tên miền đã được trỏ về IP của Server này.

### Test Steps
1. SSH vào server của bạn: `ssh root@<IP>`.
2. Tạo thư mục chứa code: `mkdir -p /var/www/ggtx_nvt` và clone code dự án vào đây.
3. Thiết lập biến môi trường bằng cách tạo file `.env.production`.
4. Xem hướng dẫn và chạy cài đặt từng bước hoặc tự động qua file `bash deploy/setup.sh`.
5. Tạo hoặc copy file `deploy/nginx.conf` vào `/etc/nginx/sites-available/ggtx_nvt` và tạo symlink sang thư mục `sites-enabled`. Restart Nginx.
6. Cài đặt SSL tự động với mã lệnh Certbot: `sudo certbot --nginx -d your_domain.com`.
7. Start project với quyền PM2: `bash deploy/deploy.sh`.
8. Kiểm tra cron backup: crontab -e và thêm đường dẫn file `deploy/backup.sh`.

### Expected Results
- Hệ thống luôn hoạt động tự động khi VPS bị khởi động lại (bởi pm2 startup và enable nginx, mysql).
- Chứng chỉ SSL Let's Encrypt bảo mật trang web (HTTPS).
- Ứng dụng gõ trực tiếp tên miền trả về giao diện bình thường và siêu mượt nhờ proxy_cache trong Nginx.

---

## 📁 Files Changed

| File | Action | Description |
|------|--------|-------------|
| `ecosystem.config.js` | Created | Cấu hình PM2 cho dự án Next.js |
| `deploy/nginx.conf` | Created | Cấu hình server block Nginx (Proxy, Cache, SSL hints) |
| `deploy/setup.sh` | Created | Helper cài các thư viện yêu cầu trên Ubuntu sạch |
| `deploy/deploy.sh` | Created | Script git pull, build và live reload PM2 |
| `deploy/backup.sh` | Created | Script dump database định kỳ và xoá file cũ |

---

## ➡️ Next Phase Dependencies

- Phase 9 là phase cuối cùng của dự án.
- Cần user confirm: Có (Vì phase này cần môi trường server thực tế để chạy và xác nhận).
