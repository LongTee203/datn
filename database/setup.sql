-- ============================================================
-- PetCare Shop – Database Setup Script
-- Chạy script này trong phpMyAdmin SQL tab
-- ============================================================

-- Tạo database nếu chưa có
CREATE DATABASE IF NOT EXISTS `pet_care_shop`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `pet_care_shop`;

-- ------------------------------------------------------------
-- Bảng: admins
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `admin_id`   INT          NOT NULL AUTO_INCREMENT,
  `username`   VARCHAR(100) NOT NULL,
  `password`   VARCHAR(255) NOT NULL,   -- plain text hoặc bcrypt hash
  `full_name`  VARCHAR(150) NOT NULL,
  `email`      VARCHAR(150) DEFAULT NULL,
  `role`       VARCHAR(50)  DEFAULT 'admin',
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `uk_admin_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu mẫu admin (password: "admin123")
INSERT IGNORE INTO `admins` (`username`, `password`, `full_name`, `email`, `role`) VALUES
  ('admin', 'admin123', 'Quản trị viên', 'admin@petcare.vn', 'admin');

-- ------------------------------------------------------------
-- Bảng: customers
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customers` (
  `customer_id` INT          NOT NULL AUTO_INCREMENT,
  `full_name`   VARCHAR(150) NOT NULL,
  `phone`       VARCHAR(20)  DEFAULT NULL,
  `email`       VARCHAR(150) DEFAULT NULL,
  `address`     TEXT         DEFAULT NULL,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu mẫu (đăng nhập: email + phone làm password)
INSERT IGNORE INTO `customers` (`full_name`, `phone`, `email`, `address`) VALUES
  ('Nguyễn Văn Long',  '0901234567', 'long@gmail.com',    'Hà Nội'),
  ('Trần Thị Mai',     '0912345678', 'mai@gmail.com',     'TP.HCM'),
  ('Phạm Ngọc Ánh',   '0923456789', 'anh@gmail.com',     'Đà Nẵng');

-- ------------------------------------------------------------
-- Bảng: categories
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id`   INT          NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(100) NOT NULL,
  `description`   TEXT         DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO `categories` (`category_name`, `description`) VALUES
  ('Thức ăn', 'Thức ăn các loại cho thú cưng'),
  ('Phụ kiện', 'Phụ kiện, đồ chơi thú cưng'),
  ('Thuốc & Vaccine', 'Thuốc và vắc-xin thú y'),
  ('Chăm sóc lông', 'Dầu gội, lược, kéo...');

-- ------------------------------------------------------------
-- Bảng: products
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `product_id`   INT            NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(200)   NOT NULL,
  `category_id`  INT            DEFAULT NULL,
  `price`        DECIMAL(15,2)  NOT NULL DEFAULT 0.00,
  `stock`        INT            NOT NULL DEFAULT 0,
  `description`  TEXT           DEFAULT NULL,
  `image`        VARCHAR(500)   DEFAULT NULL,
  `created_at`   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO `products` (`product_name`, `category_id`, `price`, `stock`, `description`) VALUES
  ('Thức ăn Royal Canin Poodle 3kg',   1, 450000, 50,  'Dành riêng cho chó Poodle trưởng thành'),
  ('Thức ăn Whiskas cho mèo 1.5kg',    1, 185000, 80,  'Công thức đặc biệt với cá ngừ'),
  ('Chuồng chó inox cao cấp',          2, 1200000, 10, 'Chuồng 3 tầng, chắc chắn, dễ vệ sinh'),
  ('Lược chải lông Silicon',           4, 95000,  100, 'Mềm mại, an toàn cho da thú cưng'),
  ('Xương gặm tự nhiên cho chó',       1, 65000,  200, 'Giúp làm sạch răng, giảm hôi miệng');

-- ------------------------------------------------------------
-- Bảng: services
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `services` (
  `service_id`   INT           NOT NULL AUTO_INCREMENT,
  `service_name` VARCHAR(200)  NOT NULL,
  `description`  TEXT          DEFAULT NULL,
  `price`        DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `duration`     INT           DEFAULT 60 COMMENT 'Phút',
  `image_url`    VARCHAR(500)  DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO `services` (`service_name`, `description`, `price`, `duration`) VALUES
  ('Cắt tỉa lông cơ bản',   'Tắm, sấy, cắt tỉa lông tiêu chuẩn',     150000, 90),
  ('Spa trọn gói',           'Tắm thơm, massage, cắt móng, vệ sinh tai', 350000, 120),
  ('Tiêm vắc-xin 5 bệnh',   'Phòng 5 bệnh truyền nhiễm nguy hiểm',     250000, 30),
  ('Khám tổng quát',         'Kiểm tra sức khoẻ toàn diện bởi bác sĩ',  200000, 45),
  ('Khách sạn thú cưng/ngày','Phòng riêng, chăm sóc 24/7',              300000, 1440),
  ('Huấn luyện cơ bản',      'Vâng lời, đi vệ sinh đúng chỗ',           500000, 60);

-- ------------------------------------------------------------
-- Bảng: appointments (lịch đặt dịch vụ)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `appointments` (
  `appointment_id`   INT          NOT NULL AUTO_INCREMENT,
  `customer_id`      INT          DEFAULT NULL,
  `service_id`       INT          DEFAULT NULL,
  `pet_name`         VARCHAR(100) NOT NULL,
  `appointment_date` DATETIME     NOT NULL,
  `status`           VARCHAR(50)  NOT NULL DEFAULT 'Pending'
                     COMMENT 'Pending | Confirmed | Completed | Cancelled',
  `notes`            TEXT         DEFAULT NULL,
  `created_at`       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`appointment_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE SET NULL,
  FOREIGN KEY (`service_id`)  REFERENCES `services`(`service_id`)   ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO `appointments` (`customer_id`, `service_id`, `pet_name`, `appointment_date`, `status`) VALUES
  (1, 1, 'Mochi',  DATE_ADD(NOW(), INTERVAL  2 HOUR), 'Pending'),
  (2, 3, 'LuLu',   DATE_ADD(NOW(), INTERVAL  4 HOUR), 'Confirmed'),
  (3, 2, 'Bắp',    DATE_ADD(NOW(), INTERVAL -1 DAY),  'Completed'),
  (1, 4, 'Kem',    DATE_ADD(NOW(), INTERVAL  1 DAY),  'Pending');

-- ------------------------------------------------------------
-- Bảng: orders (đơn hàng sản phẩm)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id`       INT            NOT NULL AUTO_INCREMENT,
  `customer_id`    INT            DEFAULT NULL,
  `total_amount`   DECIMAL(15,2)  NOT NULL DEFAULT 0.00,
  `order_status`   VARCHAR(50)    NOT NULL DEFAULT 'Pending'
                   COMMENT 'Pending | Processing | Shipped | Completed | Cancelled',
  `payment_method` VARCHAR(50)    DEFAULT 'COD',
  `created_at`     TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO `orders` (`customer_id`, `total_amount`, `order_status`, `payment_method`) VALUES
  (1, 1250000, 'Pending',    'COD'),
  (2, 4800000, 'Processing', 'Bank Transfer'),
  (3,  320000, 'Completed',  'COD');

-- ------------------------------------------------------------
-- Bảng: order_items
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_items` (
  `item_id`    INT           NOT NULL AUTO_INCREMENT,
  `order_id`   INT           NOT NULL,
  `product_id` INT           DEFAULT NULL,
  `quantity`   INT           NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`item_id`),
  FOREIGN KEY (`order_id`)   REFERENCES `orders`(`order_id`)   ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


