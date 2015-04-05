'use strict'

var extend = require('minced/extend')
var EventEmitter = require('events').EventEmitter

var Dispatcher = require('src/singleton/dispatcher.js')
var WindowActionType = require('src/const/window-action-type.js')
var uniqueString = require('src/util/unique-string.js')

var DND_EVENT = uniqueString()

var _store = {
    is_dragging: false
}

var DndStore = extend({}, EventEmitter.prototype, {
    isDragging: function () {
        return _store.is_dragging
    },
    addListener: function (callback) {
        var self = this
        self.on(DND_EVENT, callback)
    },
    removeListener: function (callback) {
        var self = this
        self.removeListener(DND_EVENT, callback)
    }
})

function setIsDragging(is_dragging) {
    var was_dragging = _store.is_dragging
    if (is_dragging !== was_dragging) {
        _store.is_dragging = is_dragging
        DndStore.emit(DND_EVENT)
    }
}

Dispatcher.register(function (message) {
    switch (message.type) {
        case WindowActionType.DRAG_ENTER:
            setIsDragging(true)
            break
        case WindowActionType.DRAG_LEAVE:
            setIsDragging(false)
            break
    }
})

module.exports = DndStore
