'use strict'

var React = require('react')

var Sidebar = React.createClass({
    render: function () {
        return (
            <div className="it-sidebar-container">
                <div className="it-inner-container">
                    <div className="it-sidebar-inner-segment ui inverted segment">
                        <h4 className="ui header">Image Processing Tool</h4>
                        <div className="ui inverted accordion">
                            <div className="active title">
                                <i className="dropdown icon"></i>
                                Title
                            </div>
                            <div className="active content">
                                <p>Content</p>
                            </div>
                            <div className="title">
                                <i className="dropdown icon"></i>
                                Title
                            </div>
                            <div className="content">
                                <p>Content</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Sidebar
