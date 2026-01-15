FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    curl \
    openssl \
    && rm -rf /var/cache/apk/*

# Copy PHP files
COPY ga4-analytics.php /var/www/html/
COPY ga4-service-account-key.json /var/www/html/

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod 600 /var/www/html/ga4-service-account-key.json

# Expose port
EXPOSE 8080

# Start Nginx and PHP-FPM
CMD sh -c "php-fpm -D && nginx -g 'daemon off;'"
