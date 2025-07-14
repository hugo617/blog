-- 创建书签表的 SQL 脚本
-- SQL script to create bookmarks table

-- SQLite compatible table creation
CREATE TABLE IF NOT EXISTS bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    url VARCHAR(500) NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100) NOT NULL,
    tags TEXT, -- JSON string for SQLite
    featured BOOLEAN DEFAULT 0,
    published BOOLEAN DEFAULT 1,
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    user_id INTEGER,
    published_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bookmarks_category ON bookmarks(category);
CREATE INDEX IF NOT EXISTS idx_bookmarks_featured ON bookmarks(featured);
CREATE INDEX IF NOT EXISTS idx_bookmarks_published ON bookmarks(published);
CREATE INDEX IF NOT EXISTS idx_bookmarks_published_at ON bookmarks(published_at);
CREATE INDEX IF NOT EXISTS idx_bookmarks_views_count ON bookmarks(views_count);
CREATE INDEX IF NOT EXISTS idx_bookmarks_likes_count ON bookmarks(likes_count);

-- 插入示例数据
-- Insert sample data
INSERT INTO bookmarks (title, description, url, category, tags, featured, image_url, views_count, likes_count, published_at) VALUES
('Dribbble - Discover the World''s Top Designers', 'Dribbble is the leading destination to find & showcase creative work and home to the world''s best design professionals.', 'https://dribbble.com', 'Design', '["design", "inspiration", "portfolio", "ui", "ux"]', 1, 'https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg', 2543, 189, datetime('now')),

('Behance - Creative Portfolios', 'Showcase and discover creative work on the world''s leading online platform for creative industries.', 'https://behance.net', 'Design', '["portfolio", "creative", "design", "photography"]', 1, 'https://a5.behance.net/2cb2a94c4a6407e71c4e2d68bb5b6b8b7e8b8b8b.png', 1876, 142, datetime('now')),

('GitHub - Where the world builds software', 'GitHub is where over 100 million developers shape the future of software, together.', 'https://github.com', 'Development', '["code", "git", "development", "open-source", "collaboration"]', 1, 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png', 4321, 298, datetime('now')),

('CodePen - Online Code Editor', 'An online code editor, learning environment, and community for front-end web development.', 'https://codepen.io', 'Development', '["code", "frontend", "html", "css", "javascript"]', 0, 'https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico', 1654, 87, datetime('now')),

('Awwwards - Website Awards', 'Awwwards are the Website Awards that recognize and promote the talent and effort of the best developers, designers and web agencies in the world.', 'https://awwwards.com', 'Inspiration', '["awards", "websites", "inspiration", "design", "development"]', 1, 'https://assets.awwwards.com/awards/images/2014/09/awwwards-logo-2014.svg', 3210, 234, datetime('now')),

('Figma - Collaborative Design Tool', 'Figma is a collaborative web application for interface design, with additional offline features enabled by desktop applications.', 'https://figma.com', 'Tools', '["design", "prototyping", "collaboration", "ui", "ux"]', 1, 'https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png', 2987, 201, datetime('now')),

('Unsplash - Beautiful Free Images', 'Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos.', 'https://unsplash.com', 'Resources', '["photos", "free", "stock", "images", "photography"]', 0, 'https://unsplash.com/favicon-32x32.png', 1432, 76, datetime('now')),

('LottieFiles - Lightweight Animations', 'LottieFiles is a collection of animations designed for Lottie - gone are the days of heavy GIFs and videos!', 'https://lottiefiles.com', 'Resources', '["animation", "lottie", "motion", "graphics", "json"]', 1, 'https://static.lottiefiles.com/images/favicon/lottiefiles-favicon-32x32.png', 2156, 167, datetime('now')),

('Framer - Interactive Design Tool', 'Framer is a web-based tool for creating interactive designs and prototypes.', 'https://framer.com', 'Tools', '["prototyping", "interaction", "design", "animation"]', 0, 'https://framerusercontent.com/images/favicon-32x32.png', 987, 54, datetime('now')),

('Tailwind CSS - Utility-First CSS Framework', 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.', 'https://tailwindcss.com', 'Development', '["css", "framework", "utility", "responsive", "design"]', 1, 'https://tailwindcss.com/favicons/favicon-32x32.png', 3654, 287, datetime('now')),

('Pinterest - Discover Ideas', 'Discover recipes, home ideas, style inspiration and other ideas to try.', 'https://pinterest.com', 'Inspiration', '["inspiration", "ideas", "visual", "discovery"]', 0, 'https://s.pinimg.com/webapp/favicon-32x32.png', 2341, 123, datetime('now')),

('Notion - All-in-one Workspace', 'A new tool that blends your everyday work apps into one. It''s the all-in-one workspace for you and your team.', 'https://notion.so', 'Tools', '["productivity", "workspace", "notes", "collaboration"]', 0, 'https://www.notion.so/images/favicon.ico', 1789, 98, datetime('now'));
