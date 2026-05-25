# Product Service (Port 3002) — Software Architecture Project

Layanan ini mengelola seluruh operasional produk, kategori menu, dan manajemen inventori (stok) dalam arsitektur microservices. 

## Tech Stack & Fitur
* **Framework**: NestJS (TypeScript)
* **Database ORM**: Prisma Client (MySQL)
* **Dokumentasi API**: Swagger UI (OpenAPI)
* **Validasi**: Class-Validator (Global Validation Pipe)
* **Otorisasi**: Custom `RolesGuard` dengan dukungan otorisasi ganda (JWT & Mock Role Header)

---

##  Panduan Instalasi & Menjalankan Project

Ikuti langkah berikut untuk menyiapkan database dan menjalankan service:

### 1. Prasyarat Database
Nyalakan server MySQL lokal Anda (lewat XAMPP/Laragon) dan buatlah database kosong bernama:
```sql
CREATE DATABASE product_service;
```

### 2. Jalankan Perintah Setup
Buka terminal di folder `product-service2` dan jalankan perintah berikut secara berurutan:

```powershell
# 1. Instal seluruh dependensi project
npm install

# 2. Sinkronisasikan model schema Prisma ke MySQL Anda secara otomatis
npx prisma db push

# 3. Generate Prisma Client untuk autocomplete dan tipe data
npx prisma generate

# 4. Jalankan aplikasi dalam mode Development (Watch mode)
npm run start:dev
```

Aplikasi Anda kini aktif di **`http://localhost:3002`** dan Swagger UI siap diakses di **`http://localhost:3002/api`**!


## Daftar Endpoint API & Dokumentasi

Berikut adalah daftar rute API yang tersedia di Product Service:

### 1. Katalog Publik (Akses Bebas)
| Method | Route | Fungsi |
| :--- | :--- | :--- |
| **GET** | `/products` | Mengambil seluruh produk beserta kategori relasionalnya |
| **GET** | `/products/:id` | Mengambil detail lengkap produk berdasarkan ID |
| **GET** | `/categories` | Mengambil daftar seluruh kategori menu yang ada |
| **GET** | `/categories/:categoryId/products` | Memfilter daftar produk yang tergolong dalam Category ID tertentu |

### 2. Manajemen Produk Admin (CRUD — POST Method)
*Hanya dapat diakses pengguna dengan peran **`Admin`**.*

| Method | Route | Fungsi |
| :--- | :--- | :--- |
| **POST** | `/admin/products` | Menambahkan rekaman produk baru ke database |
| **POST** | `/admin/products/:id/update` | Memperbarui informasi detail produk tertentu |
| **POST** | `/admin/products/:id/reduce` | Mengurangi kuantitas stok produk (misal saat checkout) |
| **POST** | `/admin/products/:id/delete` | Menghapus rekaman produk secara permanen dari database |

---

## Aturan Validasi Input & Keamanan

### 1. Validasi Input (DTO)
Semua input request untuk Admin CRUD divalidasi ketat secara global:
* **Product Name**: Minimal harus terdiri dari **3 kata** (contoh: `lilisa satoru fushiguro`).
* **Description**: Minimal harus terdiri dari **20 karakter**.
* **Price**: Harus berupa integer positif minimal bernilai **1**.
* **Stock**: Harus bernilai antara **0** sampai dengan **999**.
* **Category ID**: Harus berupa integer valid yang terdaftar pada tabel `Category`.