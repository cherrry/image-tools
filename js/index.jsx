'use strict'

var React = require('react')

var Index = React.createClass({
    render: function () {
        return <h1>Image Processing Tool</h1>
    }
})

var mount_point = document.getElementById('mount-point')
React.render(<Index />, mount_point)
