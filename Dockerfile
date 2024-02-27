FROM php:8.2.12-apache
COPY . /var/www/html
RUN echo "DirectoryIndex frontend.html back_end.php" >> /etc/apache2/apache2.conf
EXPOSE 80
