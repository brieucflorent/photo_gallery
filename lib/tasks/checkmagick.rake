task :checkmagick => :environment do
  image = MiniMagick::Image.open("/media/vboxshared/zitawebsite/DSC6648.jpg")
  image.resize "100x100"
  image.write  "/media/vboxshared/zitawebsite/output.jpg"
  puts "hello"+ MiniMagick.processor
  
end