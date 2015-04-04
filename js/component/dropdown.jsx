'use strict'

var React = require('react/addons')
var classnames = require('classnames')
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
var CatfootedTransitionGroup = require('react-catfooted')

var window = require('src/var/window.js')
var document = require('src/var/document.js')

var Dropdown = React.createClass({
    getDefaultProps: function () {
        return {
            placeholder: ''
        }
    },
    getInitialState: function () {
        var self = this
        return {
            isActive: false,
            displayContent: self.props.placeholder,
            value: null
        }
    },
    componentWillUnmount: function () {
        document.removeEventListener('click', self._deactivate)
    },
    _activate: function () {
        var self = this
        self.setState({
            isActive: true
        })
        document.addEventListener('click', self._deactivate)
    },
    _deactivate: function () {
        var self = this
        self.setState({
            isActive: false
        })
        document.removeEventListener('click', self._deactivate)
    },
    _selectItem: function (text, value) {
        var self = this
        if (self.state.value !== value && self.props.onChange) {
            self.props.onChange(value)
        }
        self.setState({
            isActive: false,
            displayContent: text,
            value: value
        })
    },
    render: function () {
        var self = this
        var isActive = self.state.isActive

        var selectMenu = null
        if (isActive) {
            var selectItems = React.Children.map(self.props.children, function (child) {
                return React.addons.cloneWithProps(child, {
                    onSelect: self._selectItem
                })
            })
            selectMenu = (
                <div key='selectMenu' className='menu'>
                    { selectItems }
                </div>
            )
        }

        return (
            <div className={ classnames('ui selection dropdown', self.props.className, { active: isActive }) } onClick={ self._activate }>
                <div className='text'>{ self.state.displayContent }</div>
                <i className='dropdown icon' />
                <CatfootedTransitionGroup transitionName='anim-dropdown'>
                    {[ selectMenu ]}
                </CatfootedTransitionGroup>
            </div>
        )
    }
})

module.exports = Dropdown
