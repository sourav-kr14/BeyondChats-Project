# Stage 1: Build dependencies
FROM composer:2.7 as builder
WORKDIR /app
COPY . .
# Install production dependencies only
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Stage 2: Production environment
FROM php:8.2-apache
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql

# Enable Apache mod_rewrite for Laravel
RUN a2enmod rewrite

# Point Apache to Laravel's public directory
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copy application and dependencies from builder stage
COPY --from=builder /app /var/www/html
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Start command handles migrations and starts Apache
CMD php artisan migrate --force && apache2-foreground