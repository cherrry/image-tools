'use strict'

var React = require('react')

var UploadButton = require('src/component/upload-button.jsx')
var ImageAction = require('src/action/image-action.js')

var Accordion = require('src/component/accordion.jsx')
var AccordionItem = require('src/component/accordion-item.jsx')

var FilterSelector = require('src/layout/sidebar/filter-selector.jsx')

var Sidebar = React.createClass({
    _uploadImage: function (event) {
        var files = event.target.files
        ImageAction.dropFiles(files)
    },
    render: function () {
        var self = this
        return (
            <div className="it-sidebar-container">
                <div className="it-inner-container">
                    <div className="it-sidebar-inner-segment ui inverted segment">
                        <h4 className="ui header">Image Processing Tool</h4>
                        <Accordion className="inverted" activeChild={ 1 }>
                            <AccordionItem title="Upload Image">
                                <UploadButton onChange={ self._uploadImage } className="ui inverted fluid button">Select Image</UploadButton>
                                or drop to this page
                            </AccordionItem>
                            <AccordionItem title="Select Filters">
                                <FilterSelector />
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Sidebar
