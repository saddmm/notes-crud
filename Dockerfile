FROM node:20 AS builder

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json terlebih dahulu untuk memanfaatkan cache Docker
COPY package*.json ./

# Instal semua dependensi, termasuk devDependencies untuk proses build
RUN npm install

# Salin sisa kode sumber aplikasi
COPY . .

# Jalankan skrip build untuk mengkompilasi TypeScript
RUN npm run build

# ---- Stage 2: Production ----
# Tahap ini membuat image akhir yang ramping untuk produksi
FROM node:20-alpine

WORKDIR /app

# Salin package.json dan package-lock.json lagi
COPY package*.json ./

# Hanya instal dependensi produksi untuk menjaga ukuran image tetap kecil
RUN npm ci --only=production

# Salin hasil build dari tahap 'builder' ke image produksi
COPY --from=builder /app/dist ./dist

# Ganti ke pengguna non-root 'node' untuk keamanan yang lebih baik
USER node

# Expose port yang digunakan oleh aplikasi Express Anda (misalnya 3000)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi saat container dimulai
CMD ["node", "dist/index.js"]