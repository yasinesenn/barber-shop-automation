/**
 * Customer Class
 * Represents a customer in the system
 * Demonstrates inheritance from Person
 */

import { Person } from './Person';
import { Role } from './Role';

export class Customer extends Person {
    private _appointmentHistory: string[]; // Array of appointment IDs

    constructor(id: string, name: string) {
        super(id, name);
        this._appointmentHistory = [];
    }

    // Implementing abstract method from Person
    public getRole(): string {
        return Role.Customer;
    }

    // Customer-specific methods
    public addAppointment(appointmentId: string): void {
        this._appointmentHistory.push(appointmentId);
    }

    public get appointmentHistory(): string[] {
        return [...this._appointmentHistory]; // Return a copy to maintain encapsulation
    }

    public getAppointmentCount(): number {
        return this._appointmentHistory.length;
    }

    // Override getInfo to add customer-specific details
    public override getInfo(): string {
        return `${super.getInfo()} - Appointments: ${this.getAppointmentCount()}`;
    }
}
