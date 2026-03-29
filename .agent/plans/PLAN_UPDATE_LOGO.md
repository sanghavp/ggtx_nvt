# PLAN: Update Logo Toàn Dự Án

## Mục tiêu
- Thay thế toàn bộ logo cũ bằng logo mới của trường.
- Tự động tách nền, lấy file trong suốt (convert từ `.jpg` sang `.png`) để không bị lộ viền trắng trên dải menu / banner.
- Cập nhật Favicon đồng bộ tại `src/app/favicon.ico`.
- Trích xuất màu chủ đạo từ logo để thay đổi toàn bộ dải màu (Color Scheme) của dự án.

## Bối cảnh hiện trạng
- Logo gốc do người dùng cung cấp: `public/images/newLogo.jpg` 
- Logo cũ dự án: `public/images/logo.png`
- Vị trí sử dụng ảnh logo cũ trong code:
  - `src/components/public/HeroBanner.tsx:51`
  - `src/components/public/Header.tsx:53`
  - `src/app/admin/login/page.tsx:51`
- File chứa hệ màu CSS cần đổi: `src/styles/variables.css`

## Yêu cầu nghiệp vụ (đã chốt)
- **Định dạng ảnh**: Bắt buộc phải được tách nền, biến thành ảnh trong suốt `.png` thay vì dùng `.jpg` thô. 
- **Favicon**: Resize và tạo `favicon.ico` mới 100% từ ảnh này.
- **Theme Color**: Thay vì giữ các mã màu Navy Blue/Soft Pink cũ, sẽ quét và dùng các mã màu (Hex) trích từ template của logo mới vào CSS.

## Thiết kế Kỹ thuật / Kiến trúc
1. Sử dụng script python (với module `Pillow` hoặc `rembg`) / ImageMagick tại Local để:
   - Xoá nền trắng file `newLogo.jpg`, xuất file `logo.png` mới vào `public/images/`.
   - Resize tạo file `favicon.ico` mới và lưu đè vào thư mục `src/app/`. Xóa bản cũ bên `public/favicon.ico` nếu còn sót.
   - Đọc 2-3 dải màu phổ biến nhất của logo để lấy bảng Hex Code Primary/Secondary.
2. Tìm và thay mã màu cũ trong `src/styles/variables.css` bằng mã màu mới theo định dạng CSS Custom Properties: `--color-primary`, `--color-secondary`, `--color-accent`.
3. Bổ sung đuôi query string chống cache ảnh: Sửa tên đường dẫn `src="/images/logo.png"` thành `src="/images/logo.png?v=2"` để khi lên web, trình duyệt của máy khách tự tải bản mới nhất về tránh cache ảnh cũ.

## Các thay đổi dự kiến trong code
- `public/images/logo.png` (Ghi đè - file chính thức)
- `src/app/favicon.ico` (Cập nhật phiên bản icon mới thu nhỏ chuẩn Next.js)
- `src/styles/variables.css`: Cập nhật mã màu Hex (`--color-primary`, `--color-secondary`, `--color-accent`...).
- Các file React Component (`Header`, `HeroBanner`, `login`): thêm version biến đổi ảnh cache (`?v=2`).

## Logging & Bảo mật
Không có thay đổi về Logic Server.

## Rủi ro / Edge cases
- **Tách nền bị lem**: Màu nền và màu viền chữ / họa tiết giao nhau khiến script Auto-tách (VD: Rembg) xóa lỗi hoặc làm lem nhem khung hình. 
  → Cách xử lý: Nếu agent xử lý file bị kém chất lượng, sẽ đề nghị User hỗ trợ một tấm file `.png` chính chủ nguyên bản từ designer, hoặc dùng Mask Color cẩn trọng.
- **Màu chủ đạo kén UI**: Lấy tự động dải màu Hex của Logo gắn vào CSS có thể làm giao diện bị loá hoặc tối chữ hơn nếu màu nhạt, vì CSS đang config cho bộ Navy Blue tối (Text sáng).
  → Cách xử lý: Viết thêm code tinh chỉnh Lightness của màu, hoặc đổi lại độ tương phản chữ.

## Test plan
### Happy paths
- **Chất lượng Logo hiển thị**: Ảnh logo trên header và banner hoà vào màu nền chung, không còn khung chữ nhật trắng bao quanh. Layout hiển thị đúng khung Width/Height không bị vỡ.
- **Trang Login Admin**: Logo giữa màn hình form login thu nhỏ chính xác.
- **Favicon**: Đồng bộ 100% trên thẻ tab trình duyệt bằng file `src/app/favicon.ico`.
- **Màu Website mới**: CSS Variables Load mượt, theme đồng bộ.

### Edge cases
- Trình duyệt Hard Cache: Có thể thấy màu chữ cũ do file `variables.css` cache. Query string `?v=2` đã handle cache trên logo ảnh, nhưng CSS có thể cần Hard Reload.

## Những điểm dễ thay đổi trong tương lai
- Logo hoặc màu chủ đề có thể được tái cấu trúc liên tục theo mùa / sự kiện.
- → Cách thích ứng: Cấu trúc biến màu của file CSS Variables vốn đã linh hoạt có thể thay 1 dòng để update cả Project.

## Nơi nên tách module/hàm
Phase này chỉ thiên về Image Processing & UI Variables nên không liên quan Refactor Node Functions.
