require 'capybara/cucumber'

# Basit driver kullan (JS olmadan)
Capybara.default_driver = :rack_test
Capybara.javascript_driver = :rack_test # JS testlerini JS driver olmadan çalıştır

# Base URL (Rails server çalışıyorsa gerek yok)
Capybara.app_host = 'http://localhost:3000'
