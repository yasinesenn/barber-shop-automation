/**
 * Salon Class
 * Represents a barber shop/salon
 * Demonstrates encapsulation and composition
 */

import { Service } from './Service';
import { Employee } from './Employee';

export interface WorkingHours {
    start: string; // Format: "HH:MM"
    end: string; // Format: "HH:MM"
}

export class Salon {
    private _id: string;
    private _name: string;
    private _workingHours: WorkingHours;
    private _services: Service[];
    private _employees: Employee[];

    constructor(id: string, name: string, workingHours: WorkingHours) {
        this._id = id;
        this._name = name;
        this._workingHours = workingHours;
        this._services = [];
        this._employees = [];
    }

    // Getters - demonstrating encapsulation
    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get workingHours(): WorkingHours {
        return { ...this._workingHours }; // Return copy
    }

    public get services(): Service[] {
        return [...this._services]; // Return copy
    }

    public get employees(): Employee[] {
        return [...this._employees]; // Return copy
    }

    // Setters with validation
    public set name(value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error('Salon name cannot be empty');
        }
        this._name = value.trim();
    }

    public set workingHours(value: WorkingHours) {
        // Basic validation
        if (!value.start || !value.end) {
            throw new Error('Invalid working hours');
        }
        this._workingHours = value;
    }

    // Salon-specific methods
    public addService(service: Service): void {
        const exists = this._services.some(s => s.name === service.name);
        if (!exists) {
            this._services.push(service);
        }
    }

    public removeService(serviceName: string): void {
        this._services = this._services.filter(s => s.name !== serviceName);
    }

    public addEmployee(employee: Employee): void {
        const exists = this._employees.some(e => e.id === employee.id);
        if (!exists) {
            this._employees.push(employee);
        }
    }

    public removeEmployee(employeeId: string): void {
        this._employees = this._employees.filter(e => e.id !== employeeId);
    }

    // Get available employees for a specific service
    public getAvailableEmployees(service: Service, dateTime: Date): Employee[] {
        return this._employees.filter(employee => {
            return employee.canPerform(service) && employee.isAvailable(dateTime, service.duration);
        });
    }

    // Get all employees who can perform a service (regardless of availability)
    public getEmployeesForService(service: Service): Employee[] {
        return this._employees.filter(employee => employee.canPerform(service));
    }

    public getServiceByName(serviceName: string): Service | undefined {
        return this._services.find(s => s.name === serviceName);
    }

    public getEmployeeById(employeeId: string): Employee | undefined {
        return this._employees.find(e => e.id === employeeId);
    }

    // Get salon info
    public getInfo(): string {
        return `Salon: ${this._name} (ID: ${this._id})
Working Hours: ${this._workingHours.start} - ${this._workingHours.end}
Services: ${this._services.length}
Employees: ${this._employees.length}`;
    }
}
