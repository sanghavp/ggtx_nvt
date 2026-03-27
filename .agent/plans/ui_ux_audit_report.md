# 🔍 UI/UX Audit Report — Website GDNN-GDTX Nguyễn Văn Tố

> **Ngày audit:** 27/03/2026
> **Viewport test:** Desktop 1536×730 + Mobile 375×812 (iPhone SE)
> **Tổng trang đánh giá:** 4 public + 1 admin

---

## 📋 Bối cảnh

| Thuộc tính | Chi tiết |
|---|---|
| **Loại màn hình** | Website Trường học (Landing + CMS) |
| **Mục tiêu chính** | Giới thiệu trường, đọc tin tức, quản trị nội dung |
| **Đối tượng** | Phụ huynh, học sinh, giáo viên (người dùng phổ thông) |

---

## 📊 Tổng điểm

| Hạng mục | Điểm | Ghi chú |
|---|:---:|---|
| **UI Score** | **7/10** | Design system đồng nhất, màu sắc hài hoà. Thiếu micro-animations và polish cuối |
| **UX Score** | **6.5/10** | Mobile responsive tốt, nhưng có vài vấn đề accessibility và content |

---

## 🏠 Trang Chủ

````carousel
![Hero Banner Desktop - Gradient navy đẹp, CTA rõ ràng](file:///C:/Users/ASUS/.gemini/antigravity/brain/a3673a0e-84fe-4107-bc12-0885d2a14813/homepage_hero_desktop_1774605581960.png)
<!-- slide -->
![Stats Section Desktop - 4 card thống kê hiển thị đầy đủ](file:///C:/Users/ASUS/.gemini/antigravity/brain/a3673a0e-84fe-4107-bc12-0885d2a14813/homepage_stats_desktop_1774605588327.png)
<!-- slide -->
![Homepage Mobile - Hero text căn giữa, hamburger menu hoạt động](file:///C:/Users/ASUS/.gemini/antigravity/brain/a3673a0e-84fe-4107-bc12-0885d2a14813/homepage_mobile_top_1774605728017.png)
````

### ✅ Điểm tốt
- Hero banner gradient navy → primary dark tạo chiều sâu chuyên nghiệp
- Stats Section dùng IntersectionObserver animation tạo động lực khi scroll
- Card tin tức có hover effect (`translateY(-6px)` + shadow) tạo cảm giác nâng lên
- Mobile: Hamburger menu hoạt động mượt, hero text scale down đẹp

### ⚠️ Vấn đề phát hiện

**1. 🟡 [Improvement] — Card "Test CMS" hiển thị placeholder xấu**
- **Vị trí:** Section "Tin tức nổi bật" → card đầu tiên
- **CSS:** [NewsCard.module.css](file:///d:/Work/Project/GGTX/src/components/public/NewsCard.module.css#L35-L43) `.placeholder` chỉ hiện emoji 📰 trên nền gradient nhạt
- **Tại sao tệ:** Trông thiếu chuyên nghiệp khi có card không ảnh xen giữa card có ảnh Facebook
- **Đề xuất:** Thêm ảnh mặc định của trường hoặc gradient pattern thay cho emoji placeholder

**2. 🔵 [Polish] — Header thiếu active state cho trang hiện tại**
- **Vị trí:** Navigation links "Trang chủ", "Tin tức", "Giới thiệu"
- **Tại sao tệ:** User không biết đang ở trang nào (vi phạm nguyên tắc "You Are Here")
- **Đề xuất:** Thêm indicator (underline hoặc đổi màu) cho link đang active

---

## 📰 Trang Tin Tức

````carousel
![Tin tức Desktop - Grid 3 cột cân đối](file:///C:/Users/ASUS/.gemini/antigravity/brain/a3673a0e-84fe-4107-bc12-0885d2a14813/news_list_hover_desktop_1774605617625.png)
<!-- slide -->
![Tin tức Mobile - Stack 1 cột, card dễ đọc](file:///C:/Users/ASUS/.gemini/antigravity/brain/a3673a0e-84fe-4107-bc12-0885d2a14813/news_page_mobile_1774605756560.png)
````

### ✅ Điểm tốt
- Grid responsive: 3 cột desktop → 1 cột mobile chuyển mượt
- Hover state card: scale + shadow tốt
- Hero banner "TIN TỨC VỀ NVT" tạo context rõ ràng

### ⚠️ Vấn đề

**3. 🟡 [Improvement] — Thiếu pagination / "Load more"**
- Hiện tại chỉ hiển thị tất cả tin → trang sẽ dài khi có nhiều bài viết
- **Đề xuất:** Thêm pagination hoặc "Xem thêm" button

**4. 🔵 [Polish] — Card height không đều**
- Các card có summary dài/ngắn khác nhau → grid lệch chiều cao
- **Đề xuất:** Thêm `line-clamp` cho summary (tối đa 3 dòng) trong [NewsCard.module.css](file:///d:/Work/Project/GGTX/src/components/public/NewsCard.module.css#L67-L72)

---

## 📖 Trang Giới Thiệu

````carousel
![About Desktop - Paper-over-hero layout, Milestones sidebar](file:///C:/Users/ASUS/.gemini/antigravity/brain/a3673a0e-84fe-4107-bc12-0885d2a14813/about_page_content_desktop_1774605637546.png)
<!-- slide -->
![About Mobile - Hero text responsive, content text ngắt dòng tự nhiên](file:///C:/Users/ASUS/.gemini/antigravity/brain/a3673a0e-84fe-4107-bc12-0885d2a14813/about_page_mobile_top_1774605763900.png)
````

### ✅ Điểm tốt
- Layout "Paper over Hero" tạo chiều sâu và sự chuyên nghiệp
- Timeline Milestones sidebar có hover animation (dịch phải + border-left)
- Mobile: Content và Milestones stack dọc tự nhiên (@1024px breakpoint)

### ⚠️ Vấn đề

**5. 🔴 [Critical] — Hero title bị thiếu chữ "I" (TƯƠNG LA. → TƯƠNG LAI.)**
- **Vị trí:** [page.tsx](file:///d:/Work/Project/GGTX/src/app/(public)/gioi-thieu/page.tsx#L39) — dữ liệu nằm trong database [SiteSetting](file:///d:/Work/Project/GGTX/src/lib/db/models/siteSetting.model.ts#15-24) key `about_hero_title`
- **Tại sao tệ:** Lỗi chính tả ngay tiêu đề chính, gây mất uy tín
- **Fix:** Sửa trong Admin CMS → Cài đặt chung → cập nhật hero title

**6. 🟡 [Improvement] — Khoảng trống lớn giữa content và footer**
- Giữa About content (main + sidebar) và Footer có khoảng trắng ~200px
- **CSS:** [page.module.css](file:///d:/Work/Project/GGTX/src/app/(public)/gioi-thieu/page.module.css#L46-L49) `.contentSection` padding `var(--sp-20)` tương đương ~80px
- **Đề xuất:** Giảm `padding-bottom` của `.contentSection`

---

## 🔐 Trang Admin Login

````carousel
![Admin Login Desktop - Card trung tâm, logo sắc nét](file:///C:/Users/ASUS/.gemini/antigravity/brain/a3673a0e-84fe-4107-bc12-0885d2a14813/admin_login_desktop_1774605662470.png)
<!-- slide -->
![Admin Login Mobile - Form responsive tốt, nút 'Đăng nhập' full-width](file:///C:/Users/ASUS/.gemini/antigravity/brain/a3673a0e-84fe-4107-bc12-0885d2a14813/admin_login_mobile_1774605795702.png)
````

### ✅ Điểm tốt
- Card glassmorphism (shadow + border-radius) tạo cảm giác premium
- Logo NVT hiển thị đúng (đã fix từ `/logo.png` → `/images/logo.png`)
- Input fields có placeholder rõ ràng, nút bấm nổi bật

### ⚠️ Vấn đề

**7. 🔵 [Polish] — Thiếu "Quên mật khẩu?" link**
- Trang login chuyên nghiệp thường có link này
- Có thể không cần nếu chỉ có 1 admin, nhưng tạo cảm giác professional hơn

---

## 📱 Responsive Tổng Quan

| Trang | Desktop | Tablet (1024px) | Mobile (375px) |
|---|:---:|:---:|:---:|
| **Trang chủ** | ✅ | ✅ Stats 2 cột | ✅ Stats 1 cột |
| **Tin tức** | ✅ Grid 3 cột | ✅ Grid 2 cột | ✅ Grid 1 cột |
| **Giới thiệu** | ✅ 2 cột (main+sidebar) | ✅ Stack dọc | ✅ Stack dọc |
| **Admin Login** | ✅ | ✅ | ✅ |
| **Header** | ✅ Nav links | ✅ Nav links | ✅ Hamburger menu |
| **Footer** | ✅ 3 cột | ✅ | ✅ 1 cột |

### ⚠️ Vấn đề Mobile chung

**8. 🟡 [Improvement] — Floating buttons (Messenger/Zalo) quá to trên mobile**
- Trên viewport 375px, 2 nút chiếm ~15% chiều ngang màn hình
- Che khuất nội dung ở góc dưới phải, đặc biệt khi scroll

---

## 🧪 User Persona Check

### 👵 The Grandma Test
- **Chữ đọc được không?** ✅ Font-size base 16px, heading lớn và rõ
- **Contrast đủ không?** ⚠️ Text secondary `#4A4A6A` trên nền trắng → contrast ratio ~5.2:1 (đạt AA nhưng sát ngưỡng)
- **Nút bấm trúng không?** ✅ CTA "Tìm hiểu thêm" đủ to (padding 12px 32px)

### 🍺 The Drunk User
- **Biết nút nào là chính không?** ✅ CTA hero dùng màu secondary nổi bật
- **Biết đang ở đâu không?** ❌ Header KHÔNG có active state → dễ lạc

### 📱 The Mobile User
- **Ngón cái với tới menu?** ✅ Hamburger góc trái trên — với được bằng tay trái
- **Input dễ gõ?** ✅ Admin Login input đủ lớn (min-height ~44px)
- **Floating buttons chắn content?** ⚠️ Có, Messenger/Zalo button che một phần text

---

## 📋 Tổng hợp Issues

| # | Mức độ | Vấn đề | File liên quan | Đề xuất |
|---|---|---|---|---|
| 1 | 🔵 Polish | Placeholder card tin tức xấu | [NewsCard.module.css](file:///d:/Work/Project/GGTX/src/components/public/NewsCard.module.css#L35) | Dùng ảnh mặc định thay emoji |
| 2 | 🔵 Polish | Header thiếu active state | [Header.module.css](file:///d:/Work/Project/GGTX/src/components/public/Header.module.css) | Thêm border-bottom/color cho link active |
| 3 | 🟡 Improve | Thiếu pagination tin tức | [tin-tuc/page.tsx](file:///d:/Work/Project/GGTX/src/app/(public)/tin-tuc/page.tsx) | Thêm pagination hoặc Load more |
| 4 | 🔵 Polish | Card height không đều | [NewsCard.module.css](file:///d:/Work/Project/GGTX/src/components/public/NewsCard.module.css#L67) | `line-clamp: 3` cho summary |
| 5 | 🔴 Critical | Hero title thiếu chữ "I" | Database [SiteSetting](file:///d:/Work/Project/GGTX/src/lib/db/models/siteSetting.model.ts#15-24) | Sửa trong Admin CMS |
| 6 | 🟡 Improve | Khoảng trống lớn About page | [gioi-thieu/page.module.css](file:///d:/Work/Project/GGTX/src/app/(public)/gioi-thieu/page.module.css#L47) | Giảm padding-bottom |
| 7 | 🔵 Polish | Thiếu "Quên mật khẩu" | [admin/login/page.tsx](file:///d:/Work/Project/GGTX/src/app/admin/login/page.tsx) | Thêm link placeholder |
| 8 | 🟡 Improve | Floating buttons to trên mobile | Component floating buttons | Giảm size trên viewport < 768px |

---

## ✅ Kết luận

> **UI: 7/10 | UX: 6.5/10**

**Lời khuyên chốt:** Website đã có nền tảng thiết kế rất tốt (color palette hài hòa, responsive layout chuẩn, animations mượt). Chỉ cần **sửa lỗi typo hero title** (Critical), **thêm active state cho nav header**, và **tối ưu placeholder ảnh tin tức** là giao diện sẽ lên mức chuyên nghiệp hoàn chỉnh.
