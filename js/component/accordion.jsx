'use strict'

var React = require('react')
var classnames = require('classnames')

var AccordionItem = require('src/component/accordion-item.jsx')

var Accordion = React.createClass({
    propTypes: {
        activeChild: React.PropTypes.number
    },
    getDefaultProps: function () {
        return {
            activeChild: -1
        }
    },
    getInitialState: function () {
        var self = this
        return {
            active_child: self.props.activeChild
        }
    },
    _activateChild: function (child_index) {
        var self = this
        self.setState(function (state, props) {
            return {
                active_child: state.active_child === child_index ? -1 : child_index
            }
        })
    },
    render: function () {
        var self = this

        var active_child = self.state.active_child
        var children = React.Children.map(self.props.children, function (child, index) {
            if (child.type === AccordionItem) {
                var is_active = active_child === index
                return React.cloneElement(child, {
                    is_active: is_active,
                    onActivate: self._activateChild.bind(self, index)
                })
            }
            return child
        })

        return (
            <div className={ classnames('ui accordion', self.props.className) }>
                { children }
            </div>
        )
    }
})

module.exports = Accordion
