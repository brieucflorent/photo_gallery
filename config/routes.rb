Rottenpotatoes::Application.routes.draw do


  root :to => "photos#index"
  #devise_for :users,:controllers => {:registrations => 'registrations' }
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  #match '/auth/:provider/callback', :to => 'authentications#create'  
  
  devise_scope :user do
     get '/users/auth/:provider' => 'users/omniauth_callbacks#passthru'
  end
  
  get '/photos' => 'photos#index'
  
  post "photos/contacts"
  delete "photos/contacts_logoff"
  
  offline = Rack::Offline.configure do
      #cache "/"
      #cache "assets/facebook_32.png"
      cache "http://personal.zitaoravecz.net/assets/jquery.mCustomScrollbar.js"
      Dir["app/assets/javascripts/*.js"].each do |file|
      #cache file.relative_path_from(public_path)
        cache "http://personal.zitaoravecz.net/" + file.gsub("app/","").gsub("javascripts/","") 
      end
      
      Dir["app/assets/images/*.*"].each do |file|
      #cache file.relative_path_from(public_path)
        cache "http://personal.zitaoravecz.net/" + file.gsub("app/","").gsub("images/","") 
      end
      
      Dir["app/assets/stylesheets/*.*"].each do |file|
        #cache file.relative_path_from(public_path)
        cache "http://personal.zitaoravecz.net/" + file.gsub("app/","").gsub("stylesheets/","") 
      end
      
      Photo.all.each do |photo|
        cache photo.imagefile_url
        cache photo.imagefile_url(:thumb)
      end
      
      network "http://*"      
  end
  get '/application.manifest' => offline

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products
  

  #resources :movies,:only => [:index]
  
  
  
  # resources :albums do
     # resources :photo, :only => [:create, :destroy]
  # end
  

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end
  

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  namespace :admin do
       # Directs /admin/products/* to Admin::ProductsController
       # (app/controllers/admin/products_controller.rb)
       
     root :to => "albums#index"
     
     get "photos/uploader"
     post "photos/uploader"
     get "albums/:id/select_album",:controller => 'albums',:action => 'select_album'
     resources :photos
     resources :albums
     
  end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
