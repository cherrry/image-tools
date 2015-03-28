'use strict'

var React = require('react')
var classnames = require('classnames')

var document = require('src/var/document.js')

var UploadButton = React.createClass({
    _triggerUpload: function (event) {
        var self = this
        var fileField = React.findDOMNode(self.refs.fileField)

        var clickEvent = document.createEvent('Events')
        clickEvent.initEvent('click', true, false)
        fileField.dispatchEvent(clickEvent)

        event.preventDefault()
    },
    render: function () {
        var self = this
        return (
            <div>
                <input ref="fileField" type="file" onChange={ self.props.onChange } hidden />
                <button className={ classnames(self.props.className) } onClick={ self._triggerUpload }>
                    { self.props.children }
                </button>
            </div>
        )
    }
})

module.exports = UploadButton
