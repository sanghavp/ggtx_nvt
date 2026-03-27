# Website Trung tâm GDNN-GDTX Nguyễn Văn Tố

Xây dựng website cho **Trung tâm GDNN-GDTX Nguyễn Văn Tố** với giao diện lấy cảm hứng từ [tikluy.com.vn](https://tikluy.com.vn/), bao gồm 3 trang chính (Trang chủ, Tin tức, Giới thiệu) và trang Admin CMS đơn giản để quản lý nội dung.

### Thông tin thương hiệu (đã chốt)

- **Tên**: Trung tâm GDNN-GDTX Nguyễn Văn Tố
- **Viết tắt**: NVT
- **Logo**: ![Logo NVT](file:///d:/Work/Project/GGTX/public/images/logo.png) (tông hồng + navy)
- **Color scheme** (từ logo):
  - Primary: **Navy Blue** `#2D3561`
  - Secondary: **Soft Pink** `#F5B7C5`
  - Accent: **Rose** `#E8899E`
  - Background: `#FFFFFF`, `#F8F9FA`
  - Text: `#1A1A2E`, `#4A4A6A`

## User Review Required

> [!NOTE]
> Tất cả thông tin đã được confirm. Sẵn sàng triển khai.

## Non-goals (chưa làm)

- Trang Sản phẩm, Ưu đãi, Hỗ trợ, Tải ứng dụng, Tuyển dụng
- Đa ngôn ngữ (i18n)
- Notification system
- Comment system trên tin tức
- SEO nâng cao (structured data, sitemap.xml) — để phase sau

## Bối cảnh hiện trạng

- Workspace `d:\Work\Project\GGTX` — **trống hoàn toàn**, dự án mới
- Trang tham chiếu tikluy.com.vn: React SPA + Vite, thiết kế hiện đại tông đỏ maroon

## Yêu cầu nghiệp vụ (đã chốt)

| # | Yêu cầu | Chi tiết |
|---|---------|----------|
| 1 | 3 trang công khai | Trang chủ, Tin tức, Giới thiệu |
| 2 | CMS Admin đơn giản | CRUD tin tức, chỉnh sửa trang Giới thiệu |
| 3 | Auth admin | Email/password, không cần register công khai |
| 4 | Deploy | DigitalOcean Ubuntu |

## Tech Stack (đã chốt)

| Layer | Công nghệ | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript | 5.x |
| Styling | Vanilla CSS (CSS Modules) | — |
| Database | **MySQL** | 8.x |
| ORM | Sequelize | 6.x |
| Auth | NextAuth.js (Credentials) | 5.x |
| Rich Text Editor | React Quill hoặc TipTap | — |
| Image Upload | Local storage (public/uploads) | — |
| Deploy | DigitalOcean Ubuntu + PM2 + Nginx | — |

---

## Thiết kế UX / Flow

### Trang chủ (/)

Kế thừa layout từ tikluy.com.vn, adapt cho trường học:

| Section | Nội dung |
|---------|----------|
| **Header** | Logo trường (giữa) + Navigation menu |
| **Hero Banner** | Ảnh trường + slogan + CTA button |
| **Stats** | Số liệu nổi bật (học sinh, giáo viên, năm thành lập...) |
| **Highlights** | 3 cards: Tin tức mới nhất (lấy từ DB) |
| **Footer** | Thông tin liên hệ, bản đồ, social links |

### Trang Tin tức (/tin-tuc)

| Section | Nội dung |
|---------|----------|
| **Header** | Tiêu đề "TIN TỨC" + line decoration |
| **Grid 3 cột** | Cards tin tức (ảnh, tiêu đề, ngày đăng) |
| **Pagination** | Phân trang (10 bài/trang) |
| **Chi tiết** | Route `/tin-tuc/[slug]` — hiển thị full bài viết |

### Trang Giới thiệu (/gioi-thieu)

| Section | Nội dung |
|---------|----------|
| **Hero** | Ảnh đội ngũ/trường + slogan sứ mệnh |
| **Nội dung** | Rich text content (editable từ admin) |
| **Timeline** | Các cột mốc phát triển (optional, lấy từ DB) |

### Trang Admin (/admin)

| Section | Nội dung |
|---------|----------|
| **Login** | `/admin/login` — email/password |
| **Dashboard** | Tổng quan: số tin tức, thống kê cơ bản |
| **Quản lý tin tức** | `/admin/news` — CRUD list + form (rich text editor) |
| **Giới thiệu** | `/admin/about` — Form chỉnh sửa nội dung giới thiệu |

---

## Thiết kế Data Model

### Database Schema

```
┌─────────────────────┐     ┌─────────────────────┐
│       users          │     │       news           │
├─────────────────────┤     ├─────────────────────┤
│ id (PK)             │     │ id (PK)             │
│ email (UNIQUE)      │     │ title               │
│ password (hashed)   │     │ slug (UNIQUE)       │
│ name                │     │ thumbnail           │
│ role (ADMIN)        │     │ content (TEXT/LONG)  │
│ createdAt           │     │ summary             │
│ updatedAt           │     │ isPublished         │
│                     │     │ publishedAt          │
│                     │     │ authorId (FK→users) │
│                     │     │ createdAt           │
│                     │     │ updatedAt           │
└─────────────────────┘     └─────────────────────┘

┌─────────────────────┐     ┌─────────────────────┐
│    site_settings     │     │    milestones        │
├─────────────────────┤     ├─────────────────────┤
│ id (PK)             │     │ id (PK)             │
│ key (UNIQUE)        │     │ year                │
│ value (TEXT/LONG)   │     │ title               │
│ type (about/hero..) │     │ description         │
│ createdAt           │     │ sortOrder           │
│ updatedAt           │     │ createdAt           │
└─────────────────────┘     │ updatedAt           │
                            └─────────────────────┘
```

- **users**: quản lý admin accounts
- **news**: bài viết tin tức
- **site_settings**: nội dung trang giới thiệu, hero text, stats... (key-value)
- **milestones**: cột mốc phát triển trường (timeline)

### Seeder

Tạo admin mặc định: `admin@school.com` / `Admin@123` (đổi sau deploy)

---

## Phân chia Phase triển khai

### 🚀 Phase 1: Project Setup & Foundation (1-2 ngày)

**Mục tiêu**: Khởi tạo dự án, cấu hình cơ bản, database schema

- Khởi tạo Next.js project với TypeScript
- Cấu hình CSS Modules + design system (colors, fonts, spacing)
- Setup **pino** logger (thay vì console.log)
- Setup Sequelize 6 + models (users, news, site_settings, milestones)
- Migration & seeder
- Tạo layout chung (Header + Footer)

### 🎨 Phase 2: Public Pages - Trang chủ (1-2 ngày)

**Mục tiêu**: Hoàn thiện trang chủ với đầy đủ sections

- Hero Banner section (gradient background, CTA)
- Stats section (animated counters)
- Highlights section (3 cards tin tức mới nhất)
- Responsive design cho mobile/tablet
- Floating social buttons (Messenger, Zalo)

### 📰 Phase 3: Public Pages - Tin tức (1-2 ngày)

**Mục tiêu**: Trang danh sách tin tức và trang chi tiết bài viết

- API Route: `GET /api/news` (list, filter, paginate)
- API Route: `GET /api/news/[slug]` (detail)
- Trang `/tin-tuc` — grid layout, cards, pagination
- Trang `/tin-tuc/[slug]` — bài viết chi tiết
- SEO meta tags cho mỗi bài viết

### 🏫 Phase 4: Public Pages - Giới thiệu (1 ngày)

**Mục tiêu**: Trang giới thiệu trường học

- API Route: `GET /api/settings` (lấy about content)
- API Route: `GET /api/milestones` (lấy timeline)
- Hero section
- Rich text content
- Timeline cột mốc phát triển

### 🔐 Phase 5: Authentication & Admin Layout (1-2 ngày)

**Mục tiêu**: Hệ thống đăng nhập admin + layout admin

- NextAuth.js setup với Credentials provider
- Login page `/admin/login`
- Auth middleware (protect `/admin/*`)
- Admin layout (sidebar + header)
- Dashboard cơ bản (thống kê)

### ✏️ Phase 6: CMS - Quản lý tin tức (2-3 ngày)

**Mục tiêu**: CRUD tin tức đầy đủ

- API Routes: `POST/PUT/DELETE /api/admin/news`
- API Route: Upload ảnh `POST /api/admin/upload`
- Trang list tin tức `/admin/news` (table + search + pagination)
- Form tạo/sửa tin tức `/admin/news/create`, `/admin/news/[id]/edit`
- Rich text editor (React Quill / TipTap)
- Image upload cho thumbnail
- Preview trước khi publish

### 📝 Phase 7: CMS - Quản lý Giới thiệu (1 ngày)

**Mục tiêu**: Cho phép admin chỉnh sửa nội dung giới thiệu

- API Routes: `PUT /api/admin/settings`
- API Routes: `CRUD /api/admin/milestones`
- Form chỉnh sửa nội dung giới thiệu (rich text)
- Quản lý timeline milestones

### 🎯 Phase 8: Polish & Optimization (1-2 ngày)

**Mục tiêu**: Hoàn thiện, responsive, animations

- Responsive trên tất cả trang
- Micro-animations (hover, scroll-reveal)
- Loading states & error handling
- 404 page
- Favicon & meta tags

### 🚢 Phase 9: Deployment (1 ngày)

**Mục tiêu**: Deploy lên DigitalOcean Ubuntu

- Setup DigitalOcean Droplet (Ubuntu)
- Install Node.js, **MySQL**, Nginx, PM2
- Build production
- Configure Nginx reverse proxy
- SSL certificate (Let's Encrypt)
- Environment variables
- **Backup**: Setup mysqldump cron job hàng ngày

---

## Proposed Changes (Cấu trúc thư mục)

### [NEW] Project Structure

```
d:\Work\Project\GGTX\
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (Header + Footer)
│   │   ├── page.tsx            # Trang chủ
│   │   ├── globals.css         # Global styles + design tokens
│   │   ├── tin-tuc/
│   │   │   ├── page.tsx        # Danh sách tin tức
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Chi tiết bài viết
│   │   ├── gioi-thieu/
│   │   │   └── page.tsx        # Trang giới thiệu
│   │   ├── admin/
│   │   │   ├── layout.tsx      # Admin layout (sidebar)
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── login/
│   │   │   │   └── page.tsx    # Login page
│   │   │   ├── news/
│   │   │   │   ├── page.tsx    # List tin tức
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx    # Chỉnh giới thiệu
│   │   │   └── milestones/
│   │   │       └── page.tsx    # Quản lý timeline
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts
│   │       ├── news/
│   │       │   ├── route.ts         # GET list
│   │       │   └── [slug]/
│   │       │       └── route.ts     # GET detail
│   │       ├── settings/
│   │       │   └── route.ts         # GET settings
│   │       ├── milestones/
│   │       │   └── route.ts         # GET milestones
│   │       └── admin/
│   │           ├── news/
│   │           │   ├── route.ts     # POST create / GET list
│   │           │   └── [id]/
│   │           │       └── route.ts # PUT / DELETE
│   │           ├── settings/
│   │           │   └── route.ts     # PUT
│   │           ├── milestones/
│   │           │   ├── route.ts     # GET / POST
│   │           │   └── [id]/
│   │           │       └── route.ts # PUT / DELETE
│   │           └── upload/
│   │               └── route.ts     # POST upload image
│   ├── components/
│   │   ├── public/              # Components trang công khai
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroBanner.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── NewsCard.tsx
│   │   │   ├── NewsGrid.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Timeline.tsx
│   │   │   └── FloatingButtons.tsx
│   │   └── admin/               # Components trang admin
│   │       ├── AdminSidebar.tsx
│   │       ├── AdminHeader.tsx
│   │       ├── RichTextEditor.tsx
│   │       ├── ImageUploader.tsx
│   │       ├── DataTable.tsx
│   │       └── StatsCard.tsx
│   ├── lib/
│   │   ├── db/
│   │   │   ├── sequelize.ts     # Sequelize instance
│   │   │   ├── models/
│   │   │   │   ├── index.ts
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── news.model.ts
│   │   │   │   ├── siteSetting.model.ts
│   │   │   │   └── milestone.model.ts
│   │   │   ├── migrations/
│   │   │   └── seeders/
│   │   │       └── adminSeeder.ts
│   │   ├── auth.ts              # NextAuth config
│   │   └── utils.ts             # Helpers (slugify, date format...)
│   └── styles/
│       ├── variables.css        # CSS custom properties
│       ├── components/          # Component-specific CSS modules
│       └── pages/               # Page-specific CSS modules
├── public/
│   ├── uploads/                 # Uploaded images
│   └── images/                  # Static images
├── .env.local                   # Environment variables
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Logging & Bảo mật

- **Logging**: Dùng **pino** — `logger.info/warn/error`, không dùng `console.log`
- **Password**: Hash bằng bcrypt (salt rounds = 10)
- **Auth token**: JWT via NextAuth.js, httpOnly cookie
- **CSRF**: NextAuth.js v5 tích hợp CSRF token, validate trên mọi mutation
- **API Admin**: Tất cả route `/api/admin/*` phải check session
- **Upload**: Validate file type (jpg/png/webp), giới hạn size (5MB). Lưu trong `public/uploads/` (gitignore, không xóa khi deploy)
- **SQL Injection**: Sequelize parameterized queries (tự động)
- ❌ **KHÔNG log**: `.env`, DB credentials, JWT secret

## Rủi ro / Edge cases

| Risk | Mô tả | Xử lý |
|------|--------|-------|
| **Upload ảnh lớn** | User upload file quá nặng | Validate size ≤ 5MB, compress nếu cần |
| **XSS qua Rich Text** | Content chứa script | Sanitize HTML trước khi lưu (DOMPurify) |
| **Slug trùng** | 2 bài viết cùng tiêu đề | Auto-append suffix: `bai-viet`, `bai-viet-1` |
| **Session hết hạn** | Admin đang edit bị logout | Auto-save draft, redirect về login |
| **DB connection** | Pool exhausted | Config connection pool (max: 10) |

## Verification Plan

### Automated Tests
- **Chưa có tests** trong project (dự án mới)
- Phase 8 sẽ bổ sung nếu cần

### Manual Verification (qua từng Phase)

| Phase | Cách verify |
|-------|-------------|
| 1 | Chạy `npm run dev`, DB connect thành công, migration chạy OK |
| 2 | Truy cập `localhost:3000`, thấy trang chủ đầy đủ sections, responsive |
| 3 | Truy cập `/tin-tuc`, thấy grid tin tức, click vào xem chi tiết, pagination hoạt động |
| 4 | Truy cập `/gioi-thieu`, thấy nội dung + timeline |
| 5 | Truy cập `/admin/login`, đăng nhập thành công, redirect về dashboard |
| 6 | Tạo/sửa/xóa tin tức từ admin, verify hiển thị trên trang public |
| 7 | Chỉnh nội dung giới thiệu từ admin, verify hiển thị trên trang public |
| 8 | Test responsive trên mobile (F12 DevTools), animations mượt |
| 9 | Truy cập domain/IP public, HTTPS hoạt động, tất cả tính năng OK |

### Browser Testing (dùng browser tool)
- Sau mỗi phase, mở browser verify giao diện + chức năng
- Test responsive bằng cách resize browser

---

## Những điểm dễ thay đổi trong tương lai

- **Color scheme**: Đổi CSS custom properties trong `variables.css`
- **Thêm trang mới**: Tạo folder mới trong `src/app/`, thêm link vào Header
- **Đổi database**: Thay dialect trong Sequelize config (MySQL ↔ PostgreSQL)
- **Thêm role user**: Mở rộng field `role` trong model `users`
- **Comment system**: Thêm model `comments` + relate với `news`

## Nơi nên tách module/hàm

- `lib/utils.ts` → `slugify()`, `formatDate()`, `truncateText()`
- `lib/db/sequelize.ts` → Singleton pattern, tách riêng config
- Components public vs admin → Đã tách thư mục riêng
- API routes → Tách service layer nếu logic phức tạp
