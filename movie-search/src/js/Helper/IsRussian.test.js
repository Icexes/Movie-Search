import isRussian from './IsRussian'

describe('IsRussian', () => {
    it('Should return  value', () => {
        expect(isRussian('')).toBeDefined();
    })
    it ('Should return Boolean value',() => {
        expect(typeof isRussian('')).toBe('boolean');;
    })
    it('Should return false if text value on English ', () => {
        expect(isRussian('English')).toBe(false);
    })
    it('Should return true if text value on Russian', () => {
        expect(isRussian('Русский')).toBe(true);
    })
});