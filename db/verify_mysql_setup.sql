-- =====================================================
-- MySQL Setup Verification Script
-- =====================================================
-- Execute this script with: mysql -u root < db/verify_mysql_setup.sql

-- Check if databases exist
SELECT 'Checking databases...' AS status;
SHOW DATABASES LIKE 'blog_application_%';

-- Use development database
USE blog_application_development;

-- Check if tables exist
SELECT 'Checking tables in development database...' AS status;
SHOW TABLES;

-- Check table counts
SELECT 'Checking data counts...' AS status;
SELECT 'users' AS table_name, COUNT(*) AS count FROM users
UNION ALL
SELECT 'posts' AS table_name, COUNT(*) AS count FROM posts
UNION ALL
SELECT 'comments' AS table_name, COUNT(*) AS count FROM comments
UNION ALL
SELECT 'tags' AS table_name, COUNT(*) AS count FROM tags
UNION ALL
SELECT 'post_tags' AS table_name, COUNT(*) AS count FROM post_tags;

-- Check schema migrations
SELECT 'Checking schema migrations...' AS status;
SELECT version FROM schema_migrations ORDER BY version;

-- Display connection info
SELECT 'Database connection successful!' AS message;
SELECT USER() AS current_user;
SELECT DATABASE() AS current_database;
SELECT VERSION() AS mysql_version;
