'use strict'

var assign = require('object-assign')
var EventEmitter = require('events').EventEmitter

var Dispatcher = require('src/var/dispatcher.js')
var ImageActionType = require('src/const/image-action-type.js')
var uniqueString = require('src/util/unique-string.js')

var IMAGE_EVENT = uniqueString()

var ImageStore = assign({}, EventEmitter.prototype, {
    addListener: function (callback) {
        var self = this
        self.on(IMAGE_EVENT, callback)
    },
    removeListener: function (callback) {
        var self = this
        self.removeListener(IMAGE_EVENT, callback)
    }
})

function dropFiles(files) {
    console.log('drop files', files)
}

Dispatcher.register(function (message) {
    switch (message.type) {
        case ImageActionType.DROP_FILES:
            dropFiles(message.data.files)
            break
    }
})

module.exports = ImageStore
