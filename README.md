# Notes CRUD API

REST API untuk operasi CRUD Notes dengan autentikasi JWT menggunakan Node.js, TypeScript, Express, TypeORM, dan MySQL.

## 🚀 Cara Menjalankan Program

### Prasyarat
- Docker dan Docker Compose terinstall (Untuk DB dan phpmyadmin)
- Node.js 18+ (untuk development tanpa Docker)

### 1.  Full Docker

```bash
# Clone repository
https://github.com/saddmm/notes-crud.git

# Jalankan Docker Compose
docker compose up

#Tunggu sampai terdapat pesan "Database Connected"
Aplikasi siap di jalankan
http://localhost:3000/api

```

### 2. Menjalankan tanpa build docker

Hapus bagian ini dari docker-compose.yml
```bash
  app:
    build: .
    container_name: crud-notes
    restart: always
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - DB_USERNAME=${DB_USERNAME}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_NAME=${DB_NAME}
      - DB_PORT=${DB_PORT}
    depends_on:
      - db
```

Kemudian jalankan

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
