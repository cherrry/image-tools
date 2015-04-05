'use strict'

var debounce = require('minced/debounce')

var window = require('src/var/window.js')
var WindowAction = require('src/action/window-action.js')

var onResize = debounce(function () {
    WindowAction.resize()
}, 50)

window.addEventListener('resize', onResize)
