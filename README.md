# Notes CRUD API

REST API untuk operasi CRUD Notes dengan autentikasi JWT menggunakan Node.js, TypeScript, Express, TypeORM, dan MySQL.

## 🚀 Cara Menjalankan Program

### Prasyarat
- Docker dan Docker Compose terinstall (Untuk DB dan phpmyadmin)
- Node.js 18+ (untuk development tanpa Docker)

### 1.  Cara menjalankan

```bash
# Clone repository
https://github.com/saddmm/notes-crud.git

# Install dependencies
npm install

# Install MySQL & PhpMyAdmin (via docker)
docker compose up

# Jalankan development server
npm run dev

# Atau build dan jalankan production
npm run build
npm start
```

### 3. Environment Variables

File `.env` berisi konfigurasi berikut:
```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=notes
PORT=3000
JWT_SECRET=your-secret-key(string acak)
```

### Documentation
- `GET /api-docs` - Swagger API Documentation

### Database Connection Issues
1. Pastikan MySQL container sudah running
2. Cek credentials database di `.env`
3. Tunggu beberapa detik agar MySQL fully initialized
