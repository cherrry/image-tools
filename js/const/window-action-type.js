'use strict'

var defineEnums = require('src/util/define-enums.js')

var WindowActionType = defineEnums([
    'RESIZE',
    'DRAG_ENTER',
    'DRAG_LEAVE'
])

module.exports = WindowActionType
