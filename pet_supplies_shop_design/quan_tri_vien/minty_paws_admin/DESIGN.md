# Tài Liệu Hệ Thống Thiết Kế (Design System) - Pet Admin Dashboard

## 1. Tổng quan & Creative North Star: "The Digital Sanctuary"

Hệ thống thiết kế này không chỉ dừng lại ở một trang quản trị thông thường; nó được định nghĩa bởi triết lý **"The Digital Sanctuary" (Thánh đường kỹ thuật số)**. Đối với một nền tảng quản trị thú cưng, cảm giác về sự chăm sóc, an toàn và sạch sẽ là tối quan trọng. 

Chúng ta phá vỡ cấu trúc "bảng biểu" (grid-heavy) khô khan bằng cách sử dụng **Asymmetry (Bất đối xứng có chủ đích)** và **Tonal Layering (Lớp phủ sắc thái)**. Thay vì những đường kẻ chia ngăn cứng nhắc, chúng ta sử dụng khoảng trắng (negative space) và sự thay đổi nhẹ nhàng của các tông màu bề mặt để dẫn dắt thị giác. Mục tiêu là tạo ra một trải nghiệm biên tập cao cấp (High-end Editorial), nơi dữ liệu phức tạp được trình bày như một tạp chí nghệ thuật hiện đại.

---

## 2. Hệ Thống Màu Sắc (Colors)

### 2.1. Triết lý màu sắc
Màu chủ đạo là **Mint Green** (`primary`), tượng trưng cho sự tươi mới và sức khỏe của thú cưng. Chúng ta sử dụng bảng màu mở rộng từ Material Design để tạo chiều sâu thay vì chỉ dùng các màu đơn sắc.

### 2.2. Quy tắc "No-Line" (Không đường kẻ)
**Cấm tuyệt đối** việc sử dụng đường kẻ (border) 1px đặc để phân chia các khu vực chính. Sự phân tách phải được thực hiện thông qua:
- **Chuyển đổi tông màu:** Đặt một `surface-container-low` trên nền `surface`.
- **Độ đổ bóng mờ:** Sử dụng đổ bóng ambient cực nhẹ.

### 2.3. Hệ thống phân cấp bề mặt (Surface Hierarchy)
Hãy coi giao diện là các tấm kính mờ xếp chồng lên nhau:
- **Nền tảng:** `surface` (#f6faf8)
- **Khu vực nội dung chính:** `surface-container-low` (#eef5f3)
- **Thẻ (Cards) hoặc Phần tử nổi:** `surface-container-lowest` (#ffffff) - Đây là cấp cao nhất, tạo cảm giác sạch sẽ tuyệt đối.

### 2.4. Quy tắc "Glass & Gradient"
Để tạo điểm nhấn "Signature":
- **CTA chính:** Sử dụng Gradient từ `primary` (#006b62) sang `primary-container` (#82f6e7) để tạo độ bóng mờ sang trọng.
- **Floating Panels:** Sử dụng hiệu ứng Glassmorphism (Backdrop blur 20px) kết hợp với màu `surface` ở độ trong suốt 70%.

---

## 3. Typography (Hệ thống chữ)

Chúng ta sử dụng **Plus Jakarta Sans** — một font chữ Sans-serif hiện đại với các đường cong mở, mang lại cảm giác thân thiện nhưng vẫn chuyên nghiệp.

| Vai trò | Token | Cỡ chữ | Ghi chú |
| :--- | :--- | :--- | :--- |
| **Display** | `display-md` | 2.75rem | Dùng cho các con số thống kê cực đại (Ví dụ: Tổng doanh thu). |
| **Headline** | `headline-sm` | 1.5rem | Tiêu đề các mục lớn trên Dashboard. |
| **Title** | `title-md` | 1.125rem | Tiêu đề của các thẻ (Cards) hoặc tên thú cưng trong danh sách. |
| **Body** | `body-md` | 0.875rem | Văn bản nội dung chính, dữ liệu trong bảng. |
| **Label** | `label-md` | 0.75rem | Trạng thái (Status tags), ghi chú nhỏ bên dưới biểu đồ. |

---

## 4. Chiều Sâu & Phân Lớp (Elevation & Depth)

Thay vì cấu trúc vật lý, chúng ta dùng ánh sáng để định nghĩa không gian.

- **Tonal Layering:** Để phân biệt Sidebar và Content, hãy dùng `surface-container` cho Sidebar và `surface` cho Content. Không dùng đường kẻ dọc.
- **Ambient Shadows:** Chỉ dùng shadow cho các phần tử cần sự chú ý tối đa (như Modal hoặc Menu thả xuống). 
    - *Công thức:* `0px 10px 40px rgba(42, 52, 51, 0.06)`. Màu shadow phải là biến thể của `on-surface`, không bao giờ dùng màu đen thuần túy.
- **Ghost Border Fallback:** Trong trường hợp cực kỳ cần thiết để phân tách dữ liệu trong bảng, sử dụng `outline-variant` (#a9b4b1) với độ trong suốt 15%.

---

## 5. Thành Phần Thiết Kế (Components)

### 5.1. Sidebar Điều Hướng
- **Thiết kế:** Không dùng vách ngăn. Các mục menu (Navigation items) sử dụng góc bo `md` (0.75rem). 
- **Trạng thái Active:** Sử dụng màu `primary-container` với chữ `on-primary-container`. Thêm một "pill" nhỏ màu `primary` ở cạnh trái để tạo điểm nhấn thị giác.

### 5.2. Thẻ Tóm Tắt (Summary Cards)
- **Cấu trúc:** Sử dụng `surface-container-lowest` (#ffffff). Bo góc `xl` (1.5rem).
- **Điểm nhấn:** Mỗi thẻ có một icon mềm mại nằm trong một hình tròn màu `secondary-container` với độ mờ nhẹ. Tránh sử dụng icon quá sắc nhọn.

### 5.3. Bảng Dữ Liệu (Data Tables)
- **Quy tắc:** Cấm dùng đường kẻ dòng (row lines).
- **Phân cách:** Sử dụng khoảng cách dòng (padding dọc lớn) và hiệu ứng `hover` chuyển màu nền sang `surface-container-high`. 
- **Góc bo:** Toàn bộ bảng nằm trong một container bo góc `lg` (1rem).

### 5.4. Nút Bấm (Buttons)
- **Primary Button:** Bo góc `full` (pill-shaped). Gradient nhẹ. Không có viền.
- **Secondary Button:** Nền `secondary-container`, chữ `on-secondary-container`. 
- **Hiệu ứng:** Khi hover, độ đổ bóng (shadow) tăng nhẹ và màu sắc đậm lên 5%.

### 5.5. Biểu Đồ (Charts)
- **Màu sắc:** Sử dụng dải màu `primary`, `tertiary` và `secondary`.
- **Đường nét:** Các đường biểu đồ (line charts) phải có độ mượt (bezier curves), không gấp khúc. Khu vực phía dưới đường line nên có gradient mờ dần (area chart).

---

## 6. Do's và Don'ts (Nên và Không nên)

### ✅ NÊN:
- **Tận dụng khoảng trắng:** Để dữ liệu "thở". Khoảng cách giữa các card tối thiểu là 24px.
- **Bo góc đồng nhất:** Luôn tuân thủ hệ thống bo góc (Scale). Card lớn dùng `xl`, Button dùng `full`.
- **Viết nội dung thân thiện:** Ví dụ thay vì "Xóa dữ liệu", hãy dùng "Gỡ bỏ thông tin thú cưng".

### ❌ KHÔNG NÊN:
- **Dùng màu đen tuyệt đối (#000000):** Luôn dùng `on-surface` (#2a3433) để giữ độ mềm mại cho mắt.
- **Dùng quá nhiều hiệu ứng đổ bóng:** Chỉ dùng shadow cho các lớp thực sự "nổi" trên bề mặt.
- **Sử dụng bảng màu quá sặc sỡ:** Dashboard là nơi làm việc lâu dài, cần sự dịu mắt của Mint Green và White.

---
*Ghi chú cho Designer: Hệ thống thiết kế này đề cao sự tinh tế. Khi nghi ngờ, hãy chọn phương án đơn giản hơn, loại bỏ bớt chi tiết và tăng khoảng trắng.*