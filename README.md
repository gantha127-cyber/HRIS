# HRIS - Human Resource Information System

HRIS (Human Resource Information System) adalah aplikasi berbasis web untuk membantu pengelolaan data dan aktivitas sumber daya manusia dalam perusahaan.

Project ini dibangun menggunakan React pada sisi frontend dan Node.js + Express pada sisi backend dengan MySQL sebagai database.

## ✨ Fitur

- 🔐 Login & Authentication
- 📊 Dashboard statistik
- 👥 Manajemen data karyawan
- 🏢 Manajemen department
- 💼 Manajemen position
- 📅 Manajemen attendance
- 📝 Manajemen pengajuan cuti
- 💰 Manajemen payroll
- 📷 Upload foto karyawan
- 🔒 Protected route
- 🗄️ Integrasi database MySQL
- 📱 Responsive dashboard

## 🛠️ Teknologi

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Recharts
- Lucide React
- SweetAlert2

### Backend

- Node.js
- Express.js
- MySQL
- mysql2
- JWT
- bcrypt
- dotenv
- CORS

## 📁 Struktur Project

```text
HRIS/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── app.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md