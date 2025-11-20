/**
 * Appointment Class
 * Represents an appointment in the system
 * Demonstrates encapsulation and business logic
 */

import { Salon } from './Salon';
import { Employee } from './Employee';
import { Customer } from './Customer';
import { Service } from './Service';

export enum AppointmentStatus {
    Pending = 'PENDING',
    Approved = 'APPROVED',
    Rejected = 'REJECTED',
    Completed = 'COMPLETED',
    Cancelled = 'CANCELLED'
}

export class Appointment {
    private _id: string;
    private _salon: Salon;
    private _employee: Employee;
    private _customer: Customer;
    private _service: Service;
    private _dateTime: Date;
    private _status: AppointmentStatus;
    private _rejectionReason?: string;

    constructor(
        id: string,
        salon: Salon,
        employee: Employee,
        customer: Customer,
        service: Service,
        dateTime: Date
    ) {
        // Validation
        if (!salon.getEmployeeById(employee.id)) {
            throw new Error('Employee does not work at this salon');
        }

        if (!employee.canPerform(service)) {
            throw new Error(`Employee ${employee.name} cannot perform ${service.name}`);
        }

        if (!employee.isAvailable(dateTime, service.duration)) {
            throw new Error(`Employee ${employee.name} is not available at ${dateTime}`);
        }

        this._id = id;
        this._salon = salon;
        this._employee = employee;
        this._customer = customer;
        this._service = service;
        this._dateTime = dateTime;
        this._status = AppointmentStatus.Pending;
    }

    // Getters - demonstrating encapsulation
    public get id(): string {
        return this._id;
    }

    public get salon(): Salon {
        return this._salon;
    }

    public get employee(): Employee {
        return this._employee;
    }

    public get customer(): Customer {
        return this._customer;
    }

    public get service(): Service {
        return this._service;
    }

    public get dateTime(): Date {
        return this._dateTime;
    }

    public get status(): AppointmentStatus {
        return this._status;
    }

    public get rejectionReason(): string | undefined {
        return this._rejectionReason;
    }

    // Calculate end time
    public getEndTime(): Date {
        return this._service.calculateEndTime(this._dateTime);
    }

    // Status management
    public approve(): void {
        if (this._status !== AppointmentStatus.Pending) {
            throw new Error('Only pending appointments can be approved');
        }
        this._status = AppointmentStatus.Approved;
    }

    public reject(reason: string): void {
        if (this._status !== AppointmentStatus.Pending) {
            throw new Error('Only pending appointments can be rejected');
        }
        this._status = AppointmentStatus.Rejected;
        this._rejectionReason = reason;
    }

    public complete(): void {
        if (this._status !== AppointmentStatus.Approved) {
            throw new Error('Only approved appointments can be completed');
        }
        this._status = AppointmentStatus.Completed;
    }

    public cancel(): void {
        if (this._status === AppointmentStatus.Completed) {
            throw new Error('Completed appointments cannot be cancelled');
        }
        this._status = AppointmentStatus.Cancelled;
    }

    // Check if this appointment conflicts with another
    public conflictsWith(other: Appointment): boolean {
        // Must be same employee
        if (this._employee.id !== other.employee.id) {
            return false;
        }

        // Check time overlap
        const thisEnd = this.getEndTime();
        const otherEnd = other.getEndTime();

        return (
            (this._dateTime < otherEnd && thisEnd > other.dateTime) ||
            (other.dateTime < thisEnd && otherEnd > this._dateTime)
        );
    }

    // Get appointment info
    public getInfo(): string {
        return `Appointment ${this._id}
Customer: ${this._customer.name}
Employee: ${this._employee.name}
Service: ${this._service.name}
Salon: ${this._salon.name}
Date/Time: ${this._dateTime.toLocaleString()}
Duration: ${this._service.duration} minutes
Status: ${this._status}${this._rejectionReason ? `\nReason: ${this._rejectionReason}` : ''}`;
    }

    public getShortInfo(): string {
        return `${this._dateTime.toLocaleString()} - ${this._customer.name} - ${this._service.name} - ${this._employee.name} [${this._status}]`;
    }
}
