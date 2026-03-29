# PLAN: Cấu hình Nginx cho tên miền gdnn-gdtxnguyenvantohoankiem.com

## Mục tiêu
- Cấu hình Nginx reverse proxy cho Next.js server chạy trên port `3001`.
- Triển khai chạy trên tên miền chính: `gdnn-gdtxnguyenvantohoankiem.com` và `www.gdnn-gdtxnguyenvantohoankiem.com`.
- Chuẩn bị sẵn cấu hình để lấy chứng chỉ SSL/HTTPS bằng Certbot.

## Bối cảnh hiện trạng
- Dự án `ggtx_nvt` đã được cài đặt trên VPS.
- Next.js đang được chạy qua PM2 trên cổng định sẵn là `3001` (dựa trên `ecosystem.config.js`).
- Có sẵn file mẫu `deploy/nginx.conf` với domain cũ (`nvt.sanghh.space`), port `3001`.

## Yêu cầu nghiệp vụ
- **Server Name**: `gdnn-gdtxnguyenvantohoankiem.com` và `www.gdnn-gdtxnguyenvantohoankiem.com`.
- **Proxy Port**: `3001` cho Next.js app.
- **Static Assets**: Cache tĩnh cho `/_next/static/` và `/uploads/`.
- **HTTP/HTTPS**: Ban đầu cấu hình HTTP (port 80) reverse proxy, sau đó bắt buộc tải SSL để bảo mật bằng Let's Encrypt / Certbot.

---

## 📋 Các quyết định cần được Confirm (Chờ phản hồi từ bạn)

Dựa trên cấu hình hiện tại, mình cần bạn xác nhận các thông tin sau trước khi chúng ta thực thi cấu hình trên VPS:

1. **Đường dẫn source code trên VPS**: 
   - **Ngữ cảnh**: Theo file `setup.sh` trong dự án, mã nguồn thường được clone vào thư mục `/var/www/ggtx_nvt`.
   - **Câu hỏi**: Có đúng bạn để source code ở path này không?

2. **Cấu hình DNS Tên miền**:
   - **Ngữ cảnh**: Nginx cần phân giải đúng IP và để dùng Certbot cài đặt SSL (HTTPS), tên miền cần trỏ về IP của VPS. 
   - **Câu hỏi**: Bạn đã trỏ bản ghi A cho `gdnn-gdtxnguyenvantohoankiem.com` (và bản ghi CNAME/A cho `www`) về địa chỉ IP của VPS chưa?

---

## Các thay đổi dự kiến trên VPS

- Xây dựng file Nginx config tại `/etc/nginx/sites-available/gdnn_gdtx`.
- Link qua `/etc/nginx/sites-enabled/`.
- File Nginx `gdnn_gdtx` sẽ mang cấu trúc:

```nginx
server {
    listen 80;
    server_name gdnn-gdtxnguyenvantohoankiem.com www.gdnn-gdtxnguyenvantohoankiem.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /_next/static/ {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 60m;
        expires 365d;
        access_log off;
    }

    location /uploads/ {
        proxy_pass http://localhost:3001;
        expires 30d;
        access_log off;
    }
}
```

## Các bước triển khai (Execution Plan)

> **Lưu ý:** Các lệnh dưới đây sẽ được chạy trực tiếp trên shell VPS.

1. **Tạo / Cập nhật cấu hình**: Tạo file `/etc/nginx/sites-available/gdnn_gdtx` bằng file cấu hình ở trên.
2. **Kích hoạt config**: Dùng lệnh `sudo ln -s /etc/nginx/sites-available/gdnn_gdtx /etc/nginx/sites-enabled/` (nếu chưa có).
3. **Kiểm tra lỗi**: Chạy `sudo nginx -t` để chuẩn đoán cú pháp.
4. **Áp dụng Config**: Restart Nginx thông qua `sudo systemctl reload nginx`.
5. **Cài đặt SSL**: Chạy bộ lệnh `sudo certbot --nginx -d gdnn-gdtxnguyenvantohoankiem.com -d www.gdnn-gdtxnguyenvantohoankiem.com` để tự động mã hóa Let's Encrypt và redirect http qua https.

## Test plan

- **Test 1**: Vào `http://gdnn-gdtxnguyenvantohoankiem.com` $\rightarrow$ Web hiển thị bình thường, Nginx forward thành công vào port 3001.
- **Test 2**: Chạy lệnh `sudo certbot...` để kích hoạt SSL $\rightarrow$ Nginx tự thêm rule redirect sang HTTPS.
- **Test 3**: Truy cập lại trang qua `https://gdnn...` $\rightarrow$ Thấy ổ khóa bảo mật ở trình duyệt, tài nguyên tải 100% không gặp lỗi Mixed Content.
