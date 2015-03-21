'use strict'

var React = require('react')

var Canvas = require('src/layout/canvas.jsx')
var Sidebar = require('src/layout/sidebar.jsx')

var Index = React.createClass({
    render: function () {
        return (
            <div className="it-container">
                <Canvas />
                <Sidebar />
            </div>
        )
    }
})

var mount_point = document.getElementById('mount-point')
React.render(<Index />, mount_point)
