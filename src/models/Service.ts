/**
 * Service Abstract Class
 * Base class for all service types
 * Demonstrates abstraction, encapsulation, and polymorphism
 */

export abstract class Service {
    protected _name: string;
    protected _duration: number; // in minutes
    protected _price: number;

    constructor(name: string, duration: number, price: number) {
        this._name = name;
        this._duration = duration;
        this._price = price;
    }

    // Getters - demonstrating encapsulation
    public get name(): string {
        return this._name;
    }

    public get duration(): number {
        return this._duration;
    }

    public get price(): number {
        return this._price;
    }

    // Protected setters - can only be used by subclasses
    protected set name(value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error('Service name cannot be empty');
        }
        this._name = value.trim();
    }

    protected set duration(value: number) {
        if (value <= 0) {
            throw new Error('Duration must be positive');
        }
        this._duration = value;
    }

    protected set price(value: number) {
        if (value < 0) {
            throw new Error('Price cannot be negative');
        }
        this._price = value;
    }

    // Abstract method - must be implemented by subclasses
    // Demonstrates polymorphism
    public abstract getDescription(): string;

    // Common method for all services
    public getInfo(): string {
        return `${this._name} - ${this._duration} min - ${this._price} TL`;
    }

    // Calculate end time based on start time and duration
    public calculateEndTime(startTime: Date): Date {
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + this._duration);
        return endTime;
    }
}
