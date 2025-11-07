source "https://rubygems.org"

# Rails
gem "rails", "~> 8.1.1"

# Veritabanı
gem "sqlite3", ">= 2.1"

# Web server
gem "puma", ">= 5.0"

# Authentication & Security
gem 'jwt'
gem 'bcrypt', '~> 3.1.7'
gem 'rack-cors'

# Frontend testler ve browser otomasyonu
gem 'capybara', '~> 3.40'
gem 'cuprite' # Headless Chrome alternatif tarayıcı, Selenium yerine

# Windows platformları için gerekli
gem "tzinfo-data", platforms: %i[windows jruby]

# Solid gemleri
gem "solid_cache"
gem "solid_queue"
gem "solid_cable"

# Boot optimizasyonu
gem "bootsnap", require: false

# Deployment ve HTTP hızlandırma
gem "kamal", require: false
gem "thruster", require: false

# Optional: Image processing, uncomment if needed
# gem "image_processing", "~> 1.2"

group :development, :test do
  # Debugging
  gem "debug", platforms: %i[mri windows], require: "debug/prelude"

  # Security analysis
  gem "brakeman", require: false

  # Ruby style guide / linting
  gem "rubocop-rails-omakase", require: false
end

group :test do
  gem 'cucumber-rails', require: false
  gem 'capybara', '~> 3.40'
  gem 'cuprite'
  gem 'ferrum'
  gem 'rspec-rails'
end

