'use strict'

var Dispatcher = require('src/var/dispatcher.js')
var DndActionType = require('src/const/dnd-action-type.js')

var GlobalDndAction = {
    dragEnter: function () {
        Dispatcher.dispatch({
            type: DndActionType.DRAGENTER
        })
    },
    dragLeave: function () {
        Dispatcher.dispatch({
            type: DndActionType.DRAGLEAVE
        })
    },
    drop: function (files) {
        Dispatcher.dispatch({
            type: DndActionType.DROP,
            data: {
                files: files
            }
        })
    }
}

module.exports = GlobalDndAction
