'use strict'

var _ = require('underscore')

var window = require('src/var/window.js')
var WindowAction = require('src/action/window-action.js')

var onResize = _.debounce(function (event) {
    WindowAction.resize()
}, 100)

window.addEventListener('resize', onResize)
