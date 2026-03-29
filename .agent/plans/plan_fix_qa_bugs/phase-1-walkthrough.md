# Phase 1 Walkthrough: Mobile Menu Sidebar

**Plan:** plan_fix_qa_bugs
**Ngày triển khai:** 2026-03-29
**Trạng thái:** ✅ Hoàn thành

---

## 📋 Tóm tắt công việc đã thực hiện

### Task 1: Thiết lập SidebarContext
- [x] Khởi tạo Context để quản lý state đóng / mở của danh mục điều hướng.
- Files changed: `src/components/admin/SidebarContext.tsx`

### Task 2: Gắn Nút Toggle (Hamburger Menu)
- [x] Viết Component Client độc lập `MobileMenuToggle.tsx`.
- [x] Sửa thư viện `AdminHeader.tsx` & module CSS để đặt button lên bên góc trái mà không ảnh hưởng tới `async` Auth Component.

### Task 3: Kết nối logic vào Sidebar Layout
- [x] App layout bọc thêm provider `SidebarProvider`.
- [x] Cập nhật thuộc tính của thẻ div con bằng z-index mở rộng và backdrop css (opacity slide).

---

## ⚠️ Risks/Issues phát hiện

| Issue | Mức độ | Mô tả | Trạng thái |
|-------|--------|-------|------------|
| Auth Layout chèn ngang | Medium | Cần để SidebarProvider lọt vào body Auth | ✅ Đã xử lý (đặt provider chính xác vào Admin Layout) |

---

## 🧪 Hướng dẫn Manual Test

### Test Steps
1. Vào admin ở Desktop (Sidebar sẽ luôn đứng im mở, nút menu sẽ bị ẩn).
2. Co cửa sổ Width (F12 Responsive) xuống < 768px (Mobile/Tablet view). 
3. Bấm vào icon góc trái trên ở Toolbar.
4. Menu sidebar sẽ trượt ra (Slide-in) màu xám mờ overlay.

### Expected Results
- Sidebar trượt mượt mà. Đóng chính xác.
