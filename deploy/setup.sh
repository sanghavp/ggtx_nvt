#!/bin/bash
# ---------------------------------------------------------
# SCRIPT CÀI ĐẶT MÔI TRƯỜNG CHO DIGITALOCEAN DROPLET (UBUNTU)
# ---------------------------------------------------------
set -e

echo "1. Cập nhật hệ thống..."
sudo apt update && sudo apt upgrade -y

echo "2. Cài đặt Node.js v20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "3. Cài đặt MySQL Server, Nginx và Certbot..."
sudo apt install -y mysql-server nginx certbot python3-certbot-nginx

echo "4. Cài đặt PM2 (Quản lý Process Next.js)..."
sudo npm install -g pm2
pm2 startup
# Sau lệnh pm2 startup, copy lệnh hiển thị ra và chạy bằng quyền sudo

echo "5. Khởi động và thiết lập tự khởi chạy MySQL & Nginx..."
sudo systemctl enable mysql
sudo systemctl enable nginx
sudo systemctl start mysql
sudo systemctl start nginx

echo "6. Bảo mật MySQL - Vui lòng cấu hình các thiết lập sau:"
echo "Chạy lệnh sau: sudo mysql_secure_installation"
echo "Đăng nhập MySQL để tạo database và user:"
echo "$ sudo mysql -u root -p"
echo "mysql> CREATE DATABASE ggtx_nvt;"
echo "mysql> CREATE USER 'admin'@'localhost' IDENTIFIED BY 'mat_khau_cua_ban';"
echo "mysql> GRANT ALL PRIVILEGES ON ggtx_nvt.* TO 'admin'@'localhost';"
echo "mysql> FLUSH PRIVILEGES;"
echo "mysql> EXIT;"

echo ""
echo "==== CÀI ĐẶT HOÀN TẤT ===="
echo "Các công việc tiếp theo:"
echo "- Clone code về server folder /var/www/ggtx_nvt"
echo "- Chạy npm install và npm run build"
echo "- Cấu hình Nginx reverse proxy (copy nginx.conf vào /etc/nginx/sites-available/)"
echo "- Khởi chạy pm2 (pm2 start ecosystem.config.js --env production)"
echo "- Chạy certbot để lấy SSL: sudo certbot --nginx -d your_domain.com"
