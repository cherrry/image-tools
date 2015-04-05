'use strict'

var React = require('react')

var DropdownItem = React.createClass({
    getDefaultProps: function () {
        return {
            value: null
        }
    },
    _onSelect: function () {
        var self = this
        var props = self.props
        if (props.onSelect) {
            props.onSelect(props.children, props.value)
        }
    },
    render: function () {
        var self = this
        return (
            <div className="item" onClick={ self._onSelect }>{ self.props.children }</div>
        )
    }
})

module.exports = DropdownItem
