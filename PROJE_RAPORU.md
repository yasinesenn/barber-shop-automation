# KUAFÖR/BERBER OTOMASYON SİSTEMİ - PROJE RAPORU

**Proje Adı:** Barber Shop Automation System  
**Geliştirme Dili:** TypeScript  
**Geliştirme Tarihi:** Kasım 2025  
**Geliştirici:** Yasin Emin Esen

---

## 📋 İÇİNDEKİLER

1. [Proje Hakkında](#proje-hakkında)
2. [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
3. [OOP Prensipleri](#oop-prensipleri)
4. [Sınıf Yapıları ve Açıklamaları](#sınıf-yapıları-ve-açıklamaları)
5. [Projeyi Çalıştırma](#projeyi-çalıştırma)
6. [Kullanım Kılavuzu](#kullanım-kılavuzu)
7. [Özellikler](#özellikler)
8. [Sonuç](#sonuç)

---

## 1. PROJE HAKKINDA

Bu proje, bir kuaför/berber salonu için randevu yönetim sistemini simüle eden konsol tabanlı bir otomasyon uygulamasıdır. Proje, Nesne Yönelimli Programlamanın (OOP) tüm temel prensiplerini (Encapsulation, Inheritance, Abstraction, Polymorphism) kapsamlı bir şekilde göstermektedir.

### Proje Amacı

- Salon yönetimi için dijital çözüm sunmak
- Müşterilerin randevu oluşturmasını kolaylaştırmak
- Çalışan ve servis yönetimini merkezileştirmek
- OOP prensiplerini pratik bir uygulamada göstermek

### Temel İşlevler

- **Müşteri İşlemleri:** Salon gezinme, randevu oluşturma, randevu takibi
- **Yönetici İşlemleri:** Salon ekleme, çalışan yönetimi, servis tanımlama, randevu onaylama/reddetme
- **Otomatik Kontroller:** Çakışma tespiti, uygunluk kontrolü, doğrulama mekanizmaları

---

## 2. KULLANILAN TEKNOLOJİLER

### Programlama Dili ve Çalışma Ortamı

- **TypeScript 5.3.2:** Tip güvenliği sağlayan, JavaScript'in geliştirilmiş versiyonu
- **Node.js:** JavaScript/TypeScript kodlarının çalıştırılması için runtime ortamı
- **ts-node:** TypeScript dosyalarını doğrudan çalıştırmayı sağlayan araç

### Kütüphaneler

- **Inquirer.js 8.2.5:** İnteraktif konsol menüleri oluşturmak için
- **@types/node:** Node.js için TypeScript tip tanımlamaları
- **@types/inquirer:** Inquirer için TypeScript tip tanımlamaları

### Geliştirme Araçları

- **Git:** Versiyon kontrol sistemi
- **npm:** Paket yöneticisi
- **TypeScript Compiler (tsc):** TypeScript kodlarını JavaScript'e derleme

---

## 3. OOP PRENSİPLERİ

Bu proje, Nesne Yönelimli Programlamanın 4 temel prensibini tam olarak uygulamaktadır:

### 3.1. Encapsulation (Kapsülleme)

**Tanım:** Verilerin ve bu verilere erişim yöntemlerinin bir arada tutulması, dış erişimden korunması.

**Projede Kullanımı:**
- Tüm sınıflarda `private` ve `protected` field'lar kullanılmıştır
- Verilere erişim sadece `public` getter ve setter metotları ile sağlanmaktadır
- Örnek: `Person` sınıfında `_id` ve `_name` private olarak tanımlanmış

```typescript
abstract class Person {
  private _id: string;        // Dışarıdan erişilemez
  private _name: string;      // Dışarıdan erişilemez
  
  public get name(): string {  // Kontrollü okuma
    return this._name;
  }
  
  public set name(value: string) {  // Kontrollü yazma
    if (!value) throw new Error('Name cannot be empty');
    this._name = value;
  }
}
```

### 3.2. Inheritance (Kalıtım)

**Tanım:** Bir sınıfın başka bir sınıfın özelliklerini ve davranışlarını miras alması.

**Projede Kullanımı:**
- `Person` abstract sınıfından `Customer` ve `Employee` türetilmiştir
- `Service` abstract sınıfından `HaircutService`, `BeardService`, `ColoringService` türetilmiştir

```typescript
// Ana sınıf
abstract class Person {
  constructor(id: string, name: string) { }
  abstract getRole(): string;
}

// Alt sınıf
class Customer extends Person {
  getRole(): string {
    return 'CUSTOMER';
  }
}

// Alt sınıf
class Employee extends Person {
  getRole(): string {
    return 'EMPLOYEE';
  }
}
```

### 3.3. Abstraction (Soyutlama)

**Tanım:** Karmaşık detayların gizlenerek sadece gerekli özelliklerin gösterilmesi.

**Projede Kullanımı:**
- `Person` ve `Service` abstract class'lar tanımlanmıştır
- Bu sınıflar doğrudan örneklenemez, sadece kalıtım için kullanılır
- Abstract metodlar alt sınıflarda mutlaka implement edilmelidir

```typescript
abstract class Service {
  protected _name: string;
  protected _duration: number;
  protected _price: number;
  
  // Abstract metod - alt sınıflar implement etmeli
  abstract getDescription(): string;
  
  // Ortak metod - tüm servisler kullanabilir
  public getInfo(): string {
    return `${this._name} - ${this._duration} min - ${this._price} TL`;
  }
}
```

### 3.4. Polymorphism (Çok Biçimlilik)

**Tanım:** Aynı interface veya metodun farklı şekillerde uygulanması.

**Projede Kullanımı:**
- Her servis tipi `getDescription()` metodunu farklı şekilde implement etmiştir
- Aynı metod çağrısı farklı sonuçlar üretir

```typescript
// HaircutService
getDescription(): string {
  return `Haircut Service: ${this._name} - Perfect styling...`;
}

// BeardService
getDescription(): string {
  return `Beard Service: ${this._name} - Professional grooming...`;
}

// ColoringService
getDescription(): string {
  return `Coloring Service: ${this._name} - Transform your look...`;
}
```

### 3.5. Interface Kullanımı

**Projede Tanımlanan Interface'ler:**

1. **ITimeSlot:** Zaman dilimi için contract tanımlar
2. **WorkingHours:** Salon çalışma saatleri için yapı tanımlar

```typescript
interface ITimeSlot {
  startTime: Date;
  endTime: Date;
  isAvailable(dateTime: Date): boolean;
  hasConflict(other: ITimeSlot): boolean;
}
```

---

## 4. SINIF YAPILARI VE AÇIKLAMALARI

### 4.1. Model Sınıfları (src/models/)

#### 4.1.1. Person (Abstract Class)

**Dosya:** `src/models/Person.ts`

**Amaç:** Tüm kişi türleri için temel sınıf

**Özellikler:**
- `_id: string` - Kişinin benzersiz kimliği (private)
- `_name: string` - Kişinin adı (private)

**Metodlar:**
- `get id()` - ID'ye erişim (public getter)
- `get name()` - İsme erişim (public getter)
- `set name()` - İsim değiştirme, doğrulama ile (public setter)
- `abstract getRole()` - Rol bilgisi (alt sınıflar implement eder)
- `getInfo()` - Kişi bilgilerini string olarak döner

**Neden Kullanılır:**
- Kod tekrarını önlemek için
- Tüm kişi türlerinde ortak özellikleri merkezi bir yerde tutmak için
- Alt sınıflara temel yapı kazandırmak için

**Nasıl Kullanılır:**
```typescript
// Doğrudan kullanılamaz, abstract sınıf
// Alt sınıflar üzerinden kullanılır
const customer = new Customer('id-123', 'Ahmet');
console.log(customer.name);  // 'Ahmet'
```

---

#### 4.1.2. Customer (Class)

**Dosya:** `src/models/Customer.ts`

**Amaç:** Müşteri bilgilerini tutar

**Kalıtım:** `Person` sınıfından türetilmiştir

**Ek Özellikler:**
- `_appointmentHistory: string[]` - Randevu ID'lerinin listesi (private)

**Ek Metodlar:**
- `addAppointment(appointmentId)` - Randevu geçmişine ekler
- `getAppointmentCount()` - Toplam randevu sayısını döner
- `getRole()` - 'CUSTOMER' döner (abstract metodun implementasyonu)

**Neden Kullanılır:**
- Müşteri bilgilerini saklamak için
- Müşteri randevu geçmişini takip etmek için

**Nasıl Kullanılır:**
```typescript
const customer = new Customer('CUST-001', 'Mehmet Yılmaz');
customer.addAppointment('APT-123');
console.log(customer.getAppointmentCount()); // 1
```

---

#### 4.1.3. Employee (Class)

**Dosya:** `src/models/Employee.ts`

**Amaç:** Çalışan bilgilerini ve yeteneklerini yönetir

**Kalıtım:** `Person` sınıfından türetilmiştir

**Ek Özellikler:**
- `_specialties: string[]` - Uzmanlık alanları (private)
- `_availableSlots: TimeSlot[]` - Müsait zaman dilimleri (private)
- `_services: Service[]` - Yapabildiği servisler (private)

**Önemli Metodlar:**
- `addService(service)` - Çalışana yeni servis ekler
- `addAvailableSlot(slot)` - Müsaitlik saati ekler (çakışma kontrolü ile)
- `isAvailable(dateTime, duration)` - Belirli tarihte müsait mi kontrol eder
- `canPerform(service)` - Belirli servisi yapabilir mi kontrol eder
- `getRole()` - 'EMPLOYEE' döner

**Neden Kullanılır:**
- Çalışan yeteneklerini yönetmek için
- Uygunluk kontrolü yapmak için
- Servis atama işlemlerini yönetmek için

**Nasıl Kullanılır:**
```typescript
const employee = new Employee('EMP-001', 'Ali Kaya', ['Haircut', 'Beard']);

// Servis ekleme
const haircutService = new HaircutService('Klasik Kesim', 30, 100, 'Classic');
employee.addService(haircutService);

// Müsaitlik ekleme
const slot = new TimeSlot(startTime, endTime);
employee.addAvailableSlot(slot);

// Kontroller
if (employee.canPerform(haircutService)) {
  console.log('Çalışan bu servisi yapabilir');
}
```

---

#### 4.1.4. Service (Abstract Class)

**Dosya:** `src/models/Service.ts`

**Amaç:** Tüm servis türleri için temel sınıf

**Özellikler:**
- `_name: string` - Servis adı (protected)
- `_duration: number` - Süre (dakika) (protected)
- `_price: number` - Fiyat (TL) (protected)

**Metodlar:**
- `get name()` / `get duration()` / `get price()` - Getter'lar
- `protected set name()` / etc. - Protected setter'lar (sadece alt sınıflar kullanır)
- `abstract getDescription()` - Alt sınıflar implement eder
- `getInfo()` - Genel servis bilgisi
- `calculateEndTime(startTime)` - Bitiş zamanını hesaplar

**Neden Kullanılır:**
- Tüm servislerde ortak özellikleri merkezi yönetmek için
- Polimorfizm için temel oluşturmak için

---

#### 4.1.5. HaircutService (Class)

**Dosya:** `src/models/HaircutService.ts`

**Amaç:** Saç kesimi servisi

**Kalıtım:** `Service` sınıfından türetilmiştir

**Ek Özellikler:**
- `_haircutType: string` - Kesim tipi (örn: Classic, Modern)

**Polimorfik Metod:**
```typescript
getDescription(): string {
  return `Haircut Service: ${this._name} (${this._haircutType}) - 
          Perfect styling for your hair. Duration: ${this._duration} min, 
          Price: ${this._price} TL`;
}
```

**Kullanım:**
```typescript
const haircut = new HaircutService('Premium Kesim', 45, 150, 'Premium');
console.log(haircut.getDescription()); // Özel açıklama
```

---

#### 4.1.6. BeardService (Class)

**Dosya:** `src/models/BeardService.ts`

**Amaç:** Sakal traşı/düzeltme servisi

**Kalıtım:** `Service` sınıfından türetilmiştir

**Ek Özellikler:**
- `_includesTrim: boolean` - Düzeltme dahil mi?

**Polimorfik Metod:**
```typescript
getDescription(): string {
  const trimInfo = this._includesTrim ? 'with trim' : 'styling only';
  return `Beard Service: ${this._name} (${trimInfo}) - 
          Professional beard grooming. Duration: ${this._duration} min, 
          Price: ${this._price} TL`;
}
```

---

#### 4.1.7. ColoringService (Class)

**Dosya:** `src/models/ColoringService.ts`

**Amaç:** Saç boyama servisi

**Kalıtım:** `Service` sınıfından türetilmiştir

**Ek Özellikler:**
- `_colorType: string` - Boya tipi (örn: Single Color, Highlights)
- `_requiresConsultation: boolean` - Konsültasyon gerekli mi?

**Polimorfik Metod:**
```typescript
getDescription(): string {
  const consultInfo = this._requiresConsultation ? 
    '(consultation required)' : '';
  return `Coloring Service: ${this._name} - ${this._colorType} ${consultInfo}. 
          Transform your look! Duration: ${this._duration} min, 
          Price: ${this._price} TL`;
}
```

---

#### 4.1.8. Salon (Class)

**Dosya:** `src/models/Salon.ts`

**Amaç:** Salon bilgilerini ve bağlı varlıkları yönetir

**Özellikler:**
- `_id: string` - Salon ID (private)
- `_name: string` - Salon adı (private)
- `_workingHours: WorkingHours` - Çalışma saatleri (private)
- `_services: Service[]` - Sunulan servisler (private)
- `_employees: Employee[]` - Çalışanlar (private)

**Önemli Metodlar:**
- `addService(service)` - Yeni servis ekler
- `addEmployee(employee)` - Yeni çalışan ekler
- `getAvailableEmployees(service, dateTime)` - Belirli servis için müsait çalışanları getirir
- `getEmployeesForService(service)` - Servisi yapabilecek tüm çalışanları getirir
- `getServiceByName(name)` / `getEmployeeById(id)` - Arama metodları

**Neden Kullanılır:**
- Salon kaynaklarını merkezi yönetmek için
- Çalışan ve servis ilişkilerini organize etmek için

**Kullanım:**
```typescript
const salon = new Salon('SAL-001', 'Elite Barber', {
  start: '09:00',
  end: '20:00'
});

salon.addService(haircutService);
salon.addEmployee(employee);

// Müsait çalışanları bul
const available = salon.getAvailableEmployees(haircutService, appointmentTime);
```

---

#### 4.1.9. Appointment (Class)

**Dosya:** `src/models/Appointment.ts`

**Amaç:** Randevu bilgilerini tutar ve yönetir

**Özellikler:**
- `_salon: Salon` - Hangi salon
- `_employee: Employee` - Hangi çalışan
- `_customer: Customer` - Hangi müşteri
- `_service: Service` - Hangi servis
- `_dateTime: Date` - Randevu tarihi/saati
- `_status: AppointmentStatus` - Durum (Pending, Approved, Rejected, vb.)

**Önemli Metodlar:**
- `approve()` - Randevuyu onayla
- `reject(reason)` - Randevuyu reddet
- `complete()` - Randevuyu tamamla
- `cancel()` - Randevuyu iptal et
- `conflictsWith(other)` - Başka randevu ile çakışma kontrolü
- `getEndTime()` - Bitiş zamanını hesapla

**Constructor Validasyonları:**
- Çalışanın salonda çalışıp çalışmadığı
- Çalışanın servisi yapıp yapamadığı
- Çalışanın o zamanda müsait olup olmadığı

**Kullanım:**
```typescript
const appointment = new Appointment(
  'APT-001',
  salon,
  employee,
  customer,
  service,
  appointmentDateTime
);

// Durum değişiklikleri
appointment.approve();
appointment.complete();
```

---

#### 4.1.10. TimeSlot (Class + Interface)

**Dosya:** `src/models/TimeSlot.ts`

**Amaç:** Zaman dilimlerini yönetir ve çakışmaları tespit eder

**Interface:**
```typescript
interface ITimeSlot {
  startTime: Date;
  endTime: Date;
  isAvailable(dateTime: Date): boolean;
  hasConflict(other: ITimeSlot): boolean;
}
```

**Özellikler:**
- `_startTime: Date` - Başlangıç zamanı (private)
- `_endTime: Date` - Bitiş zamanı (private)

**Metodlar:**
- `isAvailable(dateTime)` - Belirli zaman dilimde müsait mi?
- `hasConflict(other)` - Başka bir slot ile çakışıyor mu?

**Kullanım:**
```typescript
const morningSlot = new TimeSlot(
  new Date('2025-11-30 09:00'),
  new Date('2025-11-30 13:00')
);

const appointmentTime = new Date('2025-11-30 10:00');
if (morningSlot.isAvailable(appointmentTime)) {
  console.log('Bu zaman diliminde müsait');
}
```

---

#### 4.1.11. Role (Enum)

**Dosya:** `src/models/Role.ts`

**Amaç:** Kullanıcı rollerini tanımlar

**Değerler:**
- `Customer = 'CUSTOMER'`
- `Employee = 'EMPLOYEE'`
- `Manager = 'MANAGER'`

**Kullanım:**
```typescript
import { Role } from './Role';

if (user.getRole() === Role.Manager) {
  // Yönetici işlemleri
}
```

---

### 4.2. Manager Sınıfları (src/managers/)

#### 4.2.1. SalonManager

**Dosya:** `src/managers/SalonManager.ts`

**Amaç:** Tüm salon işlemlerini merkezi olarak yönetir

**Özellikler:**
- `_salons: Map<string, Salon>` - Tüm salonları ID ile saklar

**Önemli Metodlar:**
- `createSalon(name, workingHours)` - Yeni salon oluşturur
- `getAllSalons()` - Tüm salonları getirir
- `getSalonById(id)` / `getSalonByName(name)` - Salon arama
- `addEmployeeToSalon(salonId, employee)` - Salona çalışan ekler
- `addServiceToSalon(salonId, service)` - Salona servis ekler
- `findSalonsWithService(serviceName)` - Belirli servisi sunan salonları bulur

**Neden Kullanılır:**
- Salon işlemlerini merkezi yönetmek için
- Business logic'i model sınıflarından ayırmak için
- Salon koleksiyonunu yönetmek için

**Kullanım:**
```typescript
const salonManager = new SalonManager();

const salon = salonManager.createSalon('Elit Kuaför', {
  start: '09:00',
  end: '20:00'
});

salonManager.addEmployeeToSalon(salon.id, employee);
salonManager.addServiceToSalon(salon.id, service);

const allSalons = salonManager.getAllSalons();
```

---

#### 4.2.2. AppointmentManager

**Dosya:** `src/managers/AppointmentManager.ts`

**Amaç:** Randevu işlemlerini merkezi olarak yönetir

**Özellikler:**
- `_appointments: Map<string, Appointment>` - Tüm randevuları saklar

**Önemli Metodlar:**
- `createAppointment(...)` - Yeni randevu oluşturur (çakışma kontrolü ile)
- `approveAppointment(id)` - Randevuyu onayla
- `rejectAppointment(id, reason)` - Randevuyu reddet
- `completeAppointment(id)` - Randevuyu tamamla
- `cancelAppointment(id)` - Randevuyu iptal et
- `checkConflicts(employee, dateTime, duration)` - Çakışma kontrolü
- `listAppointmentsByStatus(status)` - Duruma göre listele
- `listCustomerAppointments(customerId)` - Müşteri randevuları
- `listEmployeeAppointments(employeeId)` - Çalışan randevuları
- `getPendingCount()` - Bekleyen randevu sayısı

**Neden Kullanılür:**
- Randevu işlemlerini merkezi yönetmek için
- Çakışma kontrollerini yapmak için
- Durum değişikliklerini yönetmek için

**Kullanım:**
```typescript
const appointmentManager = new AppointmentManager();

// Randevu oluştur
const appointment = appointmentManager.createAppointment(
  salon, employee, customer, service, dateTime
);

// Yönetici onayı
appointmentManager.approveAppointment(appointment.id);

// Müşteri randevularını listele
const myAppointments = appointmentManager.listCustomerAppointments(customer.id);
```

---

### 4.3. Utility Sınıfları (src/utils/)

#### 4.3.1. idGenerator

**Dosya:** `src/utils/idGenerator.ts`

**Amaç:** Benzersiz ID'ler oluşturur

**Fonksiyonlar:**
- `generateId(prefix)` - Prefix ile benzersiz ID oluşturur
- `resetCounter()` - Sayacı sıfırlar (test için)

**ID Formatı:** `PREFIX-TIMESTAMP-COUNTER-RANDOM`

Örnek: `SALON-1732975200000-1-742`

**Kullanım:**
```typescript
import { generateId } from './utils/idGenerator';

const salonId = generateId('SALON');    // SALON-...
const customerId = generateId('CUST');  // CUST-...
const employeeId = generateId('EMP');   // EMP-...
```

---

### 4.4. Ana Uygulama (src/)

#### 4.4.1. main.ts

**Dosya:** `src/main.ts`

**Amaç:** Uygulamanın giriş noktası, konsol arayüzü

**İçerik:**
- Global manager instance'ları
- Sample data initialization
- Ana menü sistemi
- Müşteri menüsü ve akışları
- Yönetici menüsü ve akışları

**Ana Fonksiyonlar:**

1. **initializeSampleData()** - Örnek veri oluşturur
2. **showMainMenu()** - Ana menüyü gösterir
3. **customerFlow()** - Müşteri akışını yönetir
4. **customerMenu()** - Müşteri menüsünü gösterir
5. **managerMenu()** - Yönetici menüsünü gösterir
6. **createAppointmentFlow()** - Randevu oluşturma akışı
7. **manageAppointmentsFlow()** - Randevu onay/red akışı

**Uygulama Akışı:**
```
main() 
  └─> initializeSampleData()
  └─> showMainMenu()
      ├─> customerFlow()
      │   └─> customerMenu()
      │       ├─> listSalons()
      │       ├─> createAppointmentFlow()
      │       └─> viewCustomerAppointments()
      └─> managerMenu()
          ├─> addSalonFlow()
          ├─> addEmployeeFlow()
          ├─> addServiceToSalonFlow()
          └─> manageAppointmentsFlow()
```

---

## 5. PROJEYİ ÇALIŞTIRMA

### 5.1. Sistem Gereksinimleri

- **Node.js:** v16.0 veya üzeri
- **npm:** v7.0 veya üzeri
- **Terminal/Command Prompt:** Konsol erişimi

### 5.2. İlk Kurulum

#### Adım 1: Projeyi İndir veya Klonla

**GitHub'dan klonlama:**
```bash
git clone https://github.com/yasinesenn/barber-shop-automation.git
cd barber-shop-automation
```

**veya ZIP olarak indirdiysen:**
```bash
unzip barber-shop-automation.zip
cd barber-shop-automation
```

#### Adım 2: Bağımlılıkları Yükle

```bash
npm install
```

Bu komut şu paketleri yükler:
- inquirer
- typescript
- ts-node
- @types/node
- @types/inquirer

#### Adım 3: Uygulamayı Çalıştır

```bash
npm start
```

veya

```bash
npm run dev
```

### 5.3. Derleme (İsteğe Bağlı)

TypeScript kodlarını JavaScript'e derlemek için:

```bash
npm run build
```

Bu komut `dist/` klasöründe derlenmiş JavaScript dosyaları oluşturur.

Derlenmiş kodu çalıştırmak için:

```bash
node dist/main.js
```

### 5.4. Sorun Giderme

#### Hata: "Cannot find module 'inquirer'"

**Çözüm:**
```bash
npm install
```

#### Hata: "tsc: command not found"

**Çözüm:**
```bash
npm install -g typescript
```

#### Hata: Port veya izin problemi

**Çözüm:**
- Terminal'i yönetici olarak çalıştır (Windows)
- `sudo` kullan (Mac/Linux)

---

## 6. KULLANIM KILAVUZU

### 6.1. Uygulamayı Başlatma

Terminal'de şu komutu çalıştırın:
```bash
npm start
```

Ana menü görünecektir:

```
==============================================================
💈 BARBER SHOP AUTOMATION SYSTEM 💈
==============================================================
Demonstrating OOP Principles:
  ✓ Encapsulation (private/protected fields, getters/setters)
  ✓ Inheritance (Person → Customer/Employee)
  ✓ Abstraction (abstract Person & Service classes)
  ✓ Polymorphism (different Service types)
  ✓ Interfaces (ITimeSlot)
==============================================================

🎨 Initializing sample data...
✅ Sample data initialized successfully!
   - 2 salons created
   - 4 employees added
   - 6 services available

? 🏠 Main Menu - Select Your Role:
❯ 👤 Customer
  👨‍💼 Manager
  📊 Show Statistics
  🚪 Exit
```

### 6.2. Müşteri İşlemleri

#### 6.2.1. Salon Listeleme

1. Ana menüden "Customer" seç
2. Adını gir
3. "List Salons" seç

Çıktı:
```
============================================================
🏪 AVAILABLE SALONS
============================================================

1. Elite Barber Shop
   Working Hours: 09:00 - 20:00
   Services: 4
   Employees: 2

2. Royal Cuts
   Working Hours: 10:00 - 21:00
   Services: 4
   Employees: 2
============================================================
```

#### 6.2.2. Randevu Oluşturma

1. "Create Appointment" seç
2. Salon seç
3. Servis seç (sistem polimorfizmi gösterir - her servisin farklı açıklaması)
4. Çalışan seç
5. Tarih seç
6. Saat seç

Sistem otomatik kontroller yapar:
- ✅ Çalışan bu servisi yapabiliyor mu?
- ✅ Çalışan bu saatte müsait mi?
- ✅ Başka randevu ile çakışma var mı?

Başarılı olursa:
```
✅ Appointment created successfully!
Appointment APT-...
Customer: Ahmet Yılmaz
Employee: Mehmet Demir
Service: Classic Haircut
Salon: Elite Barber Shop
Date/Time: 30.11.2025 14:00
Duration: 30 minutes
Status: PENDING

⏳ Your appointment is pending manager approval.
```

#### 6.2.3. Randevularımı Görme

"My Appointments" seç

Tüm randevuların listesi gösterilir (Pending, Approved, Rejected durumları ile).

### 6.3. Yönetici İşlemleri

#### 6.3.1. Yeni Salon Ekleme

1. Ana menüden "Manager" seç
2. "Add Salon" seç
3. Salon adını gir
4. Açılış saatini gir (örn: 09:00)
5. Kapanış saatini gir (örn: 20:00)

```
✅ Salon "Yeni Kuaför" created successfully!
```

#### 6.3.2. Çalışan Ekleme

1. "Add Employee" seç
2. Çalışan adını gir
3. Uzmanlık alanlarını gir (virgülle ayrılmış)
4. Salonu seç

```
✅ Employee "Ali Kaya" added successfully!
```

#### 6.3.3. Servis Ekleme

1. "Add Service to Salon" seç
2. Salonu seç
3. Servis tipini seç (Haircut/Beard/Coloring)
4. Servis bilgilerini gir (ad, süre, fiyat)
5. Tipe özel bilgileri gir

Polimorfizm örneği:
```
📝 Haircut Service: Premium Kesim (Premium) - Perfect styling for your hair.
Duration: 45 minutes, Price: 150 TL
```

#### 6.3.4. Servisi Çalışana Atama

1. "Assign Service to Employee" seç
2. Çalışanı seç
3. Servisi seç

```
✅ Service "Classic Haircut" assigned to Ahmet Yılmaz!
```

#### 6.3.5. Çalışan Müsaitlik Saati Ekleme

1. "Set Employee Availability" seç
2. Çalışanı seç
3. Tarihi gir (YYYY-MM-DD formatında)
4. Başlangıç saati gir (HH:MM)
5. Bitiş saati gir (HH:MM)

Sistem çakışma kontrolü yapar.

#### 6.3.6. Randevu Onaylama/Reddetme

1. "Approve/Reject Appointments" seç
2. Bekleyen randevudan birini seç
3. Detayları gör
4. Approve veya Reject seç
5. Reject seçildiyse sebep gir

```
✅ Appointment approved!
```

veya

```
❌ Appointment rejected!
```

### 6.4. İstatistik Görüntüleme

Ana menüden "Show Statistics" seç:

```
============================================================
📊 SYSTEM STATISTICS
============================================================
Total Salons: 2
Total Employees: 4
Total Services: 6
Total Appointments: 5
Pending Appointments: 2
============================================================
```

---

## 7. ÖZELLİKLER

### 7.1. Fonksiyonel Özellikler

#### Müşteri Özellikleri
- ✅ Tüm salonları listeleme
- ✅ Salon detaylarını görme (servisler, çalışanlar, saatler)
- ✅ Servis seçimi
- ✅ Servis açıklamalarını görme (Polimorfizm)
- ✅ Uygun çalışanları listeleme
- ✅ Tarih ve saat seçimi
- ✅ Randevu oluşturma
- ✅ Kendi randevularını görme
- ✅ Randevu durumlarını takip etme

#### Yönetici Özellikleri
- ✅ Yeni salon ekleme
- ✅ Salon çalışma saatlerini belirleme
- ✅ Çalışan ekleme
- ✅ Çalışan uzmanlık alanlarını tanımlama
- ✅ 3 farklı servis tipi ekleme (Haircut, Beard, Coloring)
- ✅ Servisleri salonlara atama
- ✅ Servisleri çalışanlara atama
- ✅ Çalışan müsaitlik saatlerini ayarlama
- ✅ Randevuları onaylama
- ✅ Randevuları reddetme (sebep ile)
- ✅ Tüm randevuları görüntüleme
- ✅ Sistem istatistiklerini görme

#### Otomasyon Özellikleri
- ✅ Otomatik çakışma tespiti
- ✅ Otomatik uygunluk kontrolü
- ✅ Çalışan yetenek kontrolü
- ✅ Tarih/saat doğrulama
- ✅ Durum yönetimi (Pending → Approved/Rejected → Completed)
- ✅ Veri bütünlüğü kontrolü

### 7.2. Teknik Özellikler

#### OOP Prensipleri
- ✅ **Encapsulation:** Private/protected field'lar, getter/setter'lar
- ✅ **Inheritance:** 2 seviye kalıtım hiyerarşisi
- ✅ **Abstraction:** 2 abstract class (Person, Service)
- ✅ **Polymorphism:** 3 farklı servis implementasyonu
- ✅ **Interface:** 2 interface tanımı

#### Kod Kalitesi
- ✅ TypeScript strict mode
- ✅ Tip güvenliği
- ✅ Modüler yapı
- ✅ Separation of concerns (Model, Manager, Main ayrımı)
- ✅ DRY (Don't Repeat Yourself) prensibi
- ✅ Single Responsibility prensibi

#### Kullanıcı Deneyimi
- ✅ İnteraktif konsol menüleri
- ✅ Renkli ve emoji'li çıktılar
- ✅ Anlaşılır hata mesajları
- ✅ Input validasyonu
- ✅ Kullanıcı rehberliği

---

## 8. SONUÇ

### 8.1. Proje Başarıları

Bu proje, aşağıdaki hedefleri başarıyla gerçekleştirmiştir:

1. **OOP Prensiplerinin Tam Uygulanması**
   - 4 temel prensibin her biri kapsamlıca gösterilmiştir
   - Gerçek dünya senaryolarında uygulanmıştır
   - Teorik bilgi pratik örneklerle desteklenmiştir

2. **Çalışan Bir Uygulama**
   - Konsol üzerinden tamamen fonksiyonel
   - Gerçek kullanım senaryolarına uygun
   - Sağlam hata yönetimi

3. **Temiz ve Sürdürülebilir Kod**
   - Modüler yapı
   - Açık isimlendirme
   - Kapsamlı yorum satırları
   - TypeScript tip güvenliği

4. **Eğitici İçerik**
   - Her sınıf bir OOP konseptini öğretir
   - Polimorfizm açıkça görülebilir
   - Encapsulation pratikte uygulanmış
   - Abstraction somut örneklerle gösterilmiş

### 8.2. Öğrenilen Kavramlar

Bu projeyi inceleyerek şunları öğrenebilirsiniz:

- Abstract class'ların ne zaman kullanılacağı
- Interface'lerin önemi
- Polimorfizmin pratikte nasıl çalıştığı
- Encapsulation'ın veri güvenliğine katkısı
- Kalıtımın kod tekrarını nasıl önlediği
- Manager pattern'in faydaları
- TypeScript'te tip güvenliği
- Konsol uygulaması geliştirme

### 8.3. Geliştilebilir Alanlar

Proje şu şekillerde geliştirilebilir:

1. **Veritabanı Entegrasyonu**
   - MongoDB veya PostgreSQL kullanımı
   - Persistent data storage

2. **Bildirim Sistemi**
   - Email/SMS bildirimleri
   - Randevu hatırlatıcıları

3. **Gelişmiş Raporlama**
   - Gelir raporları
   - Çalışan performans analizi
   - Müşteri istatistikleri

4. **Web Arayüzü**
   - React veya Vue.js frontend
   - REST API backend

5. **Ödeme Sistemi**
   - Online ödeme entegrasyonu
   - Fatura oluşturma

6. **Çoklu Dil Desteği**
   - i18n implementasyonu
   - Türkçe/İngilizce seçeneği

### 8.4. Sonuç Değerlendirmesi

Bu Kuaför/Berber Otomasyon Sistemi projesi, Nesne Yönelimli Programlamanın tüm temel prensiplerini başarıyla göstermektedir. TypeScript kullanılarak geliştirilmiş, tip güvenli, modüler ve genişletilebilir bir yapıya sahiptir.

Proje, sadece teorik bilgiyi değil, aynı zamanda gerçek dünya problemlerine OOP çözümlerinin nasıl uygulanacağını da göstermektedir. Her sınıf belirli bir sorumluluğa sahiptir ve SOLID prensiplerine uygun şekilde tasarlanmıştır.

Konsol tabanlı arayüz, kullanıcı dostu ve anlaşılırdır. Tüm işlevler test edilmiş ve çalışır durumdadır.

---

## EKLER

### Ek A: Dosya Yapısı

```
barber-shop-automation/
├── src/
│   ├── models/
│   │   ├── Person.ts              (Abstract - 40 satır)
│   │   ├── Customer.ts            (35 satır)
│   │   ├── Employee.ts            (95 satır)
│   │   ├── Service.ts             (Abstract - 68 satır)
│   │   ├── HaircutService.ts      (30 satır)
│   │   ├── BeardService.ts        (32 satır)
│   │   ├── ColoringService.ts     (43 satır)
│   │   ├── Salon.ts               (130 satır)
│   │   ├── Appointment.ts         (147 satır)
│   │   ├── TimeSlot.ts            (51 satır)
│   │   └── Role.ts                (10 satır)
│   ├── managers/
│   │   ├── SalonManager.ts        (100 satır)
│   │   └── AppointmentManager.ts  (195 satır)
│   ├── utils/
│   │   └── idGenerator.ts         (17 satır)
│   └── main.ts                    (838 satır)
├── node_modules/                  (npm paketleri)
├── package.json                   (Proje ayarları)
├── tsconfig.json                  (TypeScript ayarları)
├── .gitignore                     (Git ignore)
└── README.md                      (Proje dokümantasyonu)

Toplam: ~1,800 satır kod
```

### Ek B: Kullanılan Komutlar

```bash
# Kurulum
npm install

# Çalıştırma
npm start
npm run dev

# Derleme
npm run build
npm run test

# Git
git log --oneline
git log --pretty=format:"%h - %ad : %s" --date=format:"%d %B %Y %H:%M"
```

### Ek C: Örnek Senaryo

1. Sistem başlatılır, örnek veriler yüklenir
2. Müşteri "Ahmet" sisteme giriş yapar
3. Salonları listeler
4. "Elite Barber Shop" salonunu seçer
5. "Classic Haircut" servisini seçer
6. Servisi yapabilecek çalışanları görür
7. "Mehmet Demir" çalışanını seçer
8. Yarın için saat 14:00 randevu oluşturur
9. Sistem kontrolleri yapar (müsaitlik, yetenek, çakışma)
10. Randevu Pending durumunda kaydedilir
11. Yönetici sisteme girer
12. Bekleyen randevuları görür
13. Randevuyu onaylar
14. Ahmet randevusunun Approved durumuna geçtiğini görür

---

**Rapor Sonu**

**Tarih:** 30 Kasım 2025  
**Proje Durumu:** Tamamlandı ✅  
**GitHub:** https://github.com/yasinesenn/barber-shop-automation
