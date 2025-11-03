/**
 * Simple ID Generator Utility
 * Generates unique IDs for entities
 */

let counter = 0;

export function generateId(prefix: string = 'ID'): string {
    counter++;
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}-${timestamp}-${counter}-${random}`;
}

export function resetCounter(): void {
    counter = 0;
}
