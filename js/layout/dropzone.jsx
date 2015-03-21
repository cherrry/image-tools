'use strict'

var React = require('react/addons')
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

var GlobalDndStore = require('src/store/global-dnd-store.js')
var GlobalDndAction = require('src/action/global-dnd-action.js')

function getState() {
    return {
        is_active: GlobalDndStore.isDragging()
    }
}

var Dropzone = React.createClass({
    getInitialState: function () {
        return getState()
    },
    componentWillMount: function () {
        var self = this
        GlobalDndStore.addListener(self._onDnd)
    },
    componentWillUnmount: function () {
        var self = this
        GlobalDndStore.removeListener(self._onDnd)
    },
    _onDnd: function () {
        var self = this
        self.setState(getState)
    },
    _onDrop: function (event, data) {
        event.preventDefault()
        var files = event.dataTransfer.files
        GlobalDndAction.drop(files)
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
