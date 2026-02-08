🎮 GameSync - Smart Mabar Planner & Real-Time Chat
GameSync adalah platform manajemen komunitas gaming yang dirancang untuk mempermudah koordinasi jadwal main bareng (mabar) menggunakan teknologi AI Planner dan sistem komunikasi real-time berbasis WebSocket.

📋 Table of Contents






🛠 Tech Stack
Frontend
React.js (TypeScript): Untuk logika antarmuka yang kuat dan type-safe.

Tailwind CSS: Desain modern dengan pendekatan utility-first.

Lucide React: Library ikon untuk visualisasi role dan menu.

React Router DOM: Manajemen navigasi dan protected routes.

Backend (Planned Integration)
Java Spring Boot: Sebagai core sistem backend (API & WebSocket).

Spring Security (JWT): Untuk autentikasi tingkat lanjut.

PostgreSQL: Database relasional untuk menyimpan data User, Squad, dan Schedule.

📂 Project Structure
🔐 Authentication & Role System
GameSync menggunakan sistem Role-Based Access Control (RBAC) untuk memberikan pengalaman unik bagi setiap pengguna:

💬 Chat & WebSocket Flow
Sistem komunikasi dirancang untuk mendukung interaksi high-concurrency yang akan dihubungkan ke Spring Boot STOMP Broker:

Connection: Saat dashboard dimuat, client membuka koneksi ke /ws-gamesync.

Subscription: Client melakukan subscribe ke topic spesifik (misal: /topic/squad/{squadId}).

Visual Identity:

Pesan Admin: Border merah menyala untuk instruksi sistem penting.

Pesan Leader: Aksen emas/amber untuk komando tim.

Pesan Anggota: Tampilan standar yang bersih dan fokus pada keterbacaan.

🚀 Future Roadmap
Sebagai Backend Developer, pengembangan akan difokuskan pada penguatan infrastruktur data:

[ ] Phase 1: Migrasi dari dummy data ke REST API Spring Boot.

[ ] Phase 2: Implementasi WebSocket nyata untuk chat antar anggota squad.

[ ] Phase 3: Integrasi Gemini AI untuk fitur "Auto-Schedule" (AI akan menyarankan waktu mabar terbaik berdasarkan kesibukan anggota).

[ ] Phase 4: Fitur Announcement khusus Admin/Leader yang muncul di bagian atas dashboard.

👨‍💻 Developer
Name: Jufrin

Role: Backend Developer

Origin: Bima, NTB

Tech Interests: Java Spring Boot, Audio Video Engineering, Gaming.
