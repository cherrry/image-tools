'use strict'

var assign = require('object-assign')
var EventEmitter = require('events').EventEmitter

var Dispatcher = require('src/singleton/dispatcher.js')
var WindowActionType = require('src/const/window-action-type.js')
var uniqueString = require('src/util/unique-string.js')

var WINDOW_EVENT = uniqueString()

var WindowStore = assign({}, EventEmitter.prototype, {
    addListener: function (callback) {
        var self = this
        self.on(WINDOW_EVENT, callback)
    },
    removeListener: function (callback) {
        self.removeListener(WINDOW_EVENT, callback)
    }
})

function resize() {
    WindowStore.emit(WINDOW_EVENT, {
        type: WindowActionType.RESIZE
    })
}

Dispatcher.register(function (message) {
    switch (message.type) {
        case WindowActionType.RESIZE:
            resize()
            break
    }
})

module.exports = WindowStore
