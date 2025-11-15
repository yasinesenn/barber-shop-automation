/**
 * Employee Class
 * Represents an employee in the salon
 * Demonstrates inheritance, encapsulation, and composition
 */

import { Person } from './Person';
import { Role } from './Role';
import { Service } from './Service';
import { TimeSlot } from './TimeSlot';

export class Employee extends Person {
    private _specialties: string[];
    private _availableSlots: TimeSlot[];
    private _services: Service[];

    constructor(id: string, name: string, specialties: string[] = []) {
        super(id, name);
        this._specialties = [...specialties];
        this._availableSlots = [];
        this._services = [];
    }

    // Implementing abstract method from Person
    public getRole(): string {
        return Role.Employee;
    }

    // Getters - demonstrating encapsulation
    public get specialties(): string[] {
        return [...this._specialties]; // Return copy
    }

    public get availableSlots(): TimeSlot[] {
        return [...this._availableSlots]; // Return copy
    }

    public get services(): Service[] {
        return [...this._services]; // Return copy
    }

    // Employee-specific methods
    public addSpecialty(specialty: string): void {
        if (!this._specialties.includes(specialty)) {
            this._specialties.push(specialty);
        }
    }

    public addAvailableSlot(slot: TimeSlot): void {
        // Check for conflicts
        for (const existingSlot of this._availableSlots) {
            if (existingSlot.hasConflict(slot)) {
                throw new Error('This slot conflicts with an existing slot');
            }
        }
        this._availableSlots.push(slot);
    }

    public addService(service: Service): void {
        // Check if service is already added
        const exists = this._services.some(s => s.name === service.name);
        if (!exists) {
            this._services.push(service);
        }
    }

    public removeService(serviceName: string): void {
        this._services = this._services.filter(s => s.name !== serviceName);
    }

    // Check if employee is available at a specific date/time
    public isAvailable(dateTime: Date, duration: number): boolean {
        const endTime = new Date(dateTime);
        endTime.setMinutes(endTime.getMinutes() + duration);

        // Check if the entire appointment duration fits within any available slot
        for (const slot of this._availableSlots) {
            if (dateTime >= slot.startTime && endTime <= slot.endTime) {
                return true;
            }
        }
        return false;
    }

    // Check if employee can perform a specific service
    public canPerform(service: Service): boolean {
        return this._services.some(s => s.name === service.name);
    }

    // Override getInfo
    public override getInfo(): string {
        return `${super.getInfo()} - Services: ${this._services.length}, Slots: ${this._availableSlots.length}`;
    }

    public getServiceNames(): string[] {
        return this._services.map(s => s.name);
    }
}
