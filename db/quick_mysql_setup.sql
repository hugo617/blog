-- =====================================================
-- Quick MySQL Database Setup for Blog Application
-- =====================================================
-- Execute this script with: mysql -u root < db/quick_mysql_setup.sql

-- Create databases
CREATE DATABASE IF NOT EXISTS blog_application_development CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS blog_application_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Show created databases
SHOW DATABASES LIKE 'blog_application_%';

-- Display success message
SELECT 'MySQL databases created successfully!' AS message;
SELECT 'Next steps:' AS next_steps;
SELECT '1. Run: rails db:migrate' AS step_1;
SELECT '2. Run: rails db:seed' AS step_2;
SELECT '3. Run: rails server' AS step_3;
