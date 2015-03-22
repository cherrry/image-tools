'use strict'

var React = require('react')
var PIXI = require('pixi')

var WebglRendererStore = require('src/store/webgl-renderer-store.js')

var WebglRenderer = React.createClass({
    componentDidMount: function () {
        var self = this
        var canvas = self.refs.canvas.getDOMNode()
        self._renderer = new PIXI.WebGLRenderer(0, 0, {
            view: canvas,
            transparent: true
        })
        WebglRendererStore.addListener(self._redraw)
    },
    componentWillUnmount: function () {
        var self = this
        WebglRendererStore.removeListener(self._redraw)
    },
    _redraw: function () {
        var self = this
        var renderer = self._renderer
        var canvas = renderer.view

        var imageUrl = WebglRendererStore.getImageUrl()

        var texture = PIXI.Texture.fromImage(imageUrl)
        var sprite = new PIXI.Sprite(texture)


        var stage = new PIXI.Stage()
        stage.addChild(sprite)

        requestAnimationFrame(function () {
            renderer.render(stage)
        })
    },
    render: function () {
        var self = this
        return (
            <canvas ref="canvas" className="it-canvas" />
        )
    }
})

module.exports = WebglRenderer
