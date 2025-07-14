-- =====================================================
-- MySQL Database Reset Script
-- =====================================================
-- WARNING: This will delete all data!
-- Execute with: mysql -u root < db/reset_mysql_database.sql

-- Drop existing databases
DROP DATABASE IF EXISTS blog_application_development;
DROP DATABASE IF EXISTS blog_application_test;
DROP DATABASE IF EXISTS blog_application_production;

-- Recreate databases
CREATE DATABASE blog_application_development CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE blog_application_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE blog_application_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Display success message
SELECT 'Databases reset successfully!' AS message;
SELECT 'Run the following commands next:' AS next_steps;
SELECT 'rails db:migrate' AS step_1;
SELECT 'rails db:seed' AS step_2;
