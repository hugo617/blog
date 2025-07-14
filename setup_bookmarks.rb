#!/usr/bin/env ruby
# 书签设置脚本 - Bookmarks setup script

require 'sqlite3'
require 'json'

# 数据库文件路径 - Database file path
db_path = 'db/development.sqlite3'

puts "Setting up bookmarks in #{db_path}..."

begin
  # 连接数据库 - Connect to database
  db = SQLite3::Database.new(db_path)
  
  # 创建表 - Create table
  puts "Creating bookmarks table..."
  
  create_table_sql = <<~SQL
    CREATE TABLE IF NOT EXISTS bookmarks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        url VARCHAR(500) NOT NULL,
        image_url VARCHAR(500),
        category VARCHAR(100) NOT NULL,
        tags TEXT,
        featured BOOLEAN DEFAULT 0,
        published BOOLEAN DEFAULT 1,
        views_count INTEGER DEFAULT 0,
        likes_count INTEGER DEFAULT 0,
        user_id INTEGER,
        published_at DATETIME,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  SQL
  
  db.execute(create_table_sql)
  
  # 创建索引 - Create indexes
  puts "Creating indexes..."
  
  indexes = [
    "CREATE INDEX IF NOT EXISTS idx_bookmarks_category ON bookmarks(category);",
    "CREATE INDEX IF NOT EXISTS idx_bookmarks_featured ON bookmarks(featured);",
    "CREATE INDEX IF NOT EXISTS idx_bookmarks_published ON bookmarks(published);",
    "CREATE INDEX IF NOT EXISTS idx_bookmarks_published_at ON bookmarks(published_at);",
    "CREATE INDEX IF NOT EXISTS idx_bookmarks_views_count ON bookmarks(views_count);",
    "CREATE INDEX IF NOT EXISTS idx_bookmarks_likes_count ON bookmarks(likes_count);"
  ]
  
  indexes.each { |sql| db.execute(sql) }
  
  # 检查是否已有数据 - Check if data already exists
  count = db.get_first_value("SELECT COUNT(*) FROM bookmarks")
  
  if count > 0
    puts "Bookmarks table already has #{count} records. Skipping seed data."
  else
    puts "Inserting sample data..."
    
    # 示例数据 - Sample data
    bookmarks_data = [
      {
        title: "Dribbble - Discover the World's Top Designers",
        description: "Dribbble is the leading destination to find & showcase creative work and home to the world's best design professionals.",
        url: "https://dribbble.com",
        category: "Design",
        tags: ["design", "inspiration", "portfolio", "ui", "ux"],
        featured: 1,
        image_url: "https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg",
        views_count: 2543,
        likes_count: 189
      },
      {
        title: "Behance - Creative Portfolios",
        description: "Showcase and discover creative work on the world's leading online platform for creative industries.",
        url: "https://behance.net",
        category: "Design",
        tags: ["portfolio", "creative", "design", "photography"],
        featured: 1,
        image_url: "https://a5.behance.net/2cb2a94c4a6407e71c4e2d68bb5b6b8b7e8b8b8b.png",
        views_count: 1876,
        likes_count: 142
      },
      {
        title: "GitHub - Where the world builds software",
        description: "GitHub is where over 100 million developers shape the future of software, together.",
        url: "https://github.com",
        category: "Development",
        tags: ["code", "git", "development", "open-source", "collaboration"],
        featured: 1,
        image_url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        views_count: 4321,
        likes_count: 298
      },
      {
        title: "CodePen - Online Code Editor",
        description: "An online code editor, learning environment, and community for front-end web development.",
        url: "https://codepen.io",
        category: "Development",
        tags: ["code", "frontend", "html", "css", "javascript"],
        featured: 0,
        image_url: "https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico",
        views_count: 1654,
        likes_count: 87
      },
      {
        title: "Awwwards - Website Awards",
        description: "Awwwards are the Website Awards that recognize and promote the talent and effort of the best developers, designers and web agencies in the world.",
        url: "https://awwwards.com",
        category: "Inspiration",
        tags: ["awards", "websites", "inspiration", "design", "development"],
        featured: 1,
        image_url: "https://assets.awwwards.com/awards/images/2014/09/awwwards-logo-2014.svg",
        views_count: 3210,
        likes_count: 234
      },
      {
        title: "Figma - Collaborative Design Tool",
        description: "Figma is a collaborative web application for interface design, with additional offline features enabled by desktop applications.",
        url: "https://figma.com",
        category: "Tools",
        tags: ["design", "prototyping", "collaboration", "ui", "ux"],
        featured: 1,
        image_url: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png",
        views_count: 2987,
        likes_count: 201
      },
      {
        title: "LottieFiles - Lightweight Animations",
        description: "LottieFiles is a collection of animations designed for Lottie - gone are the days of heavy GIFs and videos!",
        url: "https://lottiefiles.com",
        category: "Resources",
        tags: ["animation", "lottie", "motion", "graphics", "json"],
        featured: 1,
        image_url: "https://static.lottiefiles.com/images/favicon/lottiefiles-favicon-32x32.png",
        views_count: 2156,
        likes_count: 167
      },
      {
        title: "Tailwind CSS - Utility-First CSS Framework",
        description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
        url: "https://tailwindcss.com",
        category: "Development",
        tags: ["css", "framework", "utility", "responsive", "design"],
        featured: 1,
        image_url: "https://tailwindcss.com/favicons/favicon-32x32.png",
        views_count: 3654,
        likes_count: 287
      }
    ]
    
    # 插入数据 - Insert data
    insert_sql = <<~SQL
      INSERT INTO bookmarks (title, description, url, category, tags, featured, image_url, views_count, likes_count, published_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), datetime('now'))
    SQL
    
    bookmarks_data.each do |bookmark|
      db.execute(insert_sql, [
        bookmark[:title],
        bookmark[:description],
        bookmark[:url],
        bookmark[:category],
        bookmark[:tags].to_json,
        bookmark[:featured],
        bookmark[:image_url],
        bookmark[:views_count],
        bookmark[:likes_count]
      ])
      puts "Created bookmark: #{bookmark[:title]}"
    end
  end
  
  # 显示统计信息 - Show statistics
  total_count = db.get_first_value("SELECT COUNT(*) FROM bookmarks")
  featured_count = db.get_first_value("SELECT COUNT(*) FROM bookmarks WHERE featured = 1")
  
  puts "\n✅ Bookmarks setup completed!"
  puts "📊 Total bookmarks: #{total_count}"
  puts "⭐ Featured bookmarks: #{featured_count}"
  
  # 显示分类统计 - Show category statistics
  puts "\n📂 Categories:"
  categories = db.execute("SELECT category, COUNT(*) as count FROM bookmarks GROUP BY category")
  categories.each do |category, count|
    puts "   #{category}: #{count}"
  end
  
rescue SQLite3::Exception => e
  puts "❌ Error: #{e.message}"
  exit 1
ensure
  db&.close
end

puts "\n🎉 Setup complete! You can now access bookmarks at /bookmarks"
