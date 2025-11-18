/**
 * ColoringService Class
 * Specific implementation of Service for hair coloring
 * Demonstrates polymorphism and inheritance
 */

import { Service } from './Service';

export class ColoringService extends Service {
    private _colorType: string;
    private _requiresConsultation: boolean;

    constructor(
        name: string,
        duration: number,
        price: number,
        colorType: string = 'Single Color',
        requiresConsultation: boolean = true
    ) {
        super(name, duration, price);
        this._colorType = colorType;
        this._requiresConsultation = requiresConsultation;
    }

    public get colorType(): string {
        return this._colorType;
    }

    public get requiresConsultation(): boolean {
        return this._requiresConsultation;
    }

    // Implementing abstract method - demonstrates polymorphism
    public getDescription(): string {
        const consultInfo = this._requiresConsultation ? '(consultation required)' : '';
        return `Coloring Service: ${this._name} - ${this._colorType} ${consultInfo}. Transform your look! Duration: ${this._duration} minutes, Price: ${this._price} TL`;
    }

    // Additional method specific to coloring
    public getEstimatedChemicalCost(): number {
        // Simple calculation based on color type
        return this._colorType.toLowerCase().includes('highlights') ? 50 : 30;
    }
}
