'use strict'

var React = require('react')

var document = require('src/var/document.js')
var Canvas = require('src/layout/canvas.jsx')
var Sidebar = require('src/layout/sidebar.jsx')
var Dropzone = require('src/layout/dropzone.jsx')

require('src/listener/global-dnd-listener.js')

var Index = React.createClass({
    render: function () {
        return (
            <div>
                <div className="it-container">
                    <Canvas />
                    <Sidebar />
                </div>
                <Dropzone />
            </div>
        )
    }
})

var mount_point = document.getElementById('mount-point')
React.render(<Index />, mount_point)
