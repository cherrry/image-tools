'use strict'

var React = require('react')
var PIXI = require('pixi')

var WindowStore = require('src/store/window-store.js')
var ImageStore = require('src/store/image-store.js')

var WebglRenderer = React.createClass({
    componentDidMount: function () {
        var self = this
        var canvas = self.refs.canvas.getDOMNode()
        self._renderer = new PIXI.WebGLRenderer(0, 0, {
            view: canvas,
            transparent: true
        })
        // WindowStore.addListener(self._redraw)
    },
    componentWillUnmount: function () {
        var self = this
        // WindowStore.removeListener(self._redraw)
    },
    _onWindowUpdate: function (message) {
        // console.log(message)
    },
    _redraw: function () {
        // TODO: get image from file store
        /*
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
        */
    },
    render: function () {
        var self = this
        return (
            <canvas ref="canvas" className="it-canvas" />
        )
    }
})

module.exports = WebglRenderer
