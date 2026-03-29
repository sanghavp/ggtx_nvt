# PLAN: Sửa Lỗi Giao Diện & Tính Năng Trình Quản Trị (Admin QA Fix)

## Mục tiêu
- **BUG-001**: Sửa lỗi Sidebar không thể mở/đóng trên giao diện Mobile (thêm nút Hamburger).
- **BUG-002**: Fix lỗi thiếu chức năng Xóa trong giao diện Quản lý Tin tức (NewsForm).
- **BUG-003**: Cải thiện UX và fix lỗi Window.confirm không hoạt động ở Cột mốc (Milestones).

## Non-goals (chưa làm ở phase này)
- Refactor hoặc chuyển cấu trúc Dashboard Admin. Do hệ thống đã ổn định về CSS, chúng ta chỉ thay đổi lớp tương tác (Z-index, Hook toggle).
- Feature BUG-04 được xác nhận không phải là lỗi (AboutForm là phần Cấu hình - Settings editor) nên không làm.
- Cấu hình SEO/Social.

## Bối cảnh hiện trạng
- Admin sử dụng Next.js (Server Components kết hợp Client components). Header `AdminHeader` đang là 1 bộ Server Component async load Auth session.
- Sidebar tĩnh, không có Context nhận diện trạng thái Mobile Menu.
- `DELETE /api/admin/news/[id]` có tồn tại trên Backend nhưng UI chưa có nút (button) để user xoá.
- API delete đã chuẩn Restful. 

## Yêu cầu nghiệp vụ (đã chốt / đề xuất)
- **Thiết kế Mobile Menu**: Khi ấn `☰` bên trái Header (hoặc bên cạnh Logo), thanh bên trái sẽ trượt ra (slide in). Khung nền nội dung chính sẽ tối mờ (backdrop layer). Ấn vào vùng tối mờ thì tắt menu đi.
- **Tách Component**: Tránh phá vỡ Server auth `await auth()` ở trang layout - Header sẽ bổ sung 1 Component siêu nhẹ dạng `Client Component` chỉ chứa nút Hamburger và được Context tiêu thụ.
- **Tính năng Custom Modal**: Cần tạo 1 Modal riêng biệt để xác nhận (Có nút Delete, Hủy) thay thế `window.confirm`.

## Thiết kế Kỹ thuật / Kiến trúc

### 1. Phục vụ BUG-001 (Mobile Menu)
Sử dụng **React Context API** để quản lý trạng thái Mobile Menu vì cấu trúc layout lồng nhau khá sâu.
- Tạo `SidebarContext.tsx` với state `isOpen` và `toggle()`, `close()`. Mặc định False.
- Tại `src/app/admin/(dashboard)/layout.tsx`, bọc `<SidebarProvider>` bên trong (hoặc ngang hàng) `<AuthProvider>`. 
- Trong `<AdminHeader>`, Import `<MobileMenuToggle />` (Client view) render icon ☰.
- Cập nhật `<Sidebar>` component consume hook `useSidebar()`. Bổ sung Backdrop layer. 

### 2. Phục vụ BUG-002 & BUG-003 (Nút Xóa + Modal)
- `ConfirmModal.tsx` nhận `isOpen`, `onClose`, `onConfirm`, `title`, `message`, `isLoading` props. CSS `.module.css` cung cấp animation fade-in ngắn mượt (fixed position). Dùng overlay.
- Trong `NewsForm` (isEditing === true) render nút `Xóa` đỏ giống `Milestone`. Gắn form submit block cho logic xoá. Khi `ConfirmModal` resolve thì POST Delete fetch.
- Trong `MilestoneForm` thay function `if (!confirm..)` gọi tới state Modal thay vì API browser gốc. 

## Các thay đổi dự kiến trong code

- `src/components/admin/SidebarContext.tsx` *(mới)*: Quản lý biến `isOpen`.
- `src/components/admin/ConfirmModal.tsx` *(mới)*: Reusable layout component modal. Khung `.module.css`. 
- `src/components/admin/MobileMenuToggle.tsx` *(mới)*: Nút ấn `☰`.
- `src/app/admin/(dashboard)/layout.tsx`: Gắn SidebarProvider.
- `src/components/admin/AdminHeader.tsx`: Layout thêm thẻ Mobile component toggle.
- `src/components/admin/Sidebar.tsx` & `module.css`: Thêm logic CSS class `.open` và Overlay div. Sửa z-index tương ứng để vượt Header.
- `src/components/admin/NewsForm.tsx`: Bổ sung `<ConfirmModal/>`, Update style flex `actions` module. Thêm handle function. 
- `src/components/admin/MilestoneForm.tsx`: Sửa cách kích hoạt Xóa dữ liệu (bỏ alert gốc, đưa `<ConfirmModal/>` vào JSX).

## Rủi ro / Edge cases
- **Risk 1**: Khi mở menu trên mobile, scroll trang có thể bị lộ background phía sau → Giải pháp: Dùng `overflow: hidden` trên Desktop, body lock khi `isOpen=true` ở Sidebar context (hoặc CSS hack fixed layout).
- **Risk 2**: Nút Xoá có thể nhấn spam (Double Click) 2 lần nếu Modal lag → Disable modal buttons khi `isSubmitting = true`.

## Test plan
### Happy paths
- **Mở Mobile Mode**: Truy cập thiết bị cỡ <768px -> Mở được menu -> Bấm overlay đen đóng lại được. Bấm ra được các liên kết Sidebar.
- **Xoá bài viết Tức tức**: Tạo 1 News mới -> Vào form Cập nhật nhấn [Xóa bài viết] -> Nhận được custom dialog hỏi confirm -> Click "Đồng ý Xoá" -> Toast / báo thành công & redirect /admin/news. Data mất ở DB.
- **Xoá Cột Mốc**: Ấn xoá -> xác nhận Modal -> xoá thành công, load lại list. Cột mốc mất.

### Edge cases
- **Huỷ Xoá**: Mở Modal -> Nhấn "Huỷ" hoặc "X" -> Nút Xoá bị huỷ, state Form vẫn nguyên, không call DELETE API.
- **Màn hình to**: Khi ấn Toggle Mobile xong mà resize cửa sổ to ra, phải ẩn mượt overlay.
