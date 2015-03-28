'use strict'

jest.dontMock('../dnd-store.js')

describe('WindowStore', function () {
    var Dispatcher = null
    var DndStore = null
    var WindowActionType = null
    var callback = null

    beforeEach(function () {
        Dispatcher = require('src/singleton/dispatcher.js')
        DndStore = require('../dnd-store.js')
        WindowActionType = require('src/const/window-action-type.js')
        callback = Dispatcher.register.mock.calls[0][0]
    })

    describe('init', function () {
        it('should register a callback with the dispatcher', function () {
            expect(Dispatcher.register.mock.calls.length).toBe(1)
        })

        it('should initialize with not dragging', function () {
            var is_dragging = DndStore.isDragging()
            expect(is_dragging).toBe(false)
        })
    })

    describe('dragEnter', function () {
        it('should start dragging when dragenter', function () {
            var message = {
                type: WindowActionType.DRAG_ENTER
            }
            callback(message)

            var is_dragging = DndStore.isDragging()
            expect(is_dragging).toBe(true)
        })
    })

    describe('dragLeave', function () {
        it('should stop dragging when dragleave', function () {
            var message = {
                type: WindowActionType.DRAG_LEAVE
            }
            callback(message)

            var is_dragging = DndStore.isDragging()
            expect(is_dragging).toBe(false)
        })
    })
})
