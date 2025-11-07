Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Login endpoint
      post '/login', to: 'sessions#create'
      
      # Diğer kaynaklar
      resources :departmanlar do
        get :calisans, on: :member
      end
      
      resources :calisans do
        get :vardiyalar, on: :member
      end
      
      resources :vardiyalar
    end
  end
end
