# Pin npm packages by running ./bin/importmap

pin "application", to: "application.js", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true

# Stimulus controllers
pin "controllers/application", to: "controllers/application.js"
pin "controllers/lottie_hero_controller", to: "controllers/lottie_hero_controller.js"
pin "controllers/theme_toggle_controller", to: "controllers/theme_toggle_controller.js"
pin "controllers/dropdown_controller", to: "controllers/dropdown_controller.js"
pin "controllers/search_controller", to: "controllers/search_controller.js"
pin "controllers/lottie_color_sync_controller", to: "controllers/lottie_color_sync_controller.js"

# Lottie animation library
pin "lottie-web", to: "https://ga.jspm.io/npm:lottie-web@5.12.2/build/player/lottie.min.js"
