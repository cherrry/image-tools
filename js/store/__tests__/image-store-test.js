'use strict'

jest.dontMock('../image-store.js')

describe('ImageStore', function () {
    var Dispatcher = null
    var ImageStore = null
    var ImageActionType = null
    var registerCallback = null

    beforeEach(function () {
        Dispatcher = require('src/singleton/dispatcher.js')
        ImageStore = require('../image-store.js')
        ImageActionType = require('src/const/image-action-type.js')
        registerCallback = Dispatcher.register.mock.calls[0][0]
    })

    it('should register a callback with the dispatcher', function () {
        expect(Dispatcher.register.mock.calls.length).toBe(1)
    })

    it('should initialize with empty image', function () {
        var imageDataUrl = ImageStore.getImageDataUrl()
        expect(imageDataUrl).toBe('')
    })
})
