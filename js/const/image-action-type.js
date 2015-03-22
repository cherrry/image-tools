'use strict'

var defineEnums = require('src/util/define-enums.js')

var ImageActionType = defineEnums([
    'DROP_FILES',
    'RESIZE_CANVAS'
])

module.exports = ImageActionType
