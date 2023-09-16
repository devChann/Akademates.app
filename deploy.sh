echo "Building application"

yarn run build
echo "Deploying files to server"
scp -r build/* chann@24.144.120.53:/var/www/html/build/

echo "Done"