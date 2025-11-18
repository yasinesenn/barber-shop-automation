/**
 * HaircutService Class
 * Specific implementation of Service for haircuts
 * Demonstrates polymorphism and inheritance
 */

import { Service } from './Service';

export class HaircutService extends Service {
    private _haircutType: string;

    constructor(name: string, duration: number, price: number, haircutType: string = 'Standard') {
        super(name, duration, price);
        this._haircutType = haircutType;
    }

    public get haircutType(): string {
        return this._haircutType;
    }

    // Implementing abstract method - demonstrates polymorphism
    public getDescription(): string {
        return `Haircut Service: ${this._name} (${this._haircutType}) - Perfect styling for your hair. Duration: ${this._duration} minutes, Price: ${this._price} TL`;
    }

    // Additional method specific to haircut
    public includesWash(): boolean {
        return this._duration >= 30; // Haircuts 30+ minutes include wash
    }
}
