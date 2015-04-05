'use strict'

var React = require('react/addons')
var classnames = require('classnames')
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

var CatfootedTransitionGroup = require('react-catfooted')
var TRANSITION_NAME = 'anim-accordion'

var AccordionItemContent = React.createClass({
    render: function () {
        var self = this
        return (
            <div className={ classnames(self.props.className) }>
                { self.props.children }
            </div>
        )
    }
})

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

        var content = null
        if (is_active) {
            content = (
                <AccordionItemContent key="content" className="active content">
                    { self.props.children }
                </AccordionItemContent>
            )
        }

        return (
            <div>
                <div onClick={ self._onActivate } className={ classnames('title', { active: is_active } ) }>
                    <i className="dropdown icon" />
                    { self.props.title }
                </div>
                <CatfootedTransitionGroup transitionName={ TRANSITION_NAME }>
                    { content }
                </CatfootedTransitionGroup>
            </div>
        )
    }
})

module.exports = AccordionItem
