# MMohsin Travel - Laravel Backend Setup Guide

## Prerequisites

- PHP 8.2 or higher
- Composer
- MySQL Server (via XAMPP/Laragon)
- phpMyAdmin

## Installation Steps

### 1. Start MySQL Server
- Open XAMPP Control Panel
- Click "Start" next to MySQL
- Verify MySQL is running (should show port 3306)

### 2. Create Database in phpMyAdmin
- Open phpMyAdmin (http://localhost/phpmyadmin)
- Click "New" in the left sidebar
- Create a database named: `mmohsin_travel`
- Character set: `utf8mb4_unicode_ci`
- Click "Create"

### 3. Environment Configuration
The `.env` file is already configured for MySQL:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mmohsin_travel
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Run Migrations
```bash
cd backend
php artisan migrate
```

### 5. Seed Admin User
```bash
php artisan db:seed
```

This creates:
- **Email:** admin@mmohsintravel.com
- **Password:** password123

### 6. Start Development Server
```bash
php artisan serve
```

The API will be available at: `http://localhost:8000`

---

## API Endpoints

### Authentication (Public)
- `POST /api/login` - Login and get auth token

### Protected Routes (Require Admin Token)
- `POST /api/logout` - Logout
- `GET /api/me` - Get current user

### Umrah Packages (CRUD)
- `GET /api/umrah-packages` - List all (public)
- `GET /api/umrah-packages/{id}` - Get one (public)
- `POST /api/umrah-packages` - Create (protected)
- `PUT /api/umrah-packages/{id}` - Update (protected)
- `DELETE /api/umrah-packages/{id}` - Delete (protected)

### Destinations (CRUD)
- `GET /api/destinations` - List all (public)
- `GET /api/destinations/{id}` - Get one (public)
- `POST /api/destinations` - Create (protected)
- `PUT /api/destinations/{id}` - Update (protected)
- `DELETE /api/destinations/{id}` - Delete (protected)

### Airlines (CRUD)
- `GET /api/airlines` - List all (public)
- `GET /api/airlines/{id}` - Get one (public)
- `POST /api/airlines` - Create (protected)
- `PUT /api/airlines/{id}` - Update (protected)
- `DELETE /api/airlines/{id}` - Delete (protected)

### Team Members (CRUD)
- `GET /api/team-members` - List all (public)
- `GET /api/team-members/{id}` - Get one (public)
- `POST /api/team-members` - Create (protected)
- `PUT /api/team-members/{id}` - Update (protected)
- `DELETE /api/team-members/{id}` - Delete (protected)

### Counter Stats (CRUD)
- `GET /api/counter-stats` - List all (public)
- `POST /api/counter-stats` - Create (protected)
- `PUT /api/counter-stats/{id}` - Update (protected)
- `DELETE /api/counter-stats/{id}` - Delete (protected)

### Site Settings (Singleton)
- `GET /api/site-settings` - Get settings (public)
- `POST /api/site-settings` - Create (protected)
- `PUT /api/site-settings` - Update (protected)

### About Content (Singleton)
- `GET /api/about-content` - Get content (public)
- `POST /api/about-content` - Create (protected)
- `PUT /api/about-content` - Update (protected)

---

## Authentication Usage

### 1. Login
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mmohsintravel.com","password":"password123"}'
```

Response:
```json
{
  "user": { "id": 1, "name": "Admin", "email": "admin@mmohsintravel.com" },
  "token": "1|abcd1234..."
}
```

### 2. Use Token in Protected Requests
```bash
curl -X GET http://localhost:8000/api/umrah-packages \
  -H "Authorization: Bearer 1|abcd1234..."
```

---

## Database Tables

1. **users** - Admin users
2. **umrah_packages** - Umrah package offerings
3. **destinations** - Flight destinations
4. **airlines** - Airline partners
5. **team_members** - Company team
6. **counter_stats** - Dashboard statistics
7. **site_settings** - Company info & settings
8. **about_content** - About page content
9. **personal_access_tokens** - Sanctum auth tokens

---

## Key Files

- `routes/api.php` - API route definitions
- `app/Http/Controllers/Api/` - API controllers
- `app/Models/` - Data models
- `database/migrations/` - Database schemas
- `database/seeders/` - Data seeders
- `.env` - Environment configuration
- `config/sanctum.php` - Authentication config
- `config/cors.php` - CORS configuration

---

## Troubleshooting

### MySQL Not Running
- Start MySQL from XAMPP Control Panel
- Verify connection in .env file

### Migrations Fail
- Check database exists: `mmohsin_travel`
- Drop and recreate if needed: `php artisan migrate:fresh`
- Run seeder: `php artisan db:seed`

### Port Already in Use
- Change port in `.env`: `APP_URL=http://localhost:8001`
- Run: `php artisan serve --port=8001`

### CORS Errors in Frontend
- Ensure frontend URL is in `config/cors.php`
- Default allowed: localhost:3000, :5173, :8080

---

## Next Steps

1. ✅ Database created
2. ✅ Models & migrations set up
3. ✅ Controllers with CRUD logic
4. ✅ API routes defined
5. ✅ Authentication configured
6. 📋 Start MySQL & run migrations
7. 📋 Connect frontend to API endpoints
8. 📋 Update frontend login to use new backend auth
