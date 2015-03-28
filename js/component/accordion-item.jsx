'use strict'

var React = require('react')
var classnames = require('classnames')

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
                <div onClick={ self._onActivate } className={ classnames('title', { active: is_active } ) }>
                    <i className="dropdown icon" />
                    { self.props.title }
                </div>
                <div className={ classnames('content', { active: is_active }) }>
                    { self.props.children }
                </div>
            </div>
        )
    }
})

module.exports = AccordionItem
