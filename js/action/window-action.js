'use strict'

var Dispatcher = require('src/singleton/dispatcher.js')
var WindowActionType = require('src/const/window-action-type.js')

var WindowAction = {
    resize: function () {
        Dispatcher.dispatch({
            type: WindowActionType.RESIZE
        })
    },
    dragEnter: function () {
        Dispatcher.dispatch({
            type: WindowActionType.DRAG_ENTER
        })
    },
    dragLeave: function () {
        Dispatcher.dispatch({
            type: WindowActionType.DRAG_LEAVE
        })
    }
}

module.exports = WindowAction
