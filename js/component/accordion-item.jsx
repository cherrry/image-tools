'use strict'

var React = require('react/addons')
var sprintf = require('underscore.string/sprintf')
var classnames = require('classnames')
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

var findDOMNode = React.findDOMNode
var document = require('src/var/document.js')
var uniqueCssId = require('src/util/unique-css-id.js')

var documentHead = document.head

var TRANSITION_NAME = 'anim-accordion'

var AccordionItemContent = React.createClass({
    componentWillMount: function () {
        var self = this
        self.id = uniqueCssId()
    },
    componentDidMount: function () {
        var self = this
        var id = self.id
        var transition = self.props.transitionName
        var node = findDOMNode(self)

        var style = document.createElement('style')
        style.appendChild(document.createTextNode(''))
        document.head.appendChild(style)

        var sheet = style.sheet;

        sheet.insertRule(sprintf('#%(id)s.%(transition)s-enter, #%(id)s.%(transition)s-leave.%(transition)s-leave-active { height: 0; }', { id: id, transition: transition }), 0)
        sheet.insertRule(sprintf('#%(id)s.%(transition)s-leave, #%(id)s.%(transition)s-enter.%(transition)s-enter-active { height: %(height)dpx; }', { id: id, transition: transition, height: node.scrollHeight }), 1)

        self.style = style;
    },
    componentDidUnmount: function () {
        document.head.removeChild(self.style)
    },
    render: function () {
        var self = this
        return (
            <div id={ self.id } className={ classnames(self.props.className) }>
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
                <AccordionItemContent key="content" className="active content" transitionName={ TRANSITION_NAME }>
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
                <ReactCSSTransitionGroup transitionName={ TRANSITION_NAME }>
                    { content }
                </ReactCSSTransitionGroup>
            </div>
        )
    }
})

module.exports = AccordionItem
