/**
 * TimeSlot Class
 * Represents a time slot for employee availability
 * Demonstrates encapsulation and interface usage
 */

export interface ITimeSlot {
    startTime: Date;
    endTime: Date;
    isAvailable(dateTime: Date): boolean;
    hasConflict(other: ITimeSlot): boolean;
}

export class TimeSlot implements ITimeSlot {
    private _startTime: Date;
    private _endTime: Date;

    constructor(startTime: Date, endTime: Date) {
        if (startTime >= endTime) {
            throw new Error('Start time must be before end time');
        }
        this._startTime = startTime;
        this._endTime = endTime;
    }

    // Getters - demonstrating encapsulation
    public get startTime(): Date {
        return this._startTime;
    }

    public get endTime(): Date {
        return this._endTime;
    }

    // Check if a specific datetime falls within this slot
    public isAvailable(dateTime: Date): boolean {
        return dateTime >= this._startTime && dateTime <= this._endTime;
    }

    // Check if this slot conflicts with another slot
    public hasConflict(other: ITimeSlot): boolean {
        return (
            (this._startTime < other.endTime && this._endTime > other.startTime) ||
            (other.startTime < this._endTime && other.endTime > this._startTime)
        );
    }

    public toString(): string {
        return `${this._startTime.toLocaleString()} - ${this._endTime.toLocaleString()}`;
    }
}
