source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

# ruby "3.3.4"
ruby '>= 3.0.0'


# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.2.2"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "sprockets-rails", ">= 3.4.0"

# Use mysql2 as the database for Active Record
gem "mysql2", "~> 0.5"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 6.0"

# Use JavaScript with ESM import maps [https://github.com/rails/importmap-rails]
gem "importmap-rails"

# Hotwire's SPA-like page accelerator [https://github.com/hotwired/turbo-rails]
gem "turbo-rails"

# Hotwire's modest JavaScript framework [https://github.com/hotwired/stimulus-rails]
gem "stimulus-rails"

# Use Tailwind CSS [https://github.com/rails/tailwindcss-rails]
gem "tailwindcss-rails"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Use Redis adapter to run Action Cable in production
gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://github.com/bcrypt-ruby/bcrypt-ruby]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Sass to process CSS
# gem "sassc-rails"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing", "~> 1.2"

# Core Functionality Gems
gem "devise"                    # Authentication
gem "pundit"                    # Authorization
gem "friendly_id"               # Human-readable URLs
gem "kaminari"                  # Pagination
gem "ransack"                   # Advanced searching/filtering

# Frontend Gems
gem "view_component"            # Component-based view architecture

# Optional Enhancement Gems
gem "acts-as-taggable-on"       # Advanced tagging functionality
gem "meta-tags"                 # SEO optimization
gem "sitemap_generator"         # SEO sitemap generation
gem "aws-sdk-s3"                # Amazon S3 storage for production

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
  
  # Testing Framework
  gem "rspec-rails"             # Testing framework
  gem "factory_bot_rails"       # Test data generation
  gem "faker"                   # Fake data for testing
  gem "shoulda-matchers"        # Test matchers for common Rails functionality
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  # gem "rack-mini-profiler"

  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
  
  # Development & Code Quality
  gem "simplecov"               # Test coverage analysis
  gem "rubocop-rails"           # Code style enforcement
  gem "brakeman"                # Security vulnerability scanner
  gem "bullet"                  # N+1 query detection
  gem "dotenv-rails"            # Environment variable management
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end
