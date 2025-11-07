# Vardiya Sistemi

Vardiya yönetimi ve çalışan/departman takibi için geliştirilmiş bir Ruby on Rails + React uygulaması. Bu proje, ödev kapsamında hem backend hem frontend testlerini içermektedir.

## Proje Yapısı
```
vardiya_sistemi/
├── backend/          # Ruby on Rails API
│   ├── app/
│   ├── config/
│   ├── db/
│   └── features/     # Cucumber test senaryoları
├── frontend/         # Next.js React uygulaması
│   ├── src/
│   ├── public/
│   └── cypress/      # Cypress E2E testleri
└── README.md
```

## Teknoloji Stack

- **Backend:** Ruby on Rails (API-only mode)
- **Frontend:** React (Next.js framework)
- **Database:** SQLite (geliştirme/test), PostgreSQL (production)
- **Test Araçları:**
  - Cucumber + Capybara (BDD testleri)
  - Cypress (End-to-end testler)
  - Postman (API testleri)

**Geliştirme Portları:**
- Backend API: http://localhost:3002
- Frontend: http://localhost:3001

## Gereksinimler

Projeyi çalıştırmadan önce aşağıdaki yazılımların sisteminizde kurulu olduğundan emin olun:

- Ruby 3.x veya üzeri
- Rails 8.x veya üzeri
- Node.js 20.x veya üzeri
- npm 10.x veya üzeri
- SQLite3 (geliştirme ve test ortamı için)
- PostgreSQL (opsiyonel, production ortamı için)

Versiyonları kontrol etmek için:
```bash
ruby -v
rails -v
node -v
npm -v
```

## Kurulum

Repository'yi klonlama:
```bash
git clone https://github.com/Sudeyazicii/vardiya_y-netim_sistemi.git
cd vardiya_y-netim_sistemi
```

Backend kurulumu:
```bash
cd backend
bundle install
rails db:create
rails db:migrate
rails db:seed
```

Frontend kurulumu:
```bash
cd ../frontend
npm install
```

## Çalıştırma

Backend sunucusunu başlatma:
```bash
cd backend
rails s -p 3002
```

Backend artık http://localhost:3002 adresinde çalışıyor.

API'nin çalıştığını test etmek için:
```bash
curl http://localhost:3002/api/departments
```

Frontend sunucusunu başlatma (yeni bir terminal penceresi açın):
```bash
cd frontend
npm run dev
```

Frontend artık http://localhost:3001 adresinde çalışıyor.

Tarayıcınızda http://localhost:3001 adresini açarak uygulamayı görüntüleyebilirsiniz.

## Test Senaryoları

Cucumber (BDD) testleri:
```bash
cd backend
bundle exec cucumber
```

**Test Kapsamı:**
- Departman CRUD işlemleri
- Çalışan CRUD işlemleri
- Vardiya CRUD işlemleri
- İlişkisel veri bütünlüğü

Cypress (E2E) testleri:
```bash
cd frontend
npx cypress run
```

**Test Kapsamı:**
- Kullanıcı login/logout akışları
- Sayfa navigasyonları
- Form validasyonları
- CRUD operasyonları

## API Dokümantasyonu

**GET /api/departments**
```json
[
  {
    "id": 1,
    "name": "Bilgi İşlem",
    "created_at": "2025-01-01T10:00:00.000Z",
    "updated_at": "2025-01-01T10:00:00.000Z"
  }
]
```

**GET /api/employees**
```json
[
  {
    "id": 1,
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "department_id": 1,
    "created_at": "2025-01-01T10:00:00.000Z",
    "updated_at": "2025-01-01T10:00:00.000Z"
  }
]
```

**GET /api/shifts**
```json
[
  {
    "id": 1,
    "employee_id": 1,
    "start_time": "2025-01-01T09:00:00.000Z",
    "end_time": "2025-01-01T17:00:00.000Z",
    "shift_type": "sabah",
    "created_at": "2025-01-01T08:00:00.000Z",
    "updated_at": "2025-01-01T08:00:00.000Z"
  }
]
```

## Kullanım Adımları

1. Backend'i başlatın:
```bash
cd backend && rails s -p 3002
```

2. Frontend'i başlatın:
```bash
cd frontend && npm run dev
```

3. Tarayıcıda açın:
   - Ana sayfa: http://localhost:3001
   - API endpoint'leri: http://localhost:3002/api

4. Testleri çalıştırın:
```bash
# Cucumber testleri
cd backend && bundle exec cucumber

# Cypress testleri
cd frontend && npx cypress run
```

## Deployment Notları

Production ortamı için:

1. Environment Variables ayarlayın:
```bash
DATABASE_URL=postgresql://...
SECRET_KEY_BASE=...
JWT_SECRET=...
```

2. Veritabanını migrate edin:
```bash
rails db:migrate RAILS_ENV=production
```

3. JWT Authentication'ı aktif edin (test ortamında devre dışıdır)

## Lisans

Bu proje eğitim amaçlı geliştirilmiştir.
# vardiya_y-netim_sistemi
