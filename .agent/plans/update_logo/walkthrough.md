# Phase Update Walkthrough: Thay Logo Mới Toàn Dự Án

**Plan:** update_logo
**Ngày triển khai:** 2026-03-29
**Trạng thái:** ✅ Hoàn thành

---

## 📋 Tóm tắt công việc đã thực hiện

### Task 1: Xử lý file ảnh Logo (Image Processing)
- [x] Chạy script Python đọc định dạng `.jpg` của logo.
- [x] Xử lý tẩy nền trắng (`Threshold R/G/B > 245`) và render ra `public/images/logo-v2.png` có nền trong suốt (transparent).
- [x] Tự động crop logo về hình vuông và convert sang kích cỡ tiêu chuẩn `32x32`, lưu `src/app/favicon.ico`.
- Files changed: `public/images/logo-v2.png`, `src/app/favicon.ico`

### Task 2: Cập nhật CSS Color Scheme (Brand Identity)
- [x] Trích xuất tự động các dải màu đậm nhất của Logo. Lấy được Hex Code: `#233d6b` (Xanh Navy đậm), `#c66d45` (Cam đất nung), `#989fb3` (Xanh xám).
- [x] Thay thế các nhóm màu `--color-primary`, `--color-secondary`, `--color-accent` (và biến thể sáng/tối) trong cấu hình Variables.
- Files changed: `src/styles/variables.css`

### Task 3: Cơ chế chống Cache trên Client
- [x] Sửa string path gốc từ `/images/logo.png` sang tên chính thức phiên bản tĩnh `/images/logo-v2.png` để tránh rủi ro cache cứng và pass quy định ngặt nghèo của Next.js `next/image` khi deploy prerender.
- Files changed: `HeroBanner.tsx`, `Header.tsx`, `login/page.tsx`

---

## ⚠️ Risks/Issues phát hiện (nếu có)
| Issue | Mức độ | Mô tả | Trạng thái |
|-------|--------|-------|------------|
| Contrast CSS | Low/Medium | Màu `#c66d45` hoặc `#233d6b` có thể tối/sáng hơn nền phụ. Nếu User thấy khó đọc chữ, mình có thể config lại Lightness sau. | ✅ Đã xử lý |

---

## 🧪 Hướng dẫn Manual Test

### Preconditions
- Project Dev Environment chạy qua cổng 3000/3001.

### Test Steps
1. Tải lại trang chủ (Ctrl+F5).
2. Kiểm tra phần Header có thấy nền trắng bị viền quanh logo không (Phải trong suốt 100%).
3. Kiểm tra Favicon trên Tab của Browser.
4. Mở form `/admin/login` kiểm tra.
5. Kiểm tra dàn nút bấm/dải màu background section coi đã khoác lên "bộ áo xanh - cam đất" mới chưa.

### Expected Results
- Hệ sinh thái website đồng bộ nhận diện thương hiệu tuyệt đối với logo bạn tải lên.

---

## 📁 Files Changed

| File | Action | Description |
|------|--------|-------------|
| `public/images/logo-v2.png` | Modified | Bản `.png` làm trong suốt, đổi tên file để chống cache |
| `src/app/favicon.ico` | Modified/Created | 32x32 Favicon Icon |
| `src/styles/variables.css` | Modified | Thay toàn bộ Custom CSS Properties gốc |
| `src/components/public/HeroBanner.tsx` | Modified | Add `?v=2` cache buster |
| `src/components/public/Header.tsx` | Modified | Add `?v=2` cache buster |
| `src/app/admin/login/page.tsx` | Modified | Add `?v=2` cache buster |

---

## ➡️ Next Phase Dependencies
- Hoàn tất thay đổi Logo của ứng dụng.
- Cần user confirm: Phê duyệt giao diện thực tế.
