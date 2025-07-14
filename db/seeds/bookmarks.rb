# 书签种子数据 - Bookmark seed data
# Creating sample bookmarks for demonstration

puts "Creating bookmarks..."

bookmarks_data = [
  {
    title: "Dribbble - Discover the World's Top Designers",
    description: "Dribbble is the leading destination to find & showcase creative work and home to the world's best design professionals.",
    url: "https://dribbble.com",
    category: "Design",
    tags: ["design", "inspiration", "portfolio", "ui", "ux"],
    featured: true,
    image_url: "https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg"
  },
  {
    title: "Behance - Creative Portfolios",
    description: "Showcase and discover creative work on the world's leading online platform for creative industries.",
    url: "https://behance.net",
    category: "Design",
    tags: ["portfolio", "creative", "design", "photography"],
    featured: true,
    image_url: "https://a5.behance.net/2cb2a94c4a6407e71c4e2d68bb5b6b8b7e8b8b8b.png"
  },
  {
    title: "GitHub - Where the world builds software",
    description: "GitHub is where over 100 million developers shape the future of software, together.",
    url: "https://github.com",
    category: "Development",
    tags: ["code", "git", "development", "open-source", "collaboration"],
    featured: true,
    image_url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  },
  {
    title: "CodePen - Online Code Editor",
    description: "An online code editor, learning environment, and community for front-end web development.",
    url: "https://codepen.io",
    category: "Development",
    tags: ["code", "frontend", "html", "css", "javascript"],
    featured: false,
    image_url: "https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico"
  },
  {
    title: "Awwwards - Website Awards",
    description: "Awwwards are the Website Awards that recognize and promote the talent and effort of the best developers, designers and web agencies in the world.",
    url: "https://awwwards.com",
    category: "Inspiration",
    tags: ["awards", "websites", "inspiration", "design", "development"],
    featured: true,
    image_url: "https://assets.awwwards.com/awards/images/2014/09/awwwards-logo-2014.svg"
  },
  {
    title: "Figma - Collaborative Design Tool",
    description: "Figma is a collaborative web application for interface design, with additional offline features enabled by desktop applications.",
    url: "https://figma.com",
    category: "Tools",
    tags: ["design", "prototyping", "collaboration", "ui", "ux"],
    featured: true,
    image_url: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png"
  },
  {
    title: "Unsplash - Beautiful Free Images",
    description: "Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos.",
    url: "https://unsplash.com",
    category: "Resources",
    tags: ["photos", "free", "stock", "images", "photography"],
    featured: false,
    image_url: "https://unsplash.com/favicon-32x32.png"
  },
  {
    title: "LottieFiles - Lightweight Animations",
    description: "LottieFiles is a collection of animations designed for Lottie - gone are the days of heavy GIFs and videos!",
    url: "https://lottiefiles.com",
    category: "Resources",
    tags: ["animation", "lottie", "motion", "graphics", "json"],
    featured: true,
    image_url: "https://static.lottiefiles.com/images/favicon/lottiefiles-favicon-32x32.png"
  },
  {
    title: "Framer - Interactive Design Tool",
    description: "Framer is a web-based tool for creating interactive designs and prototypes.",
    url: "https://framer.com",
    category: "Tools",
    tags: ["prototyping", "interaction", "design", "animation"],
    featured: false,
    image_url: "https://framerusercontent.com/images/favicon-32x32.png"
  },
  {
    title: "Tailwind CSS - Utility-First CSS Framework",
    description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
    url: "https://tailwindcss.com",
    category: "Development",
    tags: ["css", "framework", "utility", "responsive", "design"],
    featured: true,
    image_url: "https://tailwindcss.com/favicons/favicon-32x32.png"
  },
  {
    title: "Pinterest - Discover Ideas",
    description: "Discover recipes, home ideas, style inspiration and other ideas to try.",
    url: "https://pinterest.com",
    category: "Inspiration",
    tags: ["inspiration", "ideas", "visual", "discovery"],
    featured: false,
    image_url: "https://s.pinimg.com/webapp/favicon-32x32.png"
  },
  {
    title: "Notion - All-in-one Workspace",
    description: "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team.",
    url: "https://notion.so",
    category: "Tools",
    tags: ["productivity", "workspace", "notes", "collaboration"],
    featured: false,
    image_url: "https://www.notion.so/images/favicon.ico"
  }
]

bookmarks_data.each do |bookmark_attrs|
  bookmark = Bookmark.find_or_create_by(url: bookmark_attrs[:url]) do |b|
    b.title = bookmark_attrs[:title]
    b.description = bookmark_attrs[:description]
    b.category = bookmark_attrs[:category]
    b.tags = bookmark_attrs[:tags]
    b.featured = bookmark_attrs[:featured]
    b.image_url = bookmark_attrs[:image_url]
    b.published = true
    b.published_at = Time.current
    b.views_count = rand(100..5000)
    b.likes_count = rand(10..500)
  end
  
  puts "Created bookmark: #{bookmark.title}"
end

puts "Created #{Bookmark.count} bookmarks"
puts "Featured bookmarks: #{Bookmark.featured.count}"
puts "Categories: #{Bookmark.group(:category).count}"
