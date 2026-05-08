# CHƯƠNG 2. PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG

## 2.1. Khảo sát hệ thống

### 2.1.1. Thực trạng quản lý cửa hàng chăm sóc thú cưng

Một cửa hàng chăm sóc thú cưng điển hình hiện nay kinh doanh đa dạng các mặt hàng và dịch vụ:

**Mặt hàng kinh doanh:**
- Thức ăn và đồ ăn vặt cho chó, mèo (hạt khô, pate, bánh thưởng, vitamin)
- Đồ chơi và vui chơi (bóng, xương gặm cao su, cây cào móng)
- Nệm, ổ nằm và phụ kiện giấc ngủ
- Phụ kiện (đai yếm, vòng cổ GPS, balo vận chuyển)
- Thuốc và sản phẩm y tế (sữa tắm, thuốc nhỏ gáy, vitamin tổng hợp)

**Dịch vụ cung cấp:**
- Tắm sấy & Spa VIP, cắt tỉa tạo kiểu, massage thảo mộc
- Tiêm phòng vắc xin, khám sức khỏe tổng quát
- Khách sạn thú cưng (lưu trú ngắn/dài ngày)
- Huấn luyện vâng lời và chỉnh sửa hành vi

### 2.1.2. Bất cập của phương thức quản lý thủ công

Hiện tại, các hoạt động vận hành chủ yếu thực hiện thủ công:

| Hoạt động | Cách làm hiện tại | Bất cập |
|---|---|---|
| Đặt lịch dịch vụ | Điện thoại, tin nhắn Zalo/Facebook | Dễ bị trùng lịch, sai sót, quên nhắc lịch |
| Quản lý đơn hàng | Ghi sổ tay hoặc Excel | Khó tra cứu, dễ nhầm lẫn, không cập nhật thời gian thực |
| Quản lý kho | Kiểm tra thủ công | Không biết chính xác tồn kho, dễ hết hàng không hay |
| Hồ sơ khách hàng | Không lưu trữ hệ thống | Không có lịch sử, không chăm sóc được khách cũ |
| Doanh thu | Tổng hợp cuối ngày/tháng | Không có báo cáo trực quan, phân tích kém |

### 2.1.3. Nhu cầu xây dựng hệ thống website

Để khắc phục các bất cập trên, hệ thống website cần đáp ứng:

1. **Giao diện khách hàng**: Cho phép mua sắm trực tuyến, đặt lịch dịch vụ, đọc bài viết, quản lý tài khoản và thú cưng cá nhân.
2. **Giao diện quản trị**: Quản lý toàn bộ hoạt động của cửa hàng một cách tập trung, có thống kê báo cáo trực quan.

**Phạm vi đồ án:** Xây dựng toàn bộ frontend (Next.js + Tailwind CSS) và backend cơ bản (Next.js Server Actions + API Routes), có kết nối cơ sở dữ liệu MySQL để lưu trữ và xử lý dữ liệu thực.

---

## 2.2. Phân tích yêu cầu của hệ thống

### 2.2.1. Yêu cầu chức năng

#### A. Nhóm chức năng dành cho Khách hàng

**1. Xem thông tin tổng quan**
- Xem trang chủ: banner giới thiệu, dịch vụ nổi bật, quy trình chăm sóc, đội ngũ nhân viên, đánh giá khách hàng, bài viết mới nhất, form đặt lịch nhanh.
- Xem trang giới thiệu, bảng giá dịch vụ, trang liên hệ (gửi form yêu cầu).

**2. Cửa hàng (Shop)**
- Xem danh sách sản phẩm theo danh mục (Thức ăn, Đồ chơi, Nệm & Giấc ngủ, Phụ kiện, Nhà thuốc).
- Tìm kiếm sản phẩm theo tên, lọc theo khoảng giá.
- Sắp xếp sản phẩm: mới nhất, giá tăng/giảm dần, đánh giá.
- Xem chi tiết sản phẩm (tên, mô tả, giá, đánh giá, số lượng).
- Thêm sản phẩm vào giỏ hàng, xem và quản lý giỏ hàng.
- Đặt hàng: nhập địa chỉ giao hàng, chọn phương thức thanh toán, xác nhận đơn.
- Xem lịch sử đơn hàng, hủy đơn hàng.

**3. Đặt lịch dịch vụ (Booking)**
- Xem danh sách dịch vụ (Grooming, Spa, Tiêm phòng, Khách sạn, Khám sức khỏe, Cắt tỉa).
- Chọn dịch vụ, chọn ngày và giờ hẹn từ danh sách khung giờ có sẵn.
- Nhập thông tin thú cưng (tên, giống loài, cân nặng, ghi chú).
- Xác nhận và gửi yêu cầu đặt lịch.
- Xem lịch sử lịch hẹn, hủy lịch hẹn.

**4. Bài viết (Blog)**
- Xem danh sách bài viết theo chủ đề (Dinh dưỡng, Hành vi, Sức khỏe).
- Đọc chi tiết bài viết.
- Tìm kiếm, lọc bài viết theo danh mục.

**5. Tài khoản & Thú cưng**
- Đăng ký tài khoản (họ tên, email, số điện thoại, mật khẩu).
- Đăng nhập, đăng xuất.
- Quên mật khẩu (xác thực qua email/OTP).
- Xem và chỉnh sửa thông tin hồ sơ cá nhân (tên, SĐT, địa chỉ, ảnh đại diện, đổi mật khẩu).
- Quản lý thú cưng: thêm thú cưng mới (tên, giống, cân nặng, ảnh), xem danh sách thú cưng, xem trạng thái sức khỏe.
- Xem lịch sử sử dụng dịch vụ và mua hàng.
- Xem hạng thành viên (Mới / Thân thiết / VIP).

#### B. Nhóm chức năng dành cho Quản trị viên

**1. Dashboard**
- Xem tổng quan: tổng lợi nhuận, số khách hàng mới, số lịch hẹn đang chờ, số đơn hàng hôm nay.
- Biểu đồ so sánh doanh thu dịch vụ vs bán hàng theo ngày trong tuần.
- Xem cơ cấu thú cưng (Chó 30%, Mèo 50%, Khác 20%).

**2. Quản lý lịch hẹn**
- Xem danh sách lịch hẹn với đầy đủ thông tin (thú cưng, chủ nhân, dịch vụ, ngày giờ, trạng thái).
- Thêm lịch hẹn mới thủ công (form popup).
- Cập nhật trạng thái: Chờ xác nhận → Đã xác nhận → Hoàn thành / Hủy.
- Lọc lịch hẹn theo trạng thái và ngày.

**3. Quản lý đơn hàng**
- Xem danh sách đơn hàng, lọc theo trạng thái.
- Xem chi tiết đơn hàng (sản phẩm, số lượng, địa chỉ giao hàng, phương thức thanh toán).
- Cập nhật trạng thái giao hàng: Chờ → Xác nhận → Đang giao → Đã giao.
- Xử lý yêu cầu hủy, hoàn tiền.

**4. Quản lý khách hàng (CRM)**
- Xem danh sách khách hàng, tìm kiếm.
- Xem chi tiết: thông tin cá nhân, danh sách thú cưng, lịch sử mua hàng/đặt lịch, hạng thành viên.
- Khóa/kích hoạt tài khoản khách hàng.

**5. Quản lý kho hàng (Inventory)**
- Xem, tìm kiếm, lọc danh sách sản phẩm theo danh mục.
- Thêm/sửa/xóa sản phẩm (tên, mô tả, giá, danh mục, số lượng tồn, ảnh).
- Quản lý danh mục sản phẩm.
- Cập nhật số lượng tồn kho, cảnh báo hết hàng.

**6. Quản lý dịch vụ**
- Thêm/sửa/xóa dịch vụ (tên, mô tả, giá, thời lượng, ảnh).
- Cập nhật giá dịch vụ, ẩn/hiện dịch vụ.
- Quản lý danh mục dịch vụ.

**7. Quản lý nhân viên**
- Thêm/sửa/xóa nhân viên.
- Phân quyền vai trò (Admin, Nhân viên chăm sóc, Bán hàng, Kế toán).
- Quản lý lịch làm việc.

**8. Quản lý bài viết (Blog)**
- Tạo/sửa/xóa bài viết (tiêu đề, nội dung, ảnh bìa, danh mục, trạng thái).
- Xuất bản/ẩn bài viết.

**9. Báo cáo & Thống kê**
- Biểu đồ doanh thu theo ngày/tuần/tháng/năm.
- Thống kê Top 5 (và toàn bộ) dịch vụ theo lượt đặt và doanh thu.
- Thống kê đơn hàng, khách hàng mới.
- Lọc báo cáo theo khoảng thời gian tùy chọn.
- Xuất báo cáo (CSV/PDF).

**10. Thông báo & Cài đặt**
- Nhận thông báo về đơn hàng mới, lịch hẹn mới, liên hệ từ khách.
- Cài đặt thông tin cửa hàng, dark mode, các tham số hệ thống.
- Tìm kiếm toàn cục trong admin.

### 2.2.2. Yêu cầu phi chức năng

| STT | Yêu cầu | Mô tả |
|---|---|---|
| 1 | Giao diện | Hiện đại, thân thiện, responsive trên desktop/tablet/mobile |
| 2 | Hiệu năng | Thời gian phản hồi < 2 giây; tối ưu truy vấn CSDL bằng index |
| 3 | Bảo mật | Mã hóa mật khẩu bcrypt (salt=10); phân quyền rõ ràng qua middleware |
| 4 | Xác thực | Session cookie JWT có thời hạn 7 ngày; redirect theo role |
| 5 | Khả năng mở rộng | Kiến trúc module hóa, dễ thêm tính năng; dùng Prisma ORM |
| 6 | Bảo trì | Code có cấu trúc rõ ràng; dùng TypeScript để type-safe |
| 7 | CSDL | MySQL; kết nối pool (connectionLimit=10) qua mysql2/promise |
| 8 | Công nghệ | Next.js 14 (App Router), Tailwind CSS, TypeScript |
