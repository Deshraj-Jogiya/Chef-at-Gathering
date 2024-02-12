sudo rm -rf /var/www/build/
sudo mkdir /var/www/build/
sudo scp -r ./build/* /var/www/build/
sudo service nginx restart