'use strict'

var React = require('react')

var AccordionItem = React.createClass({
    getDefaultProps: function () {
        return {
            is_active: false
        }
    },
    _onActivate: function () {
        var self = this
        if (self.props.onActivate) {
            self.props.onActivate()
        }
    },
    render: function () {
        var self = this
        var is_active = self.props.is_active
        return (
            <div>
                <div onClick={ self._onActivate } className={ "title" + ( is_active ? " active" : "" ) }>
                    <i className="dropdown icon" />
                    { self.props.title }
                </div>
                <div className={ "content" + ( is_active ? " active" : "" ) }>
                    { self.props.children }
                </div>
            </div>
        )
    }
})

module.exports = AccordionItem
