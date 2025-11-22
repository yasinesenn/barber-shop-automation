/**
 * SalonManager Class
 * Manages salon operations
 * Demonstrates encapsulation and business logic separation
 */

import { Salon, WorkingHours } from '../models/Salon';
import { Employee } from '../models/Employee';
import { Service } from '../models/Service';
import { generateId } from '../utils/idGenerator';

export class SalonManager {
    private _salons: Map<string, Salon>;

    constructor() {
        this._salons = new Map();
    }

    // Create a new salon
    public createSalon(name: string, workingHours: WorkingHours): Salon {
        const id = generateId('SALON');
        const salon = new Salon(id, name, workingHours);
        this._salons.set(id, salon);
        return salon;
    }

    // Get all salons
    public getAllSalons(): Salon[] {
        return Array.from(this._salons.values());
    }

    // Get salon by ID
    public getSalonById(id: string): Salon | undefined {
        return this._salons.get(id);
    }

    // Get salon by name
    public getSalonByName(name: string): Salon | undefined {
        return Array.from(this._salons.values()).find(
            salon => salon.name.toLowerCase() === name.toLowerCase()
        );
    }

    // Add employee to a salon
    public addEmployeeToSalon(salonId: string, employee: Employee): boolean {
        const salon = this._salons.get(salonId);
        if (!salon) {
            return false;
        }
        salon.addEmployee(employee);
        return true;
    }

    // Add service to a salon
    public addServiceToSalon(salonId: string, service: Service): boolean {
        const salon = this._salons.get(salonId);
        if (!salon) {
            return false;
        }
        salon.addService(service);
        return true;
    }

    // Remove salon
    public removeSalon(id: string): boolean {
        return this._salons.delete(id);
    }

    // Get total number of salons
    public getSalonCount(): number {
        return this._salons.size;
    }

    // Find salons that offer a specific service
    public findSalonsWithService(serviceName: string): Salon[] {
        return Array.from(this._salons.values()).filter(salon => {
            return salon.services.some(s => s.name === serviceName);
        });
    }

    // Get all employees across all salons
    public getAllEmployees(): Employee[] {
        const employees: Employee[] = [];
        for (const salon of this._salons.values()) {
            employees.push(...salon.employees);
        }
        return employees;
    }

    // Get all services across all salons
    public getAllServices(): Service[] {
        const servicesMap = new Map<string, Service>();
        for (const salon of this._salons.values()) {
            for (const service of salon.services) {
                servicesMap.set(service.name, service);
            }
        }
        return Array.from(servicesMap.values());
    }
}
