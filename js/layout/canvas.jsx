'use strict'

var React = require('react')
var _ = require('underscore')

var window = require('src/var/window.js')

var Canvas = React.createClass({
    componentDidMount: function () {
        var self = this
        self._adjustCanvasSize = _.debounce(self._adjustCanvasSize, 250)
        window.addEventListener('resize', self._adjustCanvasSize)
    },
    componentWillUnmount: function () {
        window.removeEventListener('resize', self._adjustCanvasSize)
    },
    _adjustCanvasSize: function () {
        var self = this

        var menu = self.refs.menu.getDOMNode()
        var canvasDisplay = self.refs.canvasDisplay.getDOMNode()
        var canvasSegment = self.refs.canvasSegment.getDOMNode()
        var canvas = self.refs.canvas.getDOMNode()

        canvasDisplay.style.height = 'calc(100% - ' + menu.scrollHeight + 'px - 1em)'
        canvas.height = canvasSegment.scrollHeight
        canvas.width = canvasSegment.scrollWidth
    },
    render: function () {
        var self = this
        window.setTimeout(self._adjustCanvasSize)
        return (
            <div className="it-canvas-container">
                <div className="it-inner-container" style={{ overflow: 'hidden' }}>
                    <div ref="menu" className="it-canvas-menu ui red secondary pointing menu">
                        <a className="active item">Before</a>
                        <a className="item">After</a>
                    </div>
                    <div ref="canvasDisplay" className="it-canvas-display">
                        <div className="it-canvas-segment ui segment">
                            <div ref="canvasSegment" className="it-canvas-inner-segment">
                                <canvas ref="canvas" className="it-canvas"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Canvas
