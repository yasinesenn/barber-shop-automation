/**
 * BeardService Class
 * Specific implementation of Service for beard grooming
 * Demonstrates polymorphism and inheritance
 */

import { Service } from './Service';

export class BeardService extends Service {
    private _includesTrim: boolean;

    constructor(name: string, duration: number, price: number, includesTrim: boolean = true) {
        super(name, duration, price);
        this._includesTrim = includesTrim;
    }

    public get includesTrim(): boolean {
        return this._includesTrim;
    }

    // Implementing abstract method - demonstrates polymorphism
    public getDescription(): string {
        const trimInfo = this._includesTrim ? 'with trim' : 'styling only';
        return `Beard Service: ${this._name} (${trimInfo}) - Professional beard grooming. Duration: ${this._duration} minutes, Price: ${this._price} TL`;
    }

    // Additional method specific to beard service
    public requiresSpecialTools(): boolean {
        return this._includesTrim;
    }
}
