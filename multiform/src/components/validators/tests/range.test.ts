import range from './../range';

const min = -90;
const max = 90;
const validate = range({ min, max });

describe('range validator', () => {

    it('rejects when value is not an integer', () => {
        expect(validate(null)).toBe(false);
        expect(validate(undefined)).toBe(false);
        expect(validate("assa")).toBe(false);
        expect(validate("65")).toBe(false);
    });

    it('accepts when value is between min and max', () => {
        expect(validate(50)).toBe(true);
        expect(validate(0)).toBe(true);
        expect(validate(-45)).toBe(true);
    });

    it('rejects when value is lower than min and max', () => {
        expect(validate(-100)).toBe(false);
    });

    it('rejects when value is higher than min and max', () => {
        expect(validate(100)).toBe(false);
    });

    it('accepts when value is equal to either min and max', () => {
        expect(validate(-90)).toBe(true);
        expect(validate(90)).toBe(true);
    });
});


