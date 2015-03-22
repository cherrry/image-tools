'use strict'

var _ = require('underscore')

var DndStore = require('src/store/dnd-store.js')
var document = require('src/var/document.js')
var WindowAction = require('src/action/window-action.js')

var counter = 0

function onDragEnter(event) {
    event.preventDefault()
    event.stopPropagation()
    ++counter
    if (counter == 1) {
        WindowAction.dragEnter()
    }
}

function onDragLeave(event) {
    event.preventDefault()
    event.stopPropagation()
    --counter
    if (counter === 0) {
        WindowAction.dragLeave()
    }
}

function onDrop(event) {
    event.preventDefault()
    counter = 0
    WindowAction.dragLeave()
}

function onDragOver(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
}

document.addEventListener('dragenter', onDragEnter, false)
document.addEventListener('dragleave', onDragLeave, false)
document.addEventListener('dragover', onDragOver, false)
document.addEventListener('drop', onDrop, false)
