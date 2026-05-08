-- ============================================================
-- PetCare Shop – Dữ liệu mẫu (Sample Data)
-- Chạy trong phpMyAdmin → SQL tab sau khi đã có các bảng
-- ============================================================

USE `pet_care_shop`;

-- ------------------------------------------------------------
-- admins (mật khẩu: "admin123" dạng plain-text)
-- ------------------------------------------------------------
INSERT IGNORE INTO `admins` (`username`, `password`, `full_name`, `email`, `role`) VALUES
  ('admin', 'admin123', 'Quản trị viên', 'admin@petcare.vn', 'admin');

-- ------------------------------------------------------------
-- categories
-- ------------------------------------------------------------
INSERT IGNORE INTO `categories` (`category_name`, `description`) VALUES
  ('Thức ăn',        'Thức ăn các loại cho thú cưng'),
  ('Phụ kiện',       'Phụ kiện, đồ chơi thú cưng'),
  ('Thuốc & Vaccine','Thuốc và vắc-xin thú y'),
  ('Chăm sóc lông',  'Dầu gội, lược, kéo...'),
  ('Đồ chơi',        'Đồ chơi cho thú cưng');

-- ------------------------------------------------------------
-- customers (mật khẩu login = số điện thoại)
-- ------------------------------------------------------------
INSERT IGNORE INTO `customers` (`full_name`, `phone`, `email`, `address`) VALUES
  ('Nguyễn Anh Thư',  '0901234567', 'thu.nguyen@email.com',  'Quận 1, TP.HCM'),
  ('Trần Minh Tâm',   '0918888999', 'tam.tran@email.com',    'Quận 3, TP.HCM'),
  ('Lê Hoàng Nam',    '0975555444', 'nam.le@email.com',      'Bình Thạnh, TP.HCM'),
  ('Phạm Ngọc Ánh',   '0932222111', 'anh.pham@email.com',    'Thủ Đức, TP.HCM'),
  ('Nguyễn Thu Hà',   '0987654321', 'ha.nguyen@email.com',   'Cầu Giấy, HN'),
  ('Trần Minh Quân',  '0912345678', 'quan.tm@email.com',     'Đống Đa, HN'),
  ('Lê Thị Mai',      '0933111222', 'mai.le@email.com',      'Hai Bà Trưng, HN'),
  ('Phạm Văn Vinh',   '0909999000', 'vinh.pham@email.com',   'Long Biên, HN');

-- ------------------------------------------------------------
-- services
-- ------------------------------------------------------------
INSERT IGNORE INTO `services` (`service_name`, `description`, `price`, `duration`, `image_url`) VALUES
  ('Cắt tỉa lông cơ bản',    'Tắm, sấy, cắt tỉa lông tiêu chuẩn',        150000, 90,   NULL),
  ('Spa trọn gói',            'Tắm thơm, massage, cắt móng, vệ sinh tai',   350000, 120,  NULL),
  ('Tiêm vắc-xin 5 bệnh',    'Phòng 5 bệnh truyền nhiễm nguy hiểm',        250000, 30,   NULL),
  ('Khám tổng quát',          'Kiểm tra sức khoẻ toàn diện bởi bác sĩ',     200000, 45,   NULL),
  ('Khách sạn thú cưng/ngày', 'Phòng riêng, chăm sóc 24/7',                 300000, 1440, NULL),
  ('Huấn luyện cơ bản',       'Vâng lời, đi vệ sinh đúng chỗ',              500000, 60,   NULL),
  ('Grooming nâng cao',       'Cắt kiểu, nhuộm lông, phụ kiện',             500000, 150,  NULL),
  ('Khám tiêm phòng dại',     'Vắc-xin phòng bệnh dại hàng năm',            180000, 20,   NULL);

-- ------------------------------------------------------------
-- products
-- ------------------------------------------------------------
INSERT IGNORE INTO `products` (`product_name`, `category_id`, `price`, `stock`, `description`, `image`) VALUES
  ('Thức ăn Royal Canin Poodle 3kg',  1, 450000, 50, 'Dành riêng cho chó Poodle trưởng thành',         NULL),
  ('Thức ăn Whiskas cho mèo 1.5kg',   1, 185000, 80, 'Công thức đặc biệt với cá ngừ cho mèo',          NULL),
  ('Pate Sheba mèo vị cá hồi 85g',    1,  35000, 200,'Pate cao cấp, mèo yêu thích',                    NULL),
  ('Hạt Hill Science cho chó nhỏ 2kg',1, 380000, 35, 'Dinh dưỡng cân bằng cho chó cỡ nhỏ',             NULL),
  ('Chuồng chó inox cao cấp L',        2,1200000, 10, 'Chuồng 3 tầng, chắc chắn, dễ vệ sinh',          NULL),
  ('Lồng mèo gỗ thông',               2,2500000,  5, 'Lồng mèo cao cấp, thiết kế đẹp',                 NULL),
  ('Lược chải lông Silicon',           4,  95000, 100,'Mềm mại, an toàn cho da thú cưng',               NULL),
  ('Dầu gội Joyce & Dolls 500ml',      4, 120000, 60, 'Dầu gội chuyên dụng cho chó mèo',               NULL),
  ('Xương gặm tự nhiên cho chó',       1,  65000, 200,'Giúp làm sạch răng, giảm hôi miệng',             NULL),
  ('Đồ chơi cần câu mèo',             5,  45000, 150,'Đồ chơi kích thích bản năng săn mồi của mèo',    NULL),
  ('Bóng cao su nhiều màu (set 3)',    5,  55000, 120,'Đồ chơi bền bỉ cho chó',                          NULL),
  ('Bộ tỉa lông chuyên nghiệp',        4, 750000,  8, 'Tông đơ, lược, kéo cao cấp',                    NULL),
  ('Thuốc nhỏ gáy phòng ve bọ',        3, 150000, 45, 'Phòng trị ve, bọ chét cho chó mèo 1-10kg',      NULL),
  ('Viên canxi cho chó con',           3,  85000, 90, 'Bổ sung canxi giúp xương chắc khoẻ',             NULL),
  ('Máy lọc nước tự động cho mèo',    2, 540000, 18, 'Máy lọc tuần hoàn 2L, giữ nước luôn sạch',      NULL);

-- ------------------------------------------------------------
-- appointments (lịch đặt dịch vụ)
-- ------------------------------------------------------------
INSERT IGNORE INTO `appointments` (`customer_id`, `service_id`, `pet_name`, `appointment_date`, `status`, `notes`) VALUES
  (1, 1, 'Mochi',   DATE_ADD(NOW(), INTERVAL  2 HOUR),  'Pending',   'Poodle 5kg'),
  (2, 3, 'LuLu',    DATE_ADD(NOW(), INTERVAL  4 HOUR),  'Confirmed', 'Mèo Anh 3.5kg'),
  (3, 2, 'Bắp',     DATE_ADD(NOW(), INTERVAL -1 DAY),   'Completed', 'Corgi 8kg'),
  (4, 4, 'Kem',     DATE_ADD(NOW(), INTERVAL -1 DAY),   'Completed', 'Mèo ta 2.2kg'),
  (5, 7, 'Milo',    DATE_ADD(NOW(), INTERVAL  1 DAY),   'Pending',   'Beagle - cắt kiểu'),
  (6, 5, 'Luna',    DATE_ADD(NOW(), INTERVAL  2 DAY),   'Confirmed', 'Mèo lưu trú 3 ngày'),
  (7, 8, 'Max',     DATE_ADD(NOW(), INTERVAL  3 DAY),   'Pending',   'Golden Retriever 28kg'),
  (1, 6, 'Bông',    DATE_ADD(NOW(), INTERVAL  7 DAY),   'Pending',   NULL),
  (2, 1, 'Rex',     DATE_ADD(NOW(), INTERVAL -2 DAY),   'Cancelled', 'Husky - đã hủy do bận'),
  (8, 4, 'Puffy',   DATE_ADD(NOW(), INTERVAL  5 HOUR),  'Confirmed', 'Pug 6kg');

-- ------------------------------------------------------------
-- orders
-- ------------------------------------------------------------
INSERT IGNORE INTO `orders` (`customer_id`, `total_amount`, `order_status`, `payment_method`) VALUES
  (1,  1250000, 'Pending',   'COD'),
  (2,  4800000, 'Shipped',   'Bank Transfer'),
  (3,   320000, 'Completed', 'COD'),
  (5,   615000, 'Pending',   'COD'),
  (6,   185000, 'Completed', 'Bank Transfer'),
  (7,  2100000, 'Processing','Bank Transfer'),
  (4,   150000, 'Cancelled', 'COD'),
  (8,   865000, 'Shipped',   'COD');

-- ------------------------------------------------------------
-- order_details (liên kết order ↔ product)
-- ------------------------------------------------------------
-- Lấy order_id và product_id tự động
INSERT IGNORE INTO `order_details` (`order_id`, `product_id`, `quantity`, `price`)
SELECT o.order_id, p.product_id, 2, p.price
FROM orders o
JOIN products p ON p.product_name = 'Thức ăn Royal Canin Poodle 3kg'
WHERE o.order_id = (SELECT MIN(order_id) FROM orders);
