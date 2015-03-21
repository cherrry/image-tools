'use strict'

var DndStore = require('src/store/global-dnd-store.js')
var GlobalDndAction = require('src/action/global-dnd-action.js')

var document = require('src/var/document.js')

var counter = 0

function onDragEnter(event) {
    event.preventDefault()
    event.stopPropagation()
    ++counter

    if (counter === 1) {
        GlobalDndAction.dragEnter()
    }
}

function onDragLeave(event) {
    event.preventDefault()
    event.stopPropagation()
    --counter

    if (counter === 0) {
        GlobalDndAction.dragLeave()
    }
}

function onDrop(event) {
    event.preventDefault()
    GlobalDndAction.dragLeave()
}

function onDragOver(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
}

document.addEventListener('dragenter', onDragEnter, false)
document.addEventListener('dragleave', onDragLeave, false)
document.addEventListener('dragover', onDragOver, false)
document.addEventListener('drop', onDrop, false)

DndStore.addListener(onDnd)

function onDnd() {
    var is_dragging = DndStore.isDragging()
    if (!is_dragging) {
        counter = 0
    }
}
