'use strict'

var Dispatcher = require('src/var/dispatcher.js')
var ImageActionType = require('src/const/image-action-type.js')

var ImageAction = {
    dropFiles: function (files) {
        Dispatcher.dispatch({
            type: ImageActionType.DROP_FILES,
            data: {
                files: files
            }
        })
    },
    resizeCanvas: function () {
        Dispatcher.dispatch({
            type: ImageActionType.RESIZE_CANVAS
        })
    }
}

module.exports = ImageAction
