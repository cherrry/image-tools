'use strict'

jest.dontMock('../window-store.js')

describe('WindowStore', function () {
    var Dispatcher = null
    var WindowStore = null
    var registerCallback = null

    beforeEach(function () {
        Dispatcher = require('src/singleton/dispatcher.js')
        WindowStore = require('../window-store.js')
        registerCallback = Dispatcher.register.mock.calls[0][0]
    })

    it('should register a callback with the dispatcher', function () {
        expect(Dispatcher.register.mock.calls.length).toBe(1)
    })
})
