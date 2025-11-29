# 💈 Barber Shop Automation System

A complete TypeScript-based console application demonstrating Object-Oriented Programming (OOP) principles.

## 🎯 OOP Principles Demonstrated

### 1. **Encapsulation**
- All classes use `private` and `protected` fields
- Public getters and setters for controlled access
- Examples: `Person`, `Service`, `Employee`, `Salon`

### 2. **Inheritance**
- `Customer` extends `Person`
- `Employee` extends `Person`
- `HaircutService`, `BeardService`, `ColoringService` extend `Service`

### 3. **Abstraction**
- Abstract `Person` class with abstract `getRole()` method
- Abstract `Service` class with abstract `getDescription()` method
- `ITimeSlot` interface

### 4. **Polymorphism**
- Different service types implement `getDescription()` differently
- Each service type has unique behavior and properties
- Method overriding in `Customer` and `Employee`

### 5. **Interface Usage**
- `ITimeSlot` interface for time slot contracts
- `WorkingHours` interface for salon hours

## 📁 Project Structure

```
src/
├── models/
│   ├── Person.ts              # Abstract base class
│   ├── Customer.ts            # Extends Person
│   ├── Employee.ts            # Extends Person
│   ├── Service.ts             # Abstract base class
│   ├── HaircutService.ts      # Extends Service
│   ├── BeardService.ts        # Extends Service
│   ├── ColoringService.ts     # Extends Service
│   ├── Salon.ts               # Salon entity
│   ├── Appointment.ts         # Appointment entity
│   ├── TimeSlot.ts            # TimeSlot with ITimeSlot interface
│   └── Role.ts                # Role enum
├── managers/
│   ├── SalonManager.ts        # Salon operations
│   └── AppointmentManager.ts  # Appointment operations
├── utils/
│   └── idGenerator.ts         # ID generation utility
└── main.ts                    # Main application entry point
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

or

```bash
npm run dev
```

## 📋 Features

### Customer Features
- ✅ List all available salons
- ✅ Select services
- ✅ View available employees
- ✅ Create appointments
- ✅ View personal appointments

### Manager Features
- ✅ Add new salons
- ✅ Add employees to salons
- ✅ Create and assign services
- ✅ Assign services to employees
- ✅ Set employee availability schedules
- ✅ Approve or reject appointments
- ✅ View all appointments

## 🎨 Application Flow

1. **Main Menu**: Choose between Customer, Manager, or Statistics view
2. **Customer Flow**:
   - Enter name (registration)
   - Browse salons and services
   - Select employee and time slot
   - Create appointment (pending approval)
3. **Manager Flow**:
   - Manage salons, employees, and services
   - Approve/reject pending appointments
   - View system statistics

## 🧪 Sample Data

The application initializes with:
- 2 Salons (Elite Barber Shop, Royal Cuts)
- 4 Employees with different specialties
- 6 Services (haircut, beard, coloring variations)
- Pre-configured availability slots

## 💻 Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Console UI**: Inquirer.js
- **Build Tool**: TypeScript Compiler (tsc)

## 📝 Code Examples

### Polymorphism Example

```typescript
// Different service types implement getDescription() differently
const haircut = new HaircutService('Classic Cut', 30, 100, 'Classic');
const beard = new BeardService('Beard Trim', 20, 50, true);
const coloring = new ColoringService('Full Color', 90, 300, 'Single Color', true);

console.log(haircut.getDescription());  // Haircut-specific description
console.log(beard.getDescription());     // Beard-specific description
console.log(coloring.getDescription());  // Coloring-specific description
```

### Encapsulation Example

```typescript
// Person class with private fields
abstract class Person {
  private _id: string;
  private _name: string;

  // Public getter
  public get name(): string {
    return this._name;
  }

  // Public setter with validation
  public set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    this._name = value.trim();
  }
}
```

## 🎯 OOP Checklist

- ✅ Private/Protected fields
- ✅ Public getters/setters
- ✅ Abstract classes
- ✅ Inheritance
- ✅ Polymorphism
- ✅ Interfaces
- ✅ Encapsulation
- ✅ Method overriding

## 📄 License

MIT
