import { error } from './logger'
import * as analytics from './analytics'

describe('logger', () => {
  describe('error', () => {
    beforeEach(() => {
      jest.spyOn(analytics, 'exception')
    })

    test('analytics.exception is called', () => {
      const err = new Error('Test')
      error({ id: 'TEST', description: 'DESCRIPTION', fatal: true, args: [ 0, 1, 2 ], error: err })
      expect(analytics.exception).toBeCalledWith({ description: 'DESCRIPTION', fatal: true, args: [ 0, 1, 2 ], error: err })
    })
  })
})
