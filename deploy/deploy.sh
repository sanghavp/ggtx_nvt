#!/bin/bash
# SCRIPT DEPLOY / CẬP NHẬT CODE MỚI DÀNH CHO GGTX NVT
# Chạy script này từ thư mục root của project trên server.

set -e

echo "1. Đang kéo code mới từ git..."
git pull origin main

echo "2. Cài đặt dependencies..."
npm install

echo "3. Thực hiện database migration (nếu có)..."
# Tùy db dùng sequelize, nên có thể cần chạy migration:
# npx sequelize-cli db:migrate
# Trường hợp Next.js tự init db qua Sequelize config thì thôi.

echo "4. Build Next.js Production..."
npm run build

echo "5. Khởi động / Restart ứng dụng với PM2..."
pm2 reload ggtx_nvt || pm2 start ecosystem.config.js --env production
pm2 save

echo "==== DEPLOY HOÀN TẤT ===="
pm2 status
