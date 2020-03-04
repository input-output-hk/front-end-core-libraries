import { getFontSize } from './theme'

describe('getFontSize', () => {
  describe('when fontSize > 0', () => {
    test('when fontSize is 1 and baseFontSize is 16 it returns 1.6rem', () => {
      expect(getFontSize(1, 16)).toEqual('1.6rem')
    })

    test('when fontSize is 1 and baseFontSize is 14 it returns 1.4rem', () => {
      expect(getFontSize(1, 14)).toEqual('1.4rem')
    })

    test('when fontSize is 1.5 and baseFontSize is 16 it returns 2.4rem', () => {
      expect(getFontSize(1.5, 16)).toEqual('2.4rem')
    })

    test('when fontSize is 0.75 and baseFontSize is 20 it returns 1.5rem', () => {
      expect(getFontSize(0.75, 20)).toEqual('1.5rem')
    })
  })

  describe('when fontSize not a number > 0', () => {
    test('when fontSize is 0 and baseFontSize is 10 it returns 1rem', () => {
      expect(getFontSize(0, 10)).toEqual('1rem')
    })

    test('when fontSize is null and baseFontSize is 18 it returns 1.8rem', () => {
      expect(getFontSize(null, 18)).toEqual('1.8rem')
    })

    test('when fontSize is undefined and baseFontSize is 14 it returns 1.4rem', () => {
      expect(getFontSize(undefined, 14)).toEqual('1.4rem')
    })

    test('when fontSize is -2 and baseFontSize is 16 it returns 1.6rem', () => {
      expect(getFontSize(-2, 16)).toEqual('1.6rem')
    })
  })

  describe('when baseFontSize is not a number greater than 0', () => {
    test('it throws an error', () => {
      expect(() => getFontSize(null, 0)).toThrowError('getFontSize error, baseFontSize must be a number greater than 0')
    })
  })
})
