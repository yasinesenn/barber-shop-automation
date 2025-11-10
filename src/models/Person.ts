/**
 * Person Abstract Class
 * Base class for all person entities (Customer, Employee)
 * Demonstrates abstraction and encapsulation
 */

export abstract class Person {
    private _id: string;
    private _name: string;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
    }

    // Getters - demonstrating encapsulation
    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    // Setter with validation
    public set name(value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error('Name cannot be empty');
        }
        this._name = value.trim();
    }

    // Abstract method - must be implemented by subclasses
    public abstract getRole(): string;

    // Common method for all persons
    public getInfo(): string {
        return `${this.getRole()}: ${this._name} (ID: ${this._id})`;
    }
}
