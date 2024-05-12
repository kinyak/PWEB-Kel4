# Web Pengelolaan Data Alumni

## Panduan Penggunaan

1. **Clone repo ini**

```bash
git clone https://github.com/kinyak/PWEB-Kel4
```

2. **Install semua depedensi yang diperlukan**

```bash
npm install
```

3. **Hidupkan MySQL XAMPP dan buat database & setting koneksi db pada config/config.json**

```json
"development": {
  "username": "root",
  "password": null,
  "database": "alumnifti",
  "host": "localhost",
  "port" : 3307,
  "dialect": "mysql"
}
```

4. **Lakukan migrasi tabel dari Express ke MySQL**

```bash
npx sequelize-cli db:migrate
```

5. **Jalankan seeder untuk mengirim data contoh ke database**

```bash
npx sequelize-cli db:seed:all
```

6. **Jalankan Express dengan perintah**

```bash
npm run dev # untuk pengembangan
npm run start # untuk menjalankan sekali
```

7. **Untuk push perubahan silahkan buatlah branch baru terlebih dahulu**

```bash
git checkout <nama_branch>
git add .
git commit -m "lihat profil"
git push -u origin <nama_branch>
```

## Pembagian Tugas

1. Authentikasi - Meutia Dewi Putri Kartika ✅
2. Lihat Profil - Rendi Kurniawan ✅
3. Ubah Kata Sandi - Faiz Al-Dzikro ✅