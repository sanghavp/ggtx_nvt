# PLAN: Toast Message Góc Màn Hình

## Mục tiêu

- Chuyển đổi các dạng thông báo (`message`, `error`) inline hiện tại (trong `SettingsForm`, `AboutForm`, `NewsForm`, `MilestoneForm`,...) sang dạng Toast notification.
- Toast notification sẽ hiển thị ở góc màn hình (ví dụ: góc trên bên phải hoặc dưới bên phải), fixed position, đảm bảo luôn được nhìn thấy dù người dùng cuộn trang.
- Đảm bảo tính nhất quán (UI/UX) cho mọi thao tác thành công hoặc thất bại trong Admin Dashboard.

## Non-goals (chưa làm ở phase này)

- Thay đổi flow lưu trữ data; chủ yếu chỉ sửa cách hiển thị thông báo trả về từ API.
- Tác động vào phần public website (hiện tại scope tập trung vào Admin Dashboard).

## Bối cảnh hiện trạng

- Trong `SettingsForm.tsx` & `AboutForm.tsx`, thông báo thành công/lỗi được lưu vào state `message` và hiển thị bằng một thẻ `<div>` (`.alert`). Thẻ này nằm ở trên cùng của nội dung form. Khi form dài, người dùng cuộn xuống nhấn lưu sẽ không thấy dòng thông báo này hiển thị trên đầu.
- Trong `NewsForm.tsx` & `MilestoneForm.tsx`, sử dụng state `error` và hiển thị thẻ `<div>` (`.errorBanner`).
- Việc xử lý Timeout biến mất sau 3s đang được code thủ công ở từng action bằng `setTimeout`.
- Dự án chưa sử dụng thư viện quản lý toast/notification nào.

## Yêu cầu nghiệp vụ (đã chốt / cần confirm)

- **Vị trí hiển thị**: Góc dưới bên phải (Bottom-Right) hoặc Góc trên bên phải (Top-Right) để không che khuất nội dung làm việc. *(Đề xuất Top-Right)*
- **Tự động ẩn**: Toast sẽ tự động ẩn sau khoảng 3 giây.
- **Tính nhất quán**: Dùng chung 1 kiểu style cho toàn bộ các trang Admin.

## Thiết kế Kỹ thuật & Options

Để triển khai dạng "Toast ở góc màn hình", chúng ta có 2 phương án:

> ⚠️ **Lưu ý**: Vui lòng chọn 1 trong 2 phương án (Đề xuất: Option 1)

### Option 1: Sử dụng thư viện `react-hot-toast` (Đề xuất)
- **Lý do**: Đây là thư viện cực kỳ nhẹ, syntax dễ sử dụng (`toast.success('Done')`), và hoạt động rất trơn tru với Next.js App Router.
- **Triển khai**:
  - Chạy `npm install react-hot-toast`.
  - Mở `src/app/admin/layout.tsx` (hoặc `src/components/admin/AdminLayout`), thêm `<Toaster position="top-right" />`.
  - Ở các Forms: thay thế `setMessage({ type: 'success', text: '...' })` thành `toast.success('...')`. Xóa các đoạn mã render `<div className={styles.alert}>`. Cực kỳ ngắn gọn và sạch sẽ.

### Option 2: Tự build Custom Context & Component
- **Lý do**: Nếu không muốn cài thêm thư viện phụ thuộc bên ngoài hoặc muốn kiểm soát hoàn toàn UI.
- **Triển khai**:
  - Tạo `ToastContext.tsx`.
  - Tạo `ToastContainer.tsx` dùng `position: fixed; top: 1rem; right: 1rem;`.
  - Tự code hiệu ứng fadeIn, fadeOut và quản lý queue với `setTimeout`. Quá trình triển khai sẽ mất thời gian hơn và dễ xảy ra bug vặt hơn so với dùng thư viện test kĩ.

## Các thay đổi dự kiến trong code (Theo Option 1)

- **`package.json`**:
  - `[NEW DEPENDENCY]` Cài đặt bổ sung `react-hot-toast`

- **`src/app/admin/layout.tsx`**:
  - `[MODIFY]` Import `<Toaster>` và đưa vào block render để mọi component thuộc cấu trúc Admin đều bắt sự kiện chung này.

- **`src/components/admin/SettingsForm.tsx`** & **`src/components/admin/AboutForm.tsx`**:
  - `[MODIFY]` Xóa state `message`, thay vào đó sử dụng `toast.success` và `toast.error`. Xóa block JSX render thẻ `.alert`.

- **`src/components/admin/NewsForm.tsx`** & **`src/components/admin/MilestoneForm.tsx`**:
  - `[MODIFY]` Đổi cách hiển thị `error` (hiển thị `toast.error()` thay cho thẻ `<div className={styles.errorBanner}>`). Có thể bổ sung toast.success('Đã lưu bài viết!') để clear về mặt UX khi Submit form.

## Rủi ro / Edge cases

- **Chưa xóa toast message cũ**: Thay thế hoàn toàn cách render state, thay vì bị kẹt lại trong DOM, `react-hot-toast` sẽ tự phân rã dom và resolve memory-leak.
- **Z-Index**: `<Toaster>` cần có z-index cao (ví dụ `9999`) để nổi lên trên Modal Dialog (`ConfirmModal.tsx`). `react-hot-toast` đã tự mặc định z-index cao nên rất an toàn.

## Test plan

### Happy paths
- **Lưu thành công cấu hình Chung (SettingsForm)**: Cuộn xuống nhấn lưu -> Toast xanh xuất hiện góc màn hình ghi "Đã lưu thành công". Tự ẩn sau 3 giây.
- **Sửa Bài viết (NewsForm)**: Sửa tên bài viết và nhấn Lưu -> Toast thành công hiện ra ở góc, màn hình chuyển tiếp.
- **Nhấn Xóa (NewsForm)**: Bấm Confirm -> Toast "Đã xóa bài viết" hiện ra ở góc.

### Edge cases
- **Gọi API lỗi (Mạng chập chờn)**: `toast.error('Có lỗi xảy ra')` hiện màu đỏ góc màn hình. Cảnh báo lỗi rõ ràng.

## Điểm dễ thay đổi trong tương lai
- Style của toast có thể tùy chỉnh (`toastOptions` trong `react-hot-toast`) ở một nơi duy nhất là Layout, nên về sau có thể đổi style border/màu nền đồng loạt mọi nơi.

---

## 🙋 Hỏi người dùng
1. Bạn có đồng ý cài thêm thư viện `react-hot-toast` giúp việc quản lý code trở nên tối giản nhất không? (Hay bạn thích tự custom component).
2. Bạn muốn Toast hiển thị ở góc **Top-Right** hay **Bottom-Right** hay vị trí khác?
