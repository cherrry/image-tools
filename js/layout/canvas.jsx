'use strict'

var React = require('react')
var debounce = require('minced/debounce')

var window = require('src/var/window.js')
var WindowStore = require('src/store/window-store.js')
var WebglRenderer = require('src/layout/canvas/webgl-renderer.jsx')
var ImageAction = require('src/action/image-action.js')

var findDOMNode = React.findDOMNode

var Canvas = React.createClass({
    componentDidMount: function () {
        var self = this
        self._adjustCanvasSize = debounce(self._adjustCanvasSize, 200)
        WindowStore.addListener(self._adjustCanvasSize)
    },
    componentWillUnmount: function () {
        WindowStore.removeListener(self._adjustCanvasSize)
    },
    _adjustCanvasSize: function () {
        var self = this

        var refs = self.refs
        var menu = findDOMNode(refs.menu)
        var canvasDisplay = findDOMNode(refs.canvasDisplay)
        var canvasSegment = findDOMNode(refs.canvasSegment)
        var canvas = findDOMNode(refs.canvas)

        canvasDisplay.style.height = 'calc(100% - ' + menu.scrollHeight + 'px - 1em)'
        canvas.height = canvasSegment.scrollHeight
        canvas.width = canvasSegment.scrollWidth
        ImageAction.resizeCanvas()
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
                                <WebglRenderer ref="canvas" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Canvas
