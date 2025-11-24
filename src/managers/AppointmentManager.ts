/**
 * AppointmentManager Class
 * Manages all appointment operations
 * Demonstrates encapsulation and business logic separation
 */

import { Appointment, AppointmentStatus } from '../models/Appointment';
import { Salon } from '../models/Salon';
import { Employee } from '../models/Employee';
import { Customer } from '../models/Customer';
import { Service } from '../models/Service';
import { generateId } from '../utils/idGenerator';

export class AppointmentManager {
    private _appointments: Map<string, Appointment>;

    constructor() {
        this._appointments = new Map();
    }

    // Create a new appointment
    public createAppointment(
        salon: Salon,
        employee: Employee,
        customer: Customer,
        service: Service,
        dateTime: Date
    ): Appointment {
        // Check for conflicts
        const conflicts = this.checkConflicts(employee, dateTime, service.duration);
        if (conflicts.length > 0) {
            throw new Error('This time slot conflicts with existing appointments');
        }

        const id = generateId('APT');
        const appointment = new Appointment(id, salon, employee, customer, service, dateTime);
        this._appointments.set(id, appointment);

        // Add to customer's history
        customer.addAppointment(id);

        return appointment;
    }

    // Get all appointments
    public getAllAppointments(): Appointment[] {
        return Array.from(this._appointments.values());
    }

    // Get appointment by ID
    public getAppointmentById(id: string): Appointment | undefined {
        return this._appointments.get(id);
    }

    // Approve an appointment
    public approveAppointment(appointmentId: string): boolean {
        const appointment = this._appointments.get(appointmentId);
        if (!appointment) {
            return false;
        }
        try {
            appointment.approve();
            return true;
        } catch (error) {
            console.error(`Failed to approve appointment: ${error}`);
            return false;
        }
    }

    // Reject an appointment
    public rejectAppointment(appointmentId: string, reason: string): boolean {
        const appointment = this._appointments.get(appointmentId);
        if (!appointment) {
            return false;
        }
        try {
            appointment.reject(reason);
            return true;
        } catch (error) {
            console.error(`Failed to reject appointment: ${error}`);
            return false;
        }
    }

    // Complete an appointment
    public completeAppointment(appointmentId: string): boolean {
        const appointment = this._appointments.get(appointmentId);
        if (!appointment) {
            return false;
        }
        try {
            appointment.complete();
            return true;
        } catch (error) {
            console.error(`Failed to complete appointment: ${error}`);
            return false;
        }
    }

    // Cancel an appointment
    public cancelAppointment(appointmentId: string): boolean {
        const appointment = this._appointments.get(appointmentId);
        if (!appointment) {
            return false;
        }
        try {
            appointment.cancel();
            return true;
        } catch (error) {
            console.error(`Failed to cancel appointment: ${error}`);
            return false;
        }
    }

    // List appointments by status
    public listAppointmentsByStatus(status: AppointmentStatus): Appointment[] {
        return Array.from(this._appointments.values()).filter(apt => apt.status === status);
    }

    // List appointments for a customer
    public listCustomerAppointments(customerId: string): Appointment[] {
        return Array.from(this._appointments.values()).filter(
            apt => apt.customer.id === customerId
        );
    }

    // List appointments for an employee
    public listEmployeeAppointments(employeeId: string): Appointment[] {
        return Array.from(this._appointments.values()).filter(
            apt => apt.employee.id === employeeId
        );
    }

    // List appointments for a salon
    public listSalonAppointments(salonId: string): Appointment[] {
        return Array.from(this._appointments.values()).filter(
            apt => apt.salon.id === salonId
        );
    }

    // Check for conflicts with existing appointments
    public checkConflicts(employee: Employee, dateTime: Date, duration: number): Appointment[] {
        const conflicts: Appointment[] = [];
        const endTime = new Date(dateTime);
        endTime.setMinutes(endTime.getMinutes() + duration);

        for (const appointment of this._appointments.values()) {
            // Skip cancelled or rejected appointments
            if (
                appointment.status === AppointmentStatus.Cancelled ||
                appointment.status === AppointmentStatus.Rejected
            ) {
                continue;
            }

            // Check if same employee
            if (appointment.employee.id !== employee.id) {
                continue;
            }

            // Check time overlap
            const aptEnd = appointment.getEndTime();
            if (
                (dateTime < aptEnd && endTime > appointment.dateTime) ||
                (appointment.dateTime < endTime && aptEnd > dateTime)
            ) {
                conflicts.push(appointment);
            }
        }

        return conflicts;
    }

    // Get pending appointments count
    public getPendingCount(): number {
        return this.listAppointmentsByStatus(AppointmentStatus.Pending).length;
    }

    // Get appointments for a specific date
    public getAppointmentsByDate(date: Date): Appointment[] {
        return Array.from(this._appointments.values()).filter(apt => {
            const aptDate = apt.dateTime;
            return (
                aptDate.getFullYear() === date.getFullYear() &&
                aptDate.getMonth() === date.getMonth() &&
                aptDate.getDate() === date.getDate()
            );
        });
    }

    // Get total appointments count
    public getAppointmentCount(): number {
        return this._appointments.size;
    }
}
