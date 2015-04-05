'use strict'

var React = require('react')
var PIXI = require('pixi')

var requestAnimationFrame = require('src/var/request-animation-frame.js')
var ImageStore = require('src/store/image-store.js')

var findDOMNode = React.findDOMNode

var WebglRenderer = React.createClass({
    componentDidMount: function () {
        var self = this
        var canvas = findDOMNode(self.refs.canvas)
        self._renderer = new PIXI.WebGLRenderer(0, 0, {
            transparent: true,
            view: canvas
        })
        ImageStore.addListener(self._draw)
    },
    componentWillUnmount: function () {
        var self = this
        ImageStore.removeListener(self._draw)
    },
    _draw: function () {
        var self = this
        var imageUrl = ImageStore.getImageDataUrl()

        var canvas = findDOMNode(self.refs.canvas)
        var canvasHeight = canvas.height
        var canvasWidth = canvas.width

        var renderer = self._renderer
        renderer.resize(canvasWidth, canvasHeight)

        var stage = new PIXI.Stage()

        var texture = PIXI.Texture.fromImage(imageUrl)
        var sprite = new PIXI.Sprite(texture)

        sprite.anchor.x = 0.5
        sprite.anchor.y = 0.5

        sprite.position.x = canvasWidth / 2
        sprite.position.y = canvasHeight / 2

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
