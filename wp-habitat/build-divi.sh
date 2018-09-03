cp -R ../vizs ./
cp -R ../data ./
cp -R ../js ./
cp -R ../css ./

# sudo npm install uglifyjs --global
# sudo npm install cssnano cssnano-cli --global
# npm install html-minifier -g

echo "compress html files"

for file in $(find ./vizs -type f -name "*.html"); do
  echo "compressing $file"
  html-minifier $file --remove-comments --collapse-whitespace --minify-js --minify-css -o $file;
done

echo "compress css files"

for file in ./css/*; do
  targetFile=$(echo $file | awk -F '/' '{print $NF}')
  echo "compressing $file to ./css/$targetFile"
  cssnano $file ./css/$(echo $file | awk -F '/' '{print $NF}');
done

echo "compress js files"

for file in ./js/*; do
  targetFile=$(echo $file | awk -F '/' '{print $NF}')
  echo "compressing $file to ./js/$targetFile"
  uglifyjs $file --compress hoist_vars=true,unused=false --mangle -o ./js/$targetFile;
done
