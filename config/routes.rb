Rails.application.routes.draw do
  # 语言切换路由 - Language switching routes
  get '/switch_locale/:locale', to: 'locales#switch', as: :switch_locale

  # 国际化路由包装 - Internationalization route wrapper
  scope "(:locale)", locale: /#{I18n.available_locales.join("|")}/ do
    # Devise routes for user authentication
    devise_for :users

    # Root route
    root 'home#index'

  # Posts routes with nested comments
  resources :posts do
    resources :comments, except: [:index, :show] do
      member do
        patch :approve
        patch :reject
      end
    end
  end

  # Tag routes
  resources :tags, only: [:index, :show], param: :slug

  # Bookmarks routes - 收藏网址路由
  resources :bookmarks, only: [:index, :show] do
    collection do
      get :featured
      get :search
    end
    member do
      patch :increment_views
      patch :toggle_like
    end
  end

  # Admin routes (if needed)
  namespace :admin do
    resources :posts do
      member do
        patch :publish
        patch :unpublish
      end
    end
    resources :comments, only: [:index, :show, :destroy] do
      member do
        patch :approve
        patch :reject
      end
    end
    resources :tags
    resources :users, only: [:index, :show, :edit, :update, :destroy]
  end

  # API routes (if needed for future expansion)
  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :show]
      resources :tags, only: [:index, :show]
    end
  end

    # Health check
    get '/health', to: proc { [200, {}, ['OK']] }
  end # 结束国际化路由包装 - End internationalization route wrapper
end
