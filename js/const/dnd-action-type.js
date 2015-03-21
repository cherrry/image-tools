'use strict'

var defineConstants = require('src/util/define-constants.js')

var DndActionType = defineConstants([
    'DRAGENTER',
    'DRAGLEAVE',
    'DROP'
])

module.exports = DndActionType
