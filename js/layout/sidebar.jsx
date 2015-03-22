'use strict'

var React = require('react')

var UploadButton = require('src/component/upload-button.jsx')

var Sidebar = React.createClass({
    _uploadImage: function (event) {
        var files = event.target.files
        console.log('FileAction.drop(files)')
    },
    render: function () {
        var self = this
        return (
            <div className="it-sidebar-container">
                <div className="it-inner-container">
                    <div className="it-sidebar-inner-segment ui inverted segment">
                        <h4 className="ui header">Image Processing Tool</h4>
                        <div className="ui inverted accordion">
                            <div>
                                <div className="active title">
                                    <i className="dropdown icon"></i>
                                    Upload Image
                                </div>
                                <div className="active content">
                                    <UploadButton onChange={ self._uploadImage } className="ui inverted fluid button">Select Image</UploadButton>
                                    or drop to this page
                                </div>
                            </div>
                            <div className="title">
                                <i className="dropdown icon"></i>
                                Select Filters
                            </div>
                            <div className="content"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Sidebar
