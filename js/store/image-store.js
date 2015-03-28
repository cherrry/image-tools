'use strict'

var _ = require('underscore')
var EventEmitter = require('events').EventEmitter

var Dispatcher = require('src/singleton/dispatcher.js')
var ImageActionType = require('src/const/image-action-type.js')
var uniqueString = require('src/util/unique-string.js')

var IMAGE_EVENT = uniqueString()

var _store = {
    data_url: ''
}

var ImageStore = _.extend({}, EventEmitter.prototype, {
    getImageDataUrl: function () {
        return _store.data_url
    },
    addListener: function (callback) {
        var self = this
        self.on(IMAGE_EVENT, callback)
    },
    removeListener: function (callback) {
        var self = this
        self.removeListener(IMAGE_EVENT, callback)
    }
})

var is_image = /^image\//
function dropFiles(files) {
    for (var i = 0, l = files.length; i < l; i ++) {
        var file = files[i];
        if (is_image.test(file.type)) {
            setImageFile(file)
            return
        }
    }
}

function setImageDataUrl(data_url) {
    if (data_url !== _store.data_url) {
        _store.data_url = data_url
        ImageStore.emit(IMAGE_EVENT)
    }
}

function setImageFile(file) {
    var reader = new FileReader()

    reader.onload = function (event) {
        var data_url = event.target.result
        setImageDataUrl(data_url)
    }

    reader.readAsDataURL(file)
}

function resizeCanvas() {
    ImageStore.emit(IMAGE_EVENT)
}

Dispatcher.register(function (message) {
    switch (message.type) {
        case ImageActionType.DROP_FILES:
            dropFiles(message.data.files)
            break
        case ImageActionType.RESIZE_CANVAS:
            resizeCanvas()
            break
    }
})

module.exports = ImageStore
