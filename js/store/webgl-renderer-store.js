'use strict'

var assign = require('object-assign')
var EventEmitter = require('events').EventEmitter

var Dispatcher = require('src/var/dispatcher.js')
var DndActionType = require('src/const/dnd-action-type.js')
var WebglRendererActionType = require('src/const/webgl-renderer-action-type.js')

var RENDERER_EVENT = 'renderer'

var _store = {
    image_file: null,
    image_url: null
}

var is_image = /^image\//

var WebglRendererStore = assign({}, EventEmitter.prototype, {
    getImageFile: function () {
        return _store.image_file
    },
    getImageUrl: function () {
        return _store.image_url
    },
    addListener: function (callback) {
        var self = this
        self.on(RENDERER_EVENT, callback)
    },
    removeListener: function (callback) {
        var self = this
        self.removeListener(RENDERER_EVENT, callback)
    }
})

function resize() {
    if (_store.image_file === null)
        return
    WebglRendererStore.emit(RENDERER_EVENT)
}

function updateImageFromFiles(files) {
    for (var i = 0, _len = files.length; i < _len; i++) {
        var file = files[i]
        if (is_image.test(file.type)) {
            updateImage(file)
            return
        }
    }
}

function updateImage(imageFile) {
    if (imageFile === _store.image_file || imageFile === null)
        return

    _store.image_file = imageFile

    var reader = new FileReader()
    reader.onload = function (event) {
        _store.image_url = event.target.result
        WebglRendererStore.emit(RENDERER_EVENT)
    }
    reader.readAsDataURL(imageFile)
}

Dispatcher.register(function (message) {
    switch (message.type) {
        case WebglRendererActionType.RESIZE:
            resize()
            break
        case DndActionType.DROP:
            updateImageFromFiles(message.data.files)
            break
    }
})

module.exports = WebglRendererStore
