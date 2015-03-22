'use strict'

var React = require('react/addons')
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

var ImageAction = require('src/action/image-action.js')
var DndStore = require('src/store/dnd-store.js')

function getState() {
    return {
        is_active: DndStore.isDragging()
    }
}

var Dropzone = React.createClass({
    getInitialState: function () {
        return getState()
    },
    componentWillMount: function () {
        var self = this
        DndStore.addListener(self._onDnd)
    },
    componentWillUnmount: function () {
        var self = this
        DndStore.addListener(self._onDnd)
    },
    _onDnd: function () {
        var self = this
        self.setState(getState)
    },
    _onDrop: function (event, data) {
        event.preventDefault()
        var files = event.dataTransfer.files
        ImageAction.dropFiles(files)
    },
    render: function () {
        var self = this
        var is_active = self.state.is_active

        var component = null
        if (is_active) {
            component = (
                <div key="dnd" onDrop={ self._onDrop } className="it-global-dropzone">
                    <div className="it-dropzone-text">
                        Drop Image Here
                    </div>
                </div>
            )
        }

        return (
            <ReactCSSTransitionGroup transitionName="anim-dnd">
                { component }
            </ReactCSSTransitionGroup>
        )
    }
})

module.exports = Dropzone
