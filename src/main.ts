/**
 * Main Application
 * Console-based Barber Shop Automation System
 * Demonstrates all OOP principles with interactive menus
 */

import inquirer from 'inquirer';
import { SalonManager } from './managers/SalonManager';
import { AppointmentManager } from './managers/AppointmentManager';
import { Customer } from './models/Customer';
import { Employee } from './models/Employee';
import { HaircutService } from './models/HaircutService';
import { BeardService } from './models/BeardService';
import { ColoringService } from './models/ColoringService';
import { TimeSlot } from './models/TimeSlot';
import { generateId } from './utils/idGenerator';
import { Service } from './models/Service';
import { Salon } from './models/Salon';
import { AppointmentStatus } from './models/Appointment';

// Global managers
const salonManager = new SalonManager();
const appointmentManager = new AppointmentManager();

// Global current user (for demo purposes)
let currentCustomer: Customer | null = null;

// Initialize sample data
function initializeSampleData(): void {
    console.log('\n🎨 Initializing sample data...\n');

    // Create services - Demonstrates polymorphism
    const service1 = new HaircutService('Classic Haircut', 30, 100, 'Classic');
    const service2 = new HaircutService('Premium Haircut', 45, 150, 'Premium');
    const service3 = new BeardService('Beard Trim', 20, 50, true);
    const service4 = new BeardService('Beard Styling', 30, 75, true);
    const service5 = new ColoringService('Hair Coloring', 90, 300, 'Single Color', true);
    const service6 = new ColoringService('Highlights', 120, 450, 'Highlights', true);

    // Create salons
    const salon1 = salonManager.createSalon('Elite Barber Shop', {
        start: '09:00',
        end: '20:00'
    });

    const salon2 = salonManager.createSalon('Royal Cuts', {
        start: '10:00',
        end: '21:00'
    });

    // Add services to salons
    salonManager.addServiceToSalon(salon1.id, service1);
    salonManager.addServiceToSalon(salon1.id, service2);
    salonManager.addServiceToSalon(salon1.id, service3);
    salonManager.addServiceToSalon(salon1.id, service4);

    salonManager.addServiceToSalon(salon2.id, service1);
    salonManager.addServiceToSalon(salon2.id, service3);
    salonManager.addServiceToSalon(salon2.id, service5);
    salonManager.addServiceToSalon(salon2.id, service6);

    // Create employees - Demonstrates inheritance
    const emp1 = new Employee(generateId('EMP'), 'Ahmet Yılmaz', ['Haircut', 'Beard']);
    const emp2 = new Employee(generateId('EMP'), 'Mehmet Demir', ['Haircut', 'Coloring']);
    const emp3 = new Employee(generateId('EMP'), 'Ali Kaya', ['Beard', 'Haircut']);
    const emp4 = new Employee(generateId('EMP'), 'Ayşe Şahin', ['Coloring', 'Haircut']);

    // Add services to employees
    emp1.addService(service1);
    emp1.addService(service2);
    emp1.addService(service3);
    emp1.addService(service4);

    emp2.addService(service1);
    emp2.addService(service2);
    emp2.addService(service5);
    emp2.addService(service6);

    emp3.addService(service1);
    emp3.addService(service3);
    emp3.addService(service4);

    emp4.addService(service5);
    emp4.addService(service6);
    emp4.addService(service2);

    // Add availability slots for employees
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    // Create time slots for today, tomorrow, and day after
    [today, tomorrow, dayAfter].forEach(date => {
        // Morning slot
        const morning = new Date(date);
        morning.setHours(9, 0, 0, 0);
        const noon = new Date(date);
        noon.setHours(13, 0, 0, 0);

        // Afternoon slot
        const afternoon = new Date(date);
        afternoon.setHours(14, 0, 0, 0);
        const evening = new Date(date);
        evening.setHours(20, 0, 0, 0);

        try {
            emp1.addAvailableSlot(new TimeSlot(morning, noon));
            emp1.addAvailableSlot(new TimeSlot(afternoon, evening));

            emp2.addAvailableSlot(new TimeSlot(morning, evening));

            emp3.addAvailableSlot(new TimeSlot(afternoon, evening));

            emp4.addAvailableSlot(new TimeSlot(morning, noon));
            emp4.addAvailableSlot(new TimeSlot(afternoon, evening));
        } catch (error) {
            // Slots might conflict, ignore
        }
    });

    // Add employees to salons
    salonManager.addEmployeeToSalon(salon1.id, emp1);
    salonManager.addEmployeeToSalon(salon1.id, emp2);
    salonManager.addEmployeeToSalon(salon2.id, emp3);
    salonManager.addEmployeeToSalon(salon2.id, emp4);

    console.log('✅ Sample data initialized successfully!');
    console.log(`   - ${salonManager.getSalonCount()} salons created`);
    console.log(`   - ${salonManager.getAllEmployees().length} employees added`);
    console.log(`   - ${salonManager.getAllServices().length} services available\n`);
}

// Main menu
async function showMainMenu(): Promise<void> {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: '🏠 Main Menu - Select Your Role:',
            choices: [
                { name: '👤 Customer', value: 'customer' },
                { name: '👨‍💼 Manager', value: 'manager' },
                { name: '📊 Show Statistics', value: 'stats' },
                { name: '🚪 Exit', value: 'exit' }
            ]
        }
    ]);

    switch (choice) {
        case 'customer':
            await customerFlow();
            break;
        case 'manager':
            await managerMenu();
            break;
        case 'stats':
            showStatistics();
            await showMainMenu();
            break;
        case 'exit':
            console.log('\n👋 Thank you for using Barber Shop Automation System!\n');
            process.exit(0);
    }
}

// Show statistics
function showStatistics(): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 SYSTEM STATISTICS');
    console.log('='.repeat(60));
    console.log(`Total Salons: ${salonManager.getSalonCount()}`);
    console.log(`Total Employees: ${salonManager.getAllEmployees().length}`);
    console.log(`Total Services: ${salonManager.getAllServices().length}`);
    console.log(`Total Appointments: ${appointmentManager.getAppointmentCount()}`);
    console.log(`Pending Appointments: ${appointmentManager.getPendingCount()}`);
    console.log('='.repeat(60) + '\n');
}

// Customer flow
async function customerFlow(): Promise<void> {
    // Login or register
    if (!currentCustomer) {
        const { name } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter your name:',
                validate: (input: string) => input.trim().length > 0 || 'Name is required'
            }
        ]);

        currentCustomer = new Customer(generateId('CUST'), name);
        console.log(`\n✅ Welcome, ${currentCustomer.name}!\n`);
    }

    await customerMenu();
}

// Customer menu
async function customerMenu(): Promise<void> {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: '👤 Customer Menu:',
            choices: [
                { name: '📋 List Salons', value: 'list_salons' },
                { name: '➕ Create Appointment', value: 'create_appointment' },
                { name: '📅 My Appointments', value: 'my_appointments' },
                { name: '🔙 Back to Main Menu', value: 'back' }
            ]
        }
    ]);

    switch (choice) {
        case 'list_salons':
            listSalons();
            await customerMenu();
            break;
        case 'create_appointment':
            await createAppointmentFlow();
            await customerMenu();
            break;
        case 'my_appointments':
            viewCustomerAppointments();
            await customerMenu();
            break;
        case 'back':
            currentCustomer = null;
            await showMainMenu();
            break;
    }
}

// List all salons
function listSalons(): void {
    const salons = salonManager.getAllSalons();
    console.log('\n' + '='.repeat(60));
    console.log('🏪 AVAILABLE SALONS');
    console.log('='.repeat(60));

    if (salons.length === 0) {
        console.log('No salons available.');
    } else {
        salons.forEach((salon, index) => {
            console.log(`\n${index + 1}. ${salon.name}`);
            console.log(`   Working Hours: ${salon.workingHours.start} - ${salon.workingHours.end}`);
            console.log(`   Services: ${salon.services.length}`);
            console.log(`   Employees: ${salon.employees.length}`);
        });
    }
    console.log('='.repeat(60) + '\n');
}

// Create appointment flow
async function createAppointmentFlow(): Promise<void> {
    if (!currentCustomer) return;

    const salons = salonManager.getAllSalons();
    if (salons.length === 0) {
        console.log('\n❌ No salons available.\n');
        return;
    }

    // Select salon
    const { salonId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'salonId',
            message: 'Select a salon:',
            choices: salons.map(s => ({ name: `${s.name} (${s.workingHours.start}-${s.workingHours.end})`, value: s.id }))
        }
    ]);

    const salon = salonManager.getSalonById(salonId);
    if (!salon) return;

    // Select service
    if (salon.services.length === 0) {
        console.log('\n❌ No services available at this salon.\n');
        return;
    }

    const { serviceName } = await inquirer.prompt([
        {
            type: 'list',
            name: 'serviceName',
            message: 'Select a service:',
            choices: salon.services.map(s => ({
                name: `${s.name} - ${s.duration} min - ${s.price} TL`,
                value: s.name
            }))
        }
    ]);

    const service = salon.getServiceByName(serviceName);
    if (!service) return;

    // Show service description (demonstrates polymorphism)
    console.log(`\n📝 ${service.getDescription()}\n`);

    // Get available employees for this service
    const availableEmployees = salon.getEmployeesForService(service);
    if (availableEmployees.length === 0) {
        console.log('\n❌ No employees available for this service.\n');
        return;
    }

    // Select employee
    const { employeeId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select an employee:',
            choices: availableEmployees.map(e => ({
                name: `${e.name} (Specialties: ${e.specialties.join(', ')})`,
                value: e.id
            }))
        }
    ]);

    const employee = salon.getEmployeeById(employeeId);
    if (!employee) return;

    // Select date
    const today = new Date();
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        dates.push(date);
    }

    const { dateChoice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'dateChoice',
            message: 'Select a date:',
            choices: dates.map((d, i) => ({
                name: d.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
                value: i
            }))
        }
    ]);

    const selectedDate = dates[dateChoice];

    // Select time
    const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
    const { time } = await inquirer.prompt([
        {
            type: 'list',
            name: 'time',
            message: 'Select a time:',
            choices: times
        }
    ]);

    const [hours, minutes] = time.split(':').map(Number);
    const appointmentDateTime = new Date(selectedDate);
    appointmentDateTime.setHours(hours, minutes, 0, 0);

    // Create appointment
    try {
        const appointment = appointmentManager.createAppointment(
            salon,
            employee,
            currentCustomer,
            service,
            appointmentDateTime
        );

        console.log('\n✅ Appointment created successfully!');
        console.log(appointment.getInfo());
        console.log('\n⏳ Your appointment is pending manager approval.\n');
    } catch (error) {
        console.log(`\n❌ Error creating appointment: ${error}\n`);
    }
}

// View customer appointments
function viewCustomerAppointments(): void {
    if (!currentCustomer) return;

    const appointments = appointmentManager.listCustomerAppointments(currentCustomer.id);
    console.log('\n' + '='.repeat(60));
    console.log('📅 MY APPOINTMENTS');
    console.log('='.repeat(60));

    if (appointments.length === 0) {
        console.log('No appointments found.');
    } else {
        appointments.forEach((apt, index) => {
            console.log(`\n${index + 1}. ${apt.getShortInfo()}`);
        });
    }
    console.log('='.repeat(60) + '\n');
}

// Manager menu
async function managerMenu(): Promise<void> {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: '👨‍💼 Manager Menu:',
            choices: [
                { name: '🏪 Add Salon', value: 'add_salon' },
                { name: '👤 Add Employee', value: 'add_employee' },
                { name: '✂️ Add Service to Salon', value: 'add_service' },
                { name: '🔗 Assign Service to Employee', value: 'assign_service' },
                { name: '⏰ Set Employee Availability', value: 'set_availability' },
                { name: '✅ Approve/Reject Appointments', value: 'manage_appointments' },
                { name: '📋 View All Appointments', value: 'view_all_appointments' },
                { name: '🔙 Back to Main Menu', value: 'back' }
            ]
        }
    ]);

    switch (choice) {
        case 'add_salon':
            await addSalonFlow();
            await managerMenu();
            break;
        case 'add_employee':
            await addEmployeeFlow();
            await managerMenu();
            break;
        case 'add_service':
            await addServiceToSalonFlow();
            await managerMenu();
            break;
        case 'assign_service':
            await assignServiceToEmployeeFlow();
            await managerMenu();
            break;
        case 'set_availability':
            await setEmployeeAvailabilityFlow();
            await managerMenu();
            break;
        case 'manage_appointments':
            await manageAppointmentsFlow();
            await managerMenu();
            break;
        case 'view_all_appointments':
            viewAllAppointments();
            await managerMenu();
            break;
        case 'back':
            await showMainMenu();
            break;
    }
}

// Add salon flow
async function addSalonFlow(): Promise<void> {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Salon name:',
            validate: (input: string) => input.trim().length > 0 || 'Name is required'
        },
        {
            type: 'input',
            name: 'startTime',
            message: 'Opening time (HH:MM):',
            default: '09:00',
            validate: (input: string) => /^\d{2}:\d{2}$/.test(input) || 'Format: HH:MM'
        },
        {
            type: 'input',
            name: 'endTime',
            message: 'Closing time (HH:MM):',
            default: '20:00',
            validate: (input: string) => /^\d{2}:\d{2}$/.test(input) || 'Format: HH:MM'
        }
    ]);

    const salon = salonManager.createSalon(answers.name, {
        start: answers.startTime,
        end: answers.endTime
    });

    console.log(`\n✅ Salon "${salon.name}" created successfully!\n`);
}

// Add employee flow
async function addEmployeeFlow(): Promise<void> {
    const salons = salonManager.getAllSalons();
    if (salons.length === 0) {
        console.log('\n❌ No salons available. Please create a salon first.\n');
        return;
    }

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Employee name:',
            validate: (input: string) => input.trim().length > 0 || 'Name is required'
        },
        {
            type: 'input',
            name: 'specialties',
            message: 'Specialties (comma-separated):',
            default: 'Haircut, Beard'
        },
        {
            type: 'list',
            name: 'salonId',
            message: 'Select salon:',
            choices: salons.map(s => ({ name: s.name, value: s.id }))
        }
    ]);

    const specialties = answers.specialties.split(',').map((s: string) => s.trim());
    const employee = new Employee(generateId('EMP'), answers.name, specialties);

    salonManager.addEmployeeToSalon(answers.salonId, employee);

    console.log(`\n✅ Employee "${employee.name}" added successfully!\n`);
}

// Add service to salon flow
async function addServiceToSalonFlow(): Promise<void> {
    const salons = salonManager.getAllSalons();
    if (salons.length === 0) {
        console.log('\n❌ No salons available.\n');
        return;
    }

    const { salonId, serviceType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'salonId',
            message: 'Select salon:',
            choices: salons.map(s => ({ name: s.name, value: s.id }))
        },
        {
            type: 'list',
            name: 'serviceType',
            message: 'Service type:',
            choices: [
                { name: 'Haircut Service', value: 'haircut' },
                { name: 'Beard Service', value: 'beard' },
                { name: 'Coloring Service', value: 'coloring' }
            ]
        }
    ]);

    const commonAnswers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Service name:',
            validate: (input: string) => input.trim().length > 0 || 'Name is required'
        },
        {
            type: 'number',
            name: 'duration',
            message: 'Duration (minutes):',
            default: 30,
            validate: (input: number) => input > 0 || 'Must be positive'
        },
        {
            type: 'number',
            name: 'price',
            message: 'Price (TL):',
            default: 100,
            validate: (input: number) => input >= 0 || 'Must be non-negative'
        }
    ]);

    let service: Service;

    switch (serviceType) {
        case 'haircut':
            const { haircutType } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'haircutType',
                    message: 'Haircut type:',
                    default: 'Standard'
                }
            ]);
            service = new HaircutService(commonAnswers.name, commonAnswers.duration, commonAnswers.price, haircutType);
            break;

        case 'beard':
            const { includesTrim } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'includesTrim',
                    message: 'Includes trim?',
                    default: true
                }
            ]);
            service = new BeardService(commonAnswers.name, commonAnswers.duration, commonAnswers.price, includesTrim);
            break;

        case 'coloring':
            const colorAnswers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'colorType',
                    message: 'Color type:',
                    default: 'Single Color'
                },
                {
                    type: 'confirm',
                    name: 'requiresConsultation',
                    message: 'Requires consultation?',
                    default: true
                }
            ]);
            service = new ColoringService(
                commonAnswers.name,
                commonAnswers.duration,
                commonAnswers.price,
                colorAnswers.colorType,
                colorAnswers.requiresConsultation
            );
            break;

        default:
            return;
    }

    salonManager.addServiceToSalon(salonId, service);
    console.log(`\n✅ Service "${service.name}" added to salon!\n`);
    console.log(`📝 ${service.getDescription()}\n`);
}

// Assign service to employee
async function assignServiceToEmployeeFlow(): Promise<void> {
    const employees = salonManager.getAllEmployees();
    if (employees.length === 0) {
        console.log('\n❌ No employees available.\n');
        return;
    }

    const services = salonManager.getAllServices();
    if (services.length === 0) {
        console.log('\n❌ No services available.\n');
        return;
    }

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select employee:',
            choices: employees.map(e => ({ name: e.name, value: e.id }))
        },
        {
            type: 'list',
            name: 'serviceName',
            message: 'Select service:',
            choices: services.map(s => ({ name: `${s.name} (${s.duration} min, ${s.price} TL)`, value: s.name }))
        }
    ]);

    const employee = employees.find(e => e.id === answers.employeeId);
    const service = services.find(s => s.name === answers.serviceName);

    if (employee && service) {
        employee.addService(service);
        console.log(`\n✅ Service "${service.name}" assigned to ${employee.name}!\n`);
    }
}

// Set employee availability
async function setEmployeeAvailabilityFlow(): Promise<void> {
    const employees = salonManager.getAllEmployees();
    if (employees.length === 0) {
        console.log('\n❌ No employees available.\n');
        return;
    }

    const { employeeId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select employee:',
            choices: employees.map(e => ({ name: e.name, value: e.id }))
        }
    ]);

    const employee = employees.find(e => e.id === employeeId);
    if (!employee) return;

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'date',
            message: 'Date (YYYY-MM-DD):',
            default: new Date().toISOString().split('T')[0],
            validate: (input: string) => !isNaN(Date.parse(input)) || 'Invalid date'
        },
        {
            type: 'input',
            name: 'startTime',
            message: 'Start time (HH:MM):',
            default: '09:00',
            validate: (input: string) => /^\d{2}:\d{2}$/.test(input) || 'Format: HH:MM'
        },
        {
            type: 'input',
            name: 'endTime',
            message: 'End time (HH:MM):',
            default: '17:00',
            validate: (input: string) => /^\d{2}:\d{2}$/.test(input) || 'Format: HH:MM'
        }
    ]);

    const [startHour, startMin] = answers.startTime.split(':').map(Number);
    const [endHour, endMin] = answers.endTime.split(':').map(Number);

    const startDate = new Date(answers.date);
    startDate.setHours(startHour, startMin, 0, 0);

    const endDate = new Date(answers.date);
    endDate.setHours(endHour, endMin, 0, 0);

    try {
        const slot = new TimeSlot(startDate, endDate);
        employee.addAvailableSlot(slot);
        console.log(`\n✅ Availability slot added for ${employee.name}!\n`);
    } catch (error) {
        console.log(`\n❌ Error: ${error}\n`);
    }
}

// Manage appointments (approve/reject)
async function manageAppointmentsFlow(): Promise<void> {
    const pendingAppointments = appointmentManager.listAppointmentsByStatus(AppointmentStatus.Pending);

    if (pendingAppointments.length === 0) {
        console.log('\n✅ No pending appointments.\n');
        return;
    }

    const { appointmentId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'appointmentId',
            message: 'Select appointment:',
            choices: pendingAppointments.map(apt => ({
                name: apt.getShortInfo(),
                value: apt.id
            }))
        }
    ]);

    const appointment = appointmentManager.getAppointmentById(appointmentId);
    if (!appointment) return;

    console.log('\n' + '='.repeat(60));
    console.log(appointment.getInfo());
    console.log('='.repeat(60) + '\n');

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Action:',
            choices: [
                { name: '✅ Approve', value: 'approve' },
                { name: '❌ Reject', value: 'reject' },
                { name: '🔙 Cancel', value: 'cancel' }
            ]
        }
    ]);

    if (action === 'approve') {
        appointmentManager.approveAppointment(appointmentId);
        console.log('\n✅ Appointment approved!\n');
    } else if (action === 'reject') {
        const { reason } = await inquirer.prompt([
            {
                type: 'input',
                name: 'reason',
                message: 'Rejection reason:',
                validate: (input: string) => input.trim().length > 0 || 'Reason is required'
            }
        ]);

        appointmentManager.rejectAppointment(appointmentId, reason);
        console.log('\n❌ Appointment rejected!\n');
    }
}

// View all appointments
function viewAllAppointments(): void {
    const appointments = appointmentManager.getAllAppointments();
    console.log('\n' + '='.repeat(60));
    console.log('📅 ALL APPOINTMENTS');
    console.log('='.repeat(60));

    if (appointments.length === 0) {
        console.log('No appointments found.');
    } else {
        appointments.forEach((apt, index) => {
            console.log(`\n${index + 1}. ${apt.getShortInfo()}`);
        });
    }
    console.log('='.repeat(60) + '\n');
}

// Main application entry point
async function main(): Promise<void> {
    console.clear();
    console.log('='.repeat(60));
    console.log('💈 BARBER SHOP AUTOMATION SYSTEM 💈');
    console.log('='.repeat(60));
    console.log('Demonstrating OOP Principles:');
    console.log('  ✓ Encapsulation (private/protected fields, getters/setters)');
    console.log('  ✓ Inheritance (Person → Customer/Employee)');
    console.log('  ✓ Abstraction (abstract Person & Service classes)');
    console.log('  ✓ Polymorphism (different Service types)');
    console.log('  ✓ Interfaces (ITimeSlot)');
    console.log('='.repeat(60) + '\n');

    // Initialize sample data
    initializeSampleData();

    // Show main menu
    await showMainMenu();
}

// Run the application
main().catch(error => {
    console.error('Application error:', error);
    process.exit(1);
});
