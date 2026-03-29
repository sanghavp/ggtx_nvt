# 🏫 Website Trung tâm GDNN-GDTX Nguyễn Văn Tố - Hoàn Kiếm

Website giới thiệu và quản lý nội dung cho Trung tâm Giáo dục Nghề nghiệp - Giáo dục Thường xuyên Nguyễn Văn Tố.

## 📋 Tính năng

### Trang công khai
- **Trang chủ**: Hero banner, thống kê, tin tức nổi bật
- **Giới thiệu**: Lịch sử trường, cột mốc phát triển (timeline)
- **Tin tức**: Danh sách bài viết, chi tiết bài viết

### Trang quản trị (Admin CMS)
- Đăng nhập bảo mật (NextAuth + bcrypt)
- Quản lý tin tức (CRUD + Rich Text Editor)
- Quản lý cột mốc lịch sử
- Cài đặt chung (hero, stats, footer)
- Upload ảnh

## 🛠️ Công nghệ

| Thành phần | Công nghệ |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, CSS Modules |
| Database | MariaDB / MySQL |
| ORM | Sequelize 6 |
| Auth | NextAuth v5 (beta) |
| Editor | React Quill |
| Logger | Pino |

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống
- **Node.js** >= 18
- **MariaDB** hoặc **MySQL** >= 8.0
- **npm** >= 9

### Bước 1: Clone dự án

```bash
git clone https://github.com/sanghavp/ggtx_nvt.git
cd ggtx_nvt
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Tạo database

Mở MySQL/MariaDB client và tạo database:

```sql
CREATE DATABASE nvt_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Bước 4: Cấu hình môi trường

Copy file `.env.example` thành `.env.local` và cập nhật thông tin:

```bash
cp .env.example .env.local
```

Chỉnh sửa `.env.local`:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=nvt_website
DB_USER=root
DB_PASSWORD=your_password

# NextAuth
NEXTAUTH_SECRET=tao-mot-chuoi-secret-bat-ky-o-day
NEXTAUTH_URL=http://localhost:3000

# App
NEXT_PUBLIC_SITE_NAME=Trung tâm GDNN-GDTX Nguyễn Văn Tố - Hoàn Kiếm
NEXT_PUBLIC_SITE_SHORT_NAME=NVT
```

> ⚠️ **Lưu ý**: `NEXTAUTH_SECRET` nên là chuỗi ngẫu nhiên dài. Có thể tạo bằng: `openssl rand -base64 32`

### Bước 5: Khởi tạo database & dữ liệu mẫu

Truy cập API setup để tự động tạo bảng và seed dữ liệu:

```bash
# Chạy dev server trước
npm run dev

# Mở trình duyệt hoặc gọi API
# Truy cập: http://localhost:3000/api/setup
```

API `/api/setup` sẽ tự động:
- Tạo các bảng: `users`, `site_settings`, `milestones`, `news`
- Seed tài khoản admin và dữ liệu mẫu

### Bước 6: Chạy dự án

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Truy cập:
- 🌐 Website: [http://localhost:3000](http://localhost:3000)
- 🔐 Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Tài khoản Admin mặc định

| Field | Giá trị |
|---|---|
| Email | `admin@nvt.edu.vn` |
| Password | `Admin@123` |

> ⚠️ **Đổi mật khẩu ngay** sau khi đăng nhập lần đầu trên production!

## 📁 Cấu trúc dự án

```
src/
├── app/
│   ├── (public)/           # Trang công khai
│   │   ├── page.tsx        # Trang chủ
│   │   ├── gioi-thieu/     # Trang giới thiệu
│   │   └── tin-tuc/        # Trang tin tức
│   ├── admin/              # Trang quản trị
│   │   ├── login/          # Đăng nhập
│   │   ├── news/           # Quản lý tin tức
│   │   ├── milestones/     # Quản lý cột mốc
│   │   ├── settings/       # Cài đặt chung
│   │   └── about/          # Nội dung giới thiệu
│   └── api/                # API routes
├── components/
│   ├── admin/              # Components admin
│   └── public/             # Components public
├── lib/
│   ├── db/
│   │   ├── models/         # Sequelize models
│   │   ├── seed.ts         # Dữ liệu mẫu
│   │   └── sequelize.ts    # Kết nối DB
│   ├── logger.ts           # Pino logger
│   └── utils.ts            # Utilities
├── styles/
│   └── variables.css       # Design tokens
└── middleware.ts            # Auth middleware
```

## 📜 Scripts

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Chạy development server |
| `npm run build` | Build production |
| `npm start` | Chạy production server |
| `npm run lint` | Kiểm tra linting |

## 📝 License

Private project - Trung tâm GDNN-GDTX Nguyễn Văn Tố - Hoàn Kiếm.