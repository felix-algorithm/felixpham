# HƯỚNG DẪN SỬ DỤNG, TÙY BIẾN & DEPLOY LÊN CLOUDFLARE

Trang web portfolio chuẩn điện ảnh (phong cách Jason Bergh / Awwwards) đã được chuẩn hóa 100% dạng website tĩnh (Static Website), chạy cực kỳ tối ưu và **hoàn toàn tương thích với Cloudflare Pages**.

---

## 1. Cách chạy website trên máy tính (Local)

* **Cách 1 (Nhanh nhất)**: Nhấp đúp chuột vào file **`run.bat`**. 
  * Server local sẽ tự khởi chạy tại `http://localhost:3000` và tự động mở trình duyệt cho bạn.
* **Cách 2**: Mở terminal/PowerShell tại thư mục này và gõ:
  ```bash
  node server.js
  ```

---

## 2. Cách triển khai (Deploy) lên Cloudflare Pages (Miễn phí 100%)

Dự án này là trang web tĩnh thuần túy (HTML, CSS, JS, Fonts, Media), hoàn toàn **không cần build** hay cấu hình server phức tạp, nên chạy trên **Cloudflare Pages** là sự lựa chọn số 1 (băng thông miễn phí, CDN toàn cầu siêu nhanh, hỗ trợ SSL HTTPS và tên miền riêng miễn phí).

### Cách A: Kéo thả trực tiếp (Direct Upload - Không cần biết Git, chỉ mất 1 phút)
1. Đăng nhập vào tài khoản [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Vào mục **Workers & Pages** ở menu bên trái -> Bấm **Create application** -> Chọn tab **Pages**.
3. Chọn mục **Upload assets**.
4. Đặt tên cho dự án (ví dụ: `my-cinematic-portfolio`).
5. **Kéo thả toàn bộ thư mục `web profile`** vào ô tải lên của Cloudflare.
6. Bấm **Deploy site**.
7. Cloudflare sẽ cấp ngay cho bạn một đường link miễn phí dạng `https://my-cinematic-portfolio.pages.dev` để truy cập ngay lập tức!

### Cách B: Liên kết qua GitHub (Tự động cập nhật khi sửa code)
1. Đẩy toàn bộ thư mục này lên một repository trên GitHub.
2. Trên Cloudflare Pages, chọn **Connect to Git** và chọn repo đó.
3. Ở phần cấu hình build:
   * **Framework preset**: Chọn `None`.
   * **Build command**: Để trống.
   * **Build output directory**: Để trống (hoặc điền `/`).
4. Bấm **Save and Deploy**. Mỗi khi bạn sửa code trên GitHub, Cloudflare sẽ tự động cập nhật web mới nhất trong vài giây.

---

## 3. Cấu trúc các trang trong dự án

* **`index.html`**: Trang chủ (Dự án chính dạng Slider 3D toàn màn hình & Danh sách List View).
* **`reportage.html`**: Trang triển lãm ảnh phóng sự / hậu trường phim tài liệu.
* **`about.html`**: Trang giới thiệu tiểu sử, đối tác & giải thưởng.
* **`archive.html`**: Trang lưu trữ danh mục tác phẩm.
* **`contact.html`**: Trang thông tin liên hệ.
* **`404.html`**: Trang báo lỗi 404 thiết kế đồng bộ chuẩn điện ảnh.
* **`_headers`**: File cấu hình cache tự động cho CDN của Cloudflare, giúp tải font và ảnh nhanh nhất thế giới.
* **`assets/`**: Chứa toàn bộ CSS, Fonts, Images, JS và Video nội bộ.

---

## 4. Lưu ý khi dùng Video trên Cloudflare

* Đoạn trailer/video mẫu dạng MP4 ngắn (< 25MB) chạy hoàn toàn mượt mà trên Cloudflare Pages miễn phí.
* Nếu sau này bạn có nhiều video 4K dung lượng lớn (hàng trăm MB hoặc GB), bạn nên:
  * Đăng video lên **Vimeo / YouTube / Cloudflare Stream** rồi nhúng link stream vào.
  * Hoặc lưu trữ video trên **Cloudflare R2** (dịch vụ lưu trữ dung lượng lớn không tính phí băng thông của Cloudflare) để web luôn tải với tốc độ ánh sáng.
