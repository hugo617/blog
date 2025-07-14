# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

puts "🌱 Starting to seed the database..."

# Create Users
puts "Creating users..."

admin_user = User.find_or_create_by(email: "admin@example.com") do |user|
  user.password = "password123"
  user.password_confirmation = "password123"
  user.first_name = "Admin"
  user.last_name = "User"
  user.bio = "I'm the administrator of this blog. I love writing about technology and sharing knowledge."
end

author1 = User.find_or_create_by(email: "john@example.com") do |user|
  user.password = "password123"
  user.password_confirmation = "password123"
  user.first_name = "John"
  user.last_name = "Doe"
  user.bio = "Full-stack developer passionate about Ruby on Rails and modern web technologies."
  user.website = "https://johndoe.dev"
end

author2 = User.find_or_create_by(email: "jane@example.com") do |user|
  user.password = "password123"
  user.password_confirmation = "password123"
  user.first_name = "Jane"
  user.last_name = "Smith"
  user.bio = "Frontend developer and UI/UX designer. I love creating beautiful and functional user interfaces."
  user.website = "https://janesmith.design"
end

puts "✅ Created #{User.count} users"

# Create Tags
puts "Creating tags..."

tags_data = [
  { name: "ruby", description: "Ruby programming language" },
  { name: "rails", description: "Ruby on Rails web framework" },
  { name: "javascript", description: "JavaScript programming language" },
  { name: "react", description: "React JavaScript library" },
  { name: "vue", description: "Vue.js JavaScript framework" },
  { name: "css", description: "Cascading Style Sheets" },
  { name: "html", description: "HyperText Markup Language" },
  { name: "database", description: "Database technologies" },
  { name: "postgresql", description: "PostgreSQL database" },
  { name: "api", description: "Application Programming Interface" },
  { name: "tutorial", description: "Tutorial and how-to guides" },
  { name: "tips", description: "Tips and tricks" },
  { name: "best-practices", description: "Best practices and conventions" },
  { name: "performance", description: "Performance optimization" },
  { name: "security", description: "Security and authentication" },
  { name: "testing", description: "Testing and quality assurance" },
  { name: "deployment", description: "Deployment and DevOps" },
  { name: "frontend", description: "Frontend development" },
  { name: "backend", description: "Backend development" },
  { name: "fullstack", description: "Full-stack development" }
]

tags = tags_data.map do |tag_data|
  Tag.find_or_create_by(name: tag_data[:name]) do |tag|
    tag.description = tag_data[:description]
  end
end

puts "✅ Created #{Tag.count} tags"

# Create Posts
puts "Creating posts..."

posts_data = [
  {
    title: "Getting Started with Ruby on Rails 7",
    content: "Ruby on Rails 7 brings exciting new features and improvements. In this comprehensive guide, we'll explore the new features including Hotwire, import maps, and more. Rails 7 continues to be the framework of choice for rapid web development.",
    excerpt: "Learn about the new features in Rails 7 and how to get started with modern web development.",
    user: author1,
    published: true,
    tag_names: ["ruby", "rails", "tutorial"]
  },
  {
    title: "Modern CSS Techniques for Better Web Design",
    content: "CSS has evolved significantly over the years. Modern CSS techniques like Grid, Flexbox, and CSS Variables have revolutionized how we approach web design. Let's explore these powerful features.",
    excerpt: "Discover modern CSS techniques that will improve your web design skills.",
    user: author2,
    published: true,
    tag_names: ["css", "frontend", "tutorial"]
  },
  {
    title: "Building RESTful APIs with Rails",
    content: "APIs are the backbone of modern web applications. In this tutorial, we'll build a complete RESTful API using Ruby on Rails, including authentication, serialization, and testing.",
    excerpt: "Learn how to build robust RESTful APIs using Ruby on Rails.",
    user: author1,
    published: true,
    tag_names: ["ruby", "rails", "api", "backend"]
  },
  {
    title: "React Hooks: A Complete Guide",
    content: "React Hooks have transformed how we write React components. This comprehensive guide covers useState, useEffect, useContext, and custom hooks with practical examples.",
    excerpt: "Master React Hooks with this complete guide and practical examples.",
    user: author2,
    published: true,
    tag_names: ["javascript", "react", "frontend", "tutorial"]
  },
  {
    title: "Database Optimization Tips for Rails Applications",
    content: "Database performance is crucial for web applications. Learn about indexing, query optimization, N+1 problems, and other techniques to improve your Rails app's database performance.",
    excerpt: "Optimize your Rails application's database performance with these proven techniques.",
    user: admin_user,
    published: true,
    tag_names: ["rails", "database", "postgresql", "performance"]
  },
  {
    title: "Security Best Practices for Web Applications",
    content: "Security should be a top priority for any web application. This article covers common vulnerabilities and how to protect your applications from attacks.",
    excerpt: "Learn essential security practices to protect your web applications.",
    user: admin_user,
    published: false,
    tag_names: ["security", "best-practices", "backend"]
  }
]

posts_data.each do |post_data|
  tag_names = post_data.delete(:tag_names)
  post = Post.create!(post_data)
  
  # Add tags to post
  tag_names.each do |tag_name|
    tag = tags.find { |t| t.name == tag_name }
    post.tags << tag if tag
  end
  
  # Set published_at for published posts
  if post.published?
    post.update!(published_at: rand(30.days).seconds.ago)
  end
end

puts "✅ Created #{Post.count} posts"

# Create Comments
puts "Creating comments..."

comments_data = [
  {
    body: "Great article! This really helped me understand Rails 7 better. The examples are clear and easy to follow.",
    user: author2,
    post: Post.find_by(title: "Getting Started with Ruby on Rails 7"),
    approved: true
  },
  {
    body: "Thanks for sharing these CSS techniques. Grid and Flexbox have really changed how I approach layouts.",
    user: author1,
    post: Post.find_by(title: "Modern CSS Techniques for Better Web Design"),
    approved: true
  },
  {
    body: "The API tutorial is exactly what I was looking for. Could you add a section about API versioning?",
    user: admin_user,
    post: Post.find_by(title: "Building RESTful APIs with Rails"),
    approved: true
  },
  {
    body: "React Hooks can be confusing at first, but this guide makes them much clearer. Thank you!",
    user: admin_user,
    post: Post.find_by(title: "React Hooks: A Complete Guide"),
    approved: true
  },
  {
    body: "Database optimization is so important. I've seen too many apps with performance issues due to poor queries.",
    user: author2,
    post: Post.find_by(title: "Database Optimization Tips for Rails Applications"),
    approved: true
  },
  {
    body: "This is spam content with suspicious links. Should not be approved.",
    user: author1,
    post: Post.published.first,
    approved: false
  }
]

comments_data.each do |comment_data|
  Comment.create!(comment_data)
end

puts "✅ Created #{Comment.count} comments"

puts "🎉 Database seeding completed successfully!"
puts ""
puts "📊 Summary:"
puts "  Users: #{User.count}"
puts "  Posts: #{Post.count} (#{Post.published.count} published, #{Post.draft.count} drafts)"
puts "  Tags: #{Tag.count}"
puts "  Comments: #{Comment.count} (#{Comment.approved.count} approved, #{Comment.pending.count} pending)"
puts ""
puts "🔑 Login credentials:"
puts "  Admin: admin@example.com / password123"
puts "  Author 1: john@example.com / password123"
puts "  Author 2: jane@example.com / password123"
