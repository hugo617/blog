-- =====================================================
-- Blog Application MySQL Database Setup Script
-- =====================================================
-- 用户名: root, 密码: (空)

-- 创建数据库
CREATE DATABASE IF NOT EXISTS blog_application_development CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS blog_application_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS blog_application_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用开发数据库
USE blog_application_development;

-- 创建schema_migrations表 (Rails迁移版本管理)
CREATE TABLE IF NOT EXISTS schema_migrations (
  version VARCHAR(255) NOT NULL PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 创建ar_internal_metadata表 (Rails内部元数据)
CREATE TABLE IF NOT EXISTS ar_internal_metadata (
  `key` VARCHAR(255) NOT NULL PRIMARY KEY,
  `value` VARCHAR(255),
  created_at DATETIME(6) NOT NULL,
  updated_at DATETIME(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 创建users表 (用户表)
CREATE TABLE IF NOT EXISTS users (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL DEFAULT '',
  encrypted_password VARCHAR(255) NOT NULL DEFAULT '',
  reset_password_token VARCHAR(255),
  reset_password_sent_at DATETIME(6),
  remember_created_at DATETIME(6),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  bio TEXT,
  website VARCHAR(255),
  created_at DATETIME(6) NOT NULL,
  updated_at DATETIME(6) NOT NULL,
  UNIQUE KEY index_users_on_email (email),
  UNIQUE KEY index_users_on_reset_password_token (reset_password_token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 创建posts表 (文章表)
CREATE TABLE IF NOT EXISTS posts (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  excerpt TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at DATETIME(6),
  user_id BIGINT NOT NULL,
  views_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at DATETIME(6) NOT NULL,
  updated_at DATETIME(6) NOT NULL,
  UNIQUE KEY index_posts_on_slug (slug),
  KEY index_posts_on_published (published),
  KEY index_posts_on_published_at (published_at),
  KEY index_posts_on_user_id (user_id),
  CONSTRAINT fk_rails_posts_user_id FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 创建comments表 (评论表)
CREATE TABLE IF NOT EXISTS comments (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  body TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  user_id BIGINT NOT NULL,
  post_id BIGINT NOT NULL,
  created_at DATETIME(6) NOT NULL,
  updated_at DATETIME(6) NOT NULL,
  KEY index_comments_on_approved (approved),
  KEY index_comments_on_post_id_and_approved (post_id, approved),
  KEY index_comments_on_user_id (user_id),
  CONSTRAINT fk_rails_comments_user_id FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_rails_comments_post_id FOREIGN KEY (post_id) REFERENCES posts (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 创建tags表 (标签表)
CREATE TABLE IF NOT EXISTS tags (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  posts_count INT DEFAULT 0,
  created_at DATETIME(6) NOT NULL,
  updated_at DATETIME(6) NOT NULL,
  UNIQUE KEY index_tags_on_name (name),
  UNIQUE KEY index_tags_on_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 创建post_tags表 (文章标签关联表)
CREATE TABLE IF NOT EXISTS post_tags (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  post_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  created_at DATETIME(6) NOT NULL,
  updated_at DATETIME(6) NOT NULL,
  UNIQUE KEY index_post_tags_on_post_id_and_tag_id (post_id, tag_id),
  KEY index_post_tags_on_tag_id (tag_id),
  CONSTRAINT fk_rails_post_tags_post_id FOREIGN KEY (post_id) REFERENCES posts (id),
  CONSTRAINT fk_rails_post_tags_tag_id FOREIGN KEY (tag_id) REFERENCES tags (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 创建action_text_rich_texts表 (富文本内容表)
CREATE TABLE IF NOT EXISTS action_text_rich_texts (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  body LONGTEXT,
  record_type VARCHAR(255) NOT NULL,
  record_id BIGINT NOT NULL,
  created_at DATETIME(6) NOT NULL,
  updated_at DATETIME(6) NOT NULL,
  UNIQUE KEY index_action_text_rich_texts_uniqueness (record_type, record_id, name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入迁移版本记录
INSERT INTO schema_migrations (version) VALUES 
('20240101000001'),
('20240101000002'),
('20240101000003'),
('20240101000004'),
('20240101000005'),
('20240101000006');

-- 插入Rails内部元数据
INSERT INTO ar_internal_metadata (`key`, `value`, created_at, updated_at) VALUES 
('environment', 'development', NOW(), NOW());
