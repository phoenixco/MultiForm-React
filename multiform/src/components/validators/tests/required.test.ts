import required from './../required';

const validate = required(true);

describe('required validator', () => {

    it('rejects when value isempty null or undefined ', () => {
      
        expect(validate("")).toBe(false);
        expect(validate(null)).toBe(false);
       
    });

    it('accepts when value is bigger than zero char', () => {
        expect(validate(50)).toBe(true);
        expect(validate("dfdf")).toBe(true);
       
    });

});


