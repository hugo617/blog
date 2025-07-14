# MySQL SQL Scripts Guide

This directory contains several SQL scripts to help you set up and manage the MySQL database for the Blog Application.

## Available Scripts

### 1. `quick_mysql_setup.sql`
**Purpose**: Quick database creation only
**Usage**: `mysql -u root < db/quick_mysql_setup.sql`
**What it does**:
- Creates development and test databases
- Sets proper character encoding (utf8mb4)
- Shows success confirmation

### 2. `mysql_setup.sql`
**Purpose**: Complete database setup with tables and sample data
**Usage**: `mysql -u root < db/mysql_setup.sql`
**What it does**:
- Creates databases
- Creates all tables with proper schema
- Inserts sample data (users, posts, tags, comments)
- Sets up foreign key relationships

### 3. `verify_mysql_setup.sql`
**Purpose**: Verify database setup and check data
**Usage**: `mysql -u root < db/verify_mysql_setup.sql`
**What it does**:
- Lists all databases
- Shows tables in development database
- Counts records in each table
- Displays schema migration versions
- Shows connection information

### 4. `reset_mysql_database.sql`
**Purpose**: Reset/recreate databases (⚠️ DESTRUCTIVE)
**Usage**: `mysql -u root < db/reset_mysql_database.sql`
**What it does**:
- Drops existing databases
- Recreates empty databases
- ⚠️ **WARNING**: This will delete ALL data!

## Recommended Setup Workflow

### For New Setup:
```bash
# Option 1: Use the automated script (Recommended)
./bin/setup_mysql

# Option 2: Manual setup
mysql -u root < db/quick_mysql_setup.sql
rails db:migrate
rails db:seed
mysql -u root < db/verify_mysql_setup.sql
```

### For Development Reset:
```bash
# Using Rails (Recommended)
rails db:drop db:create db:migrate db:seed

# Using SQL scripts
mysql -u root < db/reset_mysql_database.sql
rails db:migrate db:seed
```

### For Verification:
```bash
mysql -u root < db/verify_mysql_setup.sql
```

## Database Schema

The scripts create the following main tables:

- **users** - User accounts (Devise authentication)
- **posts** - Blog posts with rich text content
- **comments** - User comments with moderation
- **tags** - Tag system for categorization
- **post_tags** - Many-to-many relationship table
- **action_text_rich_texts** - Rich text content storage
- **active_storage_*** - File attachment support
- **schema_migrations** - Rails migration tracking

## Sample Data

The setup includes sample data:
- 3 users (admin, john, jane)
- 3 blog posts
- 8 tags
- 3 comments
- Post-tag associations
- Rich text content

## Default Login Credentials

- **Admin**: admin@example.com / password123
- **Author 1**: john@example.com / password123
- **Author 2**: jane@example.com / password123

## Troubleshooting

If you encounter issues:

1. **Check MySQL connection**:
   ```bash
   mysql -u root -e "SELECT 1;"
   ```

2. **Verify databases exist**:
   ```bash
   mysql -u root -e "SHOW DATABASES LIKE 'blog_application_%';"
   ```

3. **Check table structure**:
   ```bash
   mysql -u root blog_application_development -e "SHOW TABLES;"
   ```

4. **Reset everything**:
   ```bash
   mysql -u root < db/reset_mysql_database.sql
   rails db:migrate db:seed
   ```
