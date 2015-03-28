'use strict'

var React = require('react/addons')

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
        var active_child = self.state.active_child
        self.setState({
            active_child: active_child === child_index ? -1 : child_index
        })
    },
    render: function () {
        var self = this

        var active_child = self.state.active_child
        var children = React.Children.map(self.props.children, function (child, index) {
            if (child.type === AccordionItem.type) {
                var is_active = active_child === index
                return React.addons.cloneWithProps(child, {
                    is_active: is_active,
                    onActivate: self._activateChild.bind(self, index)
                })
            }
            return child
        })

        return (
            <div className={ "ui accordion" + ( self.props.className ? " " + self.props.className : "" ) }>
                { children }
            </div>
        )
    }
})

module.exports = Accordion
