import  maxLength from './../maxLength';

const length = 3;
const validate = maxLength({ length });


describe('maxLength validator', () => {

    it('rejects when value is not a string', () => {
        expect(validate(null)).toBe(false);
        expect(validate(undefined)).toBe(false);
    });

    it('rejects when length is less than config length', () => {
        expect(validate("a")).toBe(true);
        expect(validate("aa")).toBe(true);
    });

    it('rejects when length is equal to config length', () => {
        expect(validate("aaa")).toBe(true);
    });

    it('rejects when length is longer than config length', () => {
        expect(validate("aaaa")).toBe(false);
        expect(validate('ua bugga')).toBe(false);
        expect(validate('ugga bugga')).toBe(false);
    });
});


