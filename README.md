# 🌟 AURORA Blog - 现代化多语言博客系统

一个基于 Rails 7 构建的现代化博客应用，具有完整的国际化支持和精美的 AURORA 设计系统。

![AURORA Blog](https://img.shields.io/badge/Rails-7.2.2.1-red?style=for-the-badge&logo=rubyonrails)
![Ruby](https://img.shields.io/badge/Ruby-3.1.0-red?style=for-the-badge&logo=ruby)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ 主要特性

### 🌐 完整的国际化支持
- **中英双语界面**：完整的中文和英文翻译
- **智能语言检测**：自动检测浏览器语言偏好
- **美观的语言切换器**：桌面端滑动切换 + 移动端下拉菜单
- **本地化日期格式**：符合不同语言习惯的日期显示
- **会话持久化**：语言选择在会话中保持

### 🎨 AURORA 设计系统
- **现代化界面**：简洁优雅的设计风格
- **3D 卡片效果**：鼠标悬停时的立体倾斜动画
- **磁性按钮**：跟随鼠标的磁性交互效果
- **平滑动画**：页面过渡和微交互动画
- **响应式设计**：完美适配桌面、平板和移动设备

### 📝 博客功能
- **Rich Text Editing**: Action Text for blog post content
- **Tagging System**: Flexible tagging with friendly URLs
- **Comment System**: Moderated comments with approval workflow
- **Search & Filtering**: Advanced search using Ransack
- **Responsive Design**: Built with Tailwind CSS
- **Service Objects**: Clean business logic separation
- **Presenters**: View-specific logic extraction
- **ViewComponents**: Reusable UI components

## Architecture

This application follows modern Rails architecture principles:

### Service Objects
- `Posts::PublisherService` - Handles post publishing workflow
- `Comments::ModerationService` - Manages comment approval process
- `Tags::SuggestionService` - Generates tag suggestions based on content

### Presenters
- `PostPresenter` - Formats post data for display
- `UserPresenter` - Handles user profile display logic

### ViewComponents
- `CommentComponent` - Encapsulates comment display logic
- `TagListComponent` - Renders a list of tags consistently

## Tech Stack

- **Backend**: Ruby on Rails 7
- **Database**: MySQL 8.0+
- **Frontend**: Stimulus, Tailwind CSS
- **Authentication**: Devise
- **Authorization**: Pundit
- **Rich Text**: Action Text
- **Search**: Ransack
- **Pagination**: Kaminari

## Getting Started

### Prerequisites

- Ruby 3.0+
- MySQL 8.0+ (with root user, no password)
- Node.js and Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd blog-application
   ```

2. Install dependencies:
   ```bash
   bundle install
   yarn install
   ```

3. Setup the MySQL database:

   **Option 1: Using Rails commands (Recommended)**
   ```bash
   rails db:create
   rails db:migrate
   rails db:seed
   ```

   **Option 2: Using SQL script directly**
   ```bash
   # Connect to MySQL as root user
   mysql -u root

   # Execute the setup script
   source db/mysql_setup.sql

   # Exit MySQL
   exit
   ```

4. Start the development server:
   ```bash
   bin/dev
   ```

5. Visit `http://localhost:3000`

### Default Users

The seed data creates the following users:

- **Admin**: admin@example.com / password123
- **Author 1**: john@example.com / password123
- **Author 2**: jane@example.com / password123

## MySQL Database Setup

### Step-by-Step MySQL Configuration

1. **Install MySQL** (if not already installed):
   ```bash
   # macOS with Homebrew
   brew install mysql
   brew services start mysql

   # Ubuntu/Debian
   sudo apt update
   sudo apt install mysql-server
   sudo systemctl start mysql

   # CentOS/RHEL
   sudo yum install mysql-server
   sudo systemctl start mysqld
   ```

2. **Configure MySQL root user** (ensure no password):
   ```bash
   # Connect to MySQL
   mysql -u root

   # Set empty password for root user (if needed)
   ALTER USER 'root'@'localhost' IDENTIFIED BY '';
   FLUSH PRIVILEGES;
   exit
   ```

3. **Execute database setup**:

   **Method 1: Using the provided SQL script**
   ```bash
   # Navigate to project directory
   cd blog-application

   # Execute the complete setup script
   mysql -u root < db/mysql_setup.sql
   ```

   **Method 2: Using Rails commands**
   ```bash
   # Create databases
   rails db:create

   # Run migrations
   rails db:migrate

   # Load seed data
   rails db:seed
   ```

4. **Verify database setup**:
   ```bash
   # Quick verification using provided script
   mysql -u root < db/verify_mysql_setup.sql

   # Or manually check
   mysql -u root blog_application_development
   SHOW TABLES;
   SELECT COUNT(*) FROM users;
   exit
   ```

### Quick Setup Commands

**Option 1: One-command setup (Recommended)**
```bash
# Execute the automated setup script
./bin/setup_mysql
```

**Option 2: Manual step-by-step setup**
```bash
# 1. Create databases only
mysql -u root < db/quick_mysql_setup.sql

# 2. Run Rails migrations
rails db:migrate

# 3. Load sample data
rails db:seed

# 4. Verify setup
mysql -u root < db/verify_mysql_setup.sql

# 5. Start the server
rails server
```

### Database Schema Overview

The application uses the following main tables:
- `users` - User accounts with Devise authentication
- `posts` - Blog posts with rich text content
- `comments` - User comments with moderation
- `tags` - Tag system for categorization
- `post_tags` - Many-to-many relationship between posts and tags
- `action_text_rich_texts` - Rich text content storage
- `active_storage_*` - File attachment support

## Development

### Running Tests

```bash
bundle exec rspec
```

### Code Quality

```bash
bundle exec rubocop
bundle exec brakeman
```

### Database Management

**Reset database using Rails:**
```bash
rails db:drop db:create db:migrate db:seed
```

**Reset database using SQL script:**
```bash
mysql -u root < db/reset_mysql_database.sql
rails db:migrate db:seed
```

### Troubleshooting

**Common MySQL Issues:**

1. **Connection refused:**
   ```bash
   # Check if MySQL is running
   brew services list | grep mysql  # macOS
   sudo systemctl status mysql     # Linux

   # Start MySQL if not running
   brew services start mysql       # macOS
   sudo systemctl start mysql      # Linux
   ```

2. **Access denied for user 'root':**
   ```bash
   # Reset root password to empty
   mysql -u root -p
   ALTER USER 'root'@'localhost' IDENTIFIED BY '';
   FLUSH PRIVILEGES;
   exit
   ```

3. **Database doesn't exist:**
   ```bash
   # Recreate databases
   mysql -u root < db/quick_mysql_setup.sql
   rails db:migrate
   ```

4. **Permission issues:**
   ```bash
   # Check MySQL user privileges
   mysql -u root
   SHOW GRANTS FOR 'root'@'localhost';
   exit
   ```

## Deployment

This application is ready for deployment on platforms like Heroku, Railway, or any VPS with Ruby support.

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `RAILS_MASTER_KEY` - Rails credentials master key
- `RAILS_ENV` - Environment (production, staging, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
