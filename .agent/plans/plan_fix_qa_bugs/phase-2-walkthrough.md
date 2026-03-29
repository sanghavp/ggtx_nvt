# Phase 2 Walkthrough: Confirm Modal và Chức năng Xóa News

**Plan:** plan_fix_qa_bugs
**Ngày triển khai:** 2026-03-29
**Trạng thái:** ✅ Hoàn thành

---

## 📋 Tóm tắt công việc đã thực hiện

### Task 1: Component Xác Nhận (Confirm Modal)
- [x] Tạo Modal tùy biến với `position: fixed`, chặn scroll document body.
- Files changed: `src/components/admin/ConfirmModal.tsx`, `ConfirmModal.module.css`

### Task 2: Tích hợp Modal Xóa vào Form Tin Tức
- [x] Import hooks và xử lý Delete API cho Form sửa tin tức. Add class css nút xoá.
- Files changed: `src/components/admin/NewsForm.tsx`

### Task 3: Tích hợp Modal Xóa vào Cột Mốc Thời Gian
- [x] Gỡ `window.confirm` lỗi thời. Thay HTML và render JSX Context React Modal vào chức năng Xoá Cột Mốc.
- Files changed: `src/components/admin/MilestoneForm.tsx`

---

## 🧪 Hướng dẫn Manual Test

### Test Steps
1. Đi tới Quản trị -> News -> Vào Cập nhật 1 bài viết bất kỳ.
2. Kiểm tra phần nút dưới cuối form: Thấy được "Xóa Bài Viết".
3. Nhấn vào xuất hiện Popup Dialog. (Tương tự chạy Test với Milestone).
4. Click Thử Huỷ Tắt Confirm.
5. Cuối Click Đồng ý.

### Expected Results
- Popup xoá không bị giật lác. Khi xoá xong tự động đóng form và chuyển hướng về danh sách `router.push()`. Data db bị remove hợp lệ.
