#!/bin/bash
# SCRIPT BACKUP MYSQL DỮ LIỆU HÀNG NGÀY
#
# Cách cài đặt cron job (chạy sudo crontab -e):
# 0 2 * * * /path/to/backup.sh
# (Cron trên sẽ chạy vào 2:00 AM mỗi ngày)

DB_NAME="ggtx_nvt"
DB_USER="root"
DB_PASS="matkhau_mysql" # Thay đổi mật khẩu thực tế (trong server)

BACKUP_DIR="/var/backups/mysql/$DB_NAME"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_FILE="$BACKUP_DIR/$DB_NAME-$DATE.sql.gz"

# Tạo thư mục nếu chưa tồn tại
mkdir -p $BACKUP_DIR

echo "Bắt đầu backup database $DB_NAME..."
# Dump và nén ngay lập tức
mysqldump -u$DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_FILE

echo "Backup thành công: $BACKUP_FILE"

# Xóa các file backup cũ hơn 14 ngày để không đầy ổ cứng
echo "Xóa các bản backup cũ hơn 14 ngày..."
find $BACKUP_DIR -type f -name "*.sql.gz" -mtime +14 -exec rm {} \;

echo "==== QUÁ TRÌNH BACKUP KẾT THÚC ===="
