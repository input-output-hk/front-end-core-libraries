import ReactGA from 'react-ga'
import * as logger from './logger'
import {
  initialize,
  pageView,
  modalView,
  capture,
  click,
  autoCapture,
  timing,
  exception
} from './analytics'

function resetReactGAMocks () {
  ReactGA.pageview.mockReset()
  ReactGA.modalview.mockReset()
  ReactGA.event.mockReset()
  ReactGA.timing.mockReset()
  ReactGA.exception.mockReset()
}

describe('analytics library', () => {
  beforeEach(() => {
    // eslint-disable-next-line import/namespace
    logger.info = jest.fn()
    // eslint-disable-next-line import/namespace
    logger.error = jest.fn()
    ReactGA.initialize = jest.fn()
    ReactGA.pageview = jest.fn()
    ReactGA.modalview = jest.fn()
    ReactGA.event = jest.fn()
    ReactGA.timing = jest.fn()
    ReactGA.exception = jest.fn()
  })

  afterEach(() => {
    resetReactGAMocks()
  })

  describe('before initialization', () => {
    test('pageView does nothing', () => {
      pageView('/')
      expect(ReactGA.pageview).not.toBeCalled()
    })

    test('modalView does nothing', () => {
      modalView('modal')
      expect(ReactGA.modalview).not.toBeCalled()
    })

    test('capture does nothing', () => {
      capture({ category: 'CATEGORY', action: 'ACTION', label: 'LABEL', value: 1 })
      expect(ReactGA.event).not.toBeCalled()
    })

    test('click does nothing', () => {
      click({ category: 'CATEGORY', event: {}, label: 'LABEL' })
      expect(ReactGA.event).not.toBeCalled()
    })

    test('autoCapture does nothing', () => {
      autoCapture({ category: 'CATEGORY', action: 'ACTION', label: 'LABEL', value: 1 })
      expect(ReactGA.event).not.toBeCalled()
    })

    test('timing does nothing', () => {
      timing({ category: 'CATEGORY', label: 'LABEL', value: 1, variable: 'VARIABLE' })
      expect(ReactGA.timing).not.toBeCalled()
    })

    test('exception does nothing', () => {
      exception({ description: 'DESCRIPTION', fatal: false, args: [], error: new Error() })
      expect(ReactGA.exception).not.toBeCalled()
    })
  })

  describe('initialize', () => {
    beforeEach(() => {
      initialize('1234')
    })

    test('ReactGA initializes', () => {
      expect(ReactGA.initialize).toBeCalledWith('1234', expect.any(Object))
    })
  })

  describe('after initialization', () => {
    test('pageView calls ReactGA.pageview correctly', () => {
      pageView('/')
      expect(ReactGA.pageview).toBeCalledWith('/')
    })

    test('modalView calls ReactGA.modalview correctly', () => {
      modalView('modal')
      expect(ReactGA.modalview).toBeCalledWith('modal')
    })

    test('capture calls ReactGA.event correctly', () => {
      capture({ category: 'CATEGORY', action: 'ACTION', label: 'LABEL', value: 1 })
      expect(ReactGA.event).toBeCalledWith({ category: 'CATEGORY', action: 'ACTION', label: 'LABEL', value: 1 })
    })

    describe('click', () => {
      let originalDocumentGetElementsByTagName
      beforeEach(() => {
        const body = {
          scrollHeight: 150,
          offsetHeight: 150,
          scrollWidth: 300,
          offsetWidth: 300
        }

        const html = {
          scrollHeight: 150,
          offsetHeight: 150,
          clientHeight: 150,
          scrollWidth: 300,
          offsetWidth: 300,
          clientWidth: 300
        }

        originalDocumentGetElementsByTagName = window.document.getElementsByTagName
        Object.defineProperty(window.document, 'getElementsByTagName', {
          value: (name) => {
            if (name === 'body') return [ body ]
            if (name === 'html') return [ html ]
            return []
          },
          configurable: true
        })
      })

      afterEach(() => {
        Object.defineProperty(window.document, 'getElementsByTagName', originalDocumentGetElementsByTagName)
      })

      test('click calls ReactGA.event correctly', () => {
        click({ category: 'CATEGORY', label: 'LABEL' })
        expect(ReactGA.event).toBeCalledWith({ category: 'CATEGORY', action: 'click', label: 'LABEL' })
      })

      test('click with an event calls ReactGA.event with click co-ordinates correctly', () => {
        click({ category: 'CATEGORY', event: { pageX: 50, pageY: 10 }, label: 'LABEL' })
        expect(ReactGA.event).toBeCalledWith({ category: 'CATEGORY', action: 'click_coordinates', label: JSON.stringify({ x: '0.17', y: '0.07' }) })
      })

      test('click with no event only calls ReactGA.event once', () => {
        click({ category: 'CATEGORY', label: 'LABEL' })
        expect(ReactGA.event).toHaveBeenCalledTimes(1)
      })

      describe('When getElementsByTagName is not available', () => {
        let originalDocumentGetElementsByTagName
        beforeEach(() => {
          originalDocumentGetElementsByTagName = window.document.getElementsByTagName
          Object.defineProperty(window.document, 'getElementsByTagName', { value: null, configurable: true })
        })

        afterEach(() => {
          Object.defineProperty(window.document, 'getElementsByTagName', originalDocumentGetElementsByTagName)
        })

        test('it calls capture with null co-ordinates', () => {
          click({ category: 'CATEGORY', event: { pageX: 50, pageY: 10 }, label: 'LABEL' })
          expect(ReactGA.event).toBeCalledWith({ category: 'CATEGORY', action: 'click_coordinates', label: JSON.stringify({ x: null, y: null }) })
        })
      })
    })

    test('autoCapture calls ReactGA.event correctly', () => {
      autoCapture({ category: 'CATEGORY', action: 'ACTION', label: 'LABEL', value: 1 })
      expect(ReactGA.event).toBeCalledWith({ category: 'CATEGORY', action: 'ACTION', label: 'LABEL', value: 1, nonInteraction: true })
    })

    test('timing calls ReactGA.timing correctly', () => {
      timing({ category: 'CATEGORY', label: 'LABEL', value: 1, variable: 'VARIABLE' })
      expect(ReactGA.timing).toBeCalledWith({ category: 'CATEGORY', label: 'LABEL', value: 1, variable: 'VARIABLE' })
    })

    test('exception calls ReactGA.exception correctly', () => {
      exception({ description: 'DESCRIPTION', fatal: false, args: [], error: new Error() })
      expect(ReactGA.exception).toBeCalledWith({ description: 'DESCRIPTION', fatal: false })
    })

    describe('when errors occur the application is not halted', () => {
      beforeEach(() => {
        ReactGA.pageview.mockImplementation(() => { throw new Error() })
        ReactGA.modalview.mockImplementation(() => { throw new Error() })
        ReactGA.event.mockImplementation(() => { throw new Error() })
        ReactGA.timing.mockImplementation(() => { throw new Error() })
        ReactGA.exception.mockImplementation(() => { throw new Error() })
      })

      test('pageView', () => {
        expect(() => pageView('/')).not.toThrowError()
      })

      test('modalView', () => {
        expect(() => modalView('modal')).not.toThrowError()
      })

      test('capture', () => {
        expect(() => capture({ category: 'CATEGORY', action: 'ACTION', label: 'LABEL', value: 1 })).not.toThrowError()
      })

      test('click', () => {
        expect(() => click({ category: 'CATEGORY', event: {}, label: 'LABEL' })).not.toThrowError()
      })

      test('autoCapture', () => {
        expect(() => autoCapture({ category: 'CATEGORY', action: 'ACTION', label: 'LABEL', value: 1 })).not.toThrowError()
      })

      test('timing', () => {
        expect(() => timing({ category: 'CATEGORY', label: 'LABEL', value: 1, variable: 'VARIABLE' })).not.toThrowError()
      })

      test('exception', () => {
        expect(() => exception({ description: 'DESCRIPTION', fatal: false, args: [], error: new Error('Ignore me') })).not.toThrowError()
      })
    })
  })
})
