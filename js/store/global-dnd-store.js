'use strict'

var assign = require('object-assign')
var EventEmitter = require('events').EventEmitter

var Dispatcher = require('src/var/dispatcher.js')
var DndActionType = require('src/const/dnd-action-type.js')

var DND_EVENT = 'dnd'

var _store = {
    is_dragging: false,
    files: []
}

var GlobalDndStore = assign({}, EventEmitter.prototype, {
    isDragging: function () {
        return _store.is_dragging
    },
    getFiles: function () {
        return _store.files
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
    _store.is_dragging = is_dragging

    if (was_dragging !== is_dragging) {
        GlobalDndStore.emit(DND_EVENT)
    }
}

function setFiles(files) {
    _store.files = files || []
    GlobalDndStore.emit(DND_EVENT)
}

Dispatcher.register(function (message) {
    switch (message.type) {
        case DndActionType.DRAGENTER:
            setIsDragging(true)
            break
        case DndActionType.DRAGLEAVE:
            setIsDragging(false)
            break
        case DndActionType.DROP:
            setFiles(message.data.files)
            break
    }
})

module.exports = GlobalDndStore
