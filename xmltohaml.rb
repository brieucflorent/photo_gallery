require "xml-to-haml"


f=File.open("myxml.xml","r") 
content=""
f.each do |line|
 content << line
end





xtoh=XMLtoHAML.new(content)
print xtoh.to_s
