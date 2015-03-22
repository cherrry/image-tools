'use strict'

var Dispatcher = require('src/var/dispatcher.js')
var WebglRendererActionType = require('src/const/webgl-renderer-action-type.js')

var WebglRendererAction = {
    resize: function () {
        Dispatcher.dispatch({
            type: WebglRendererActionType.RESIZE
        })
    }
}

module.exports = WebglRendererAction
