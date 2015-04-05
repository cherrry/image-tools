'use strict'

var React = require('react')

var Dropdown = require('src/component/dropdown.jsx')
var DropdownItem = require('src/component/dropdown-item.jsx')

var FilterSelector = React.createClass({
    _onFilterChange: function (value) {
        console.log(value)
    },
    render: function () {
        var self = this
        return (
            <div>
                <Dropdown className='fluid' placeholder='Select an Filter' onChange={ self._onFilterChange }>
                    <DropdownItem value={ 0 }>Greyscale Filter</DropdownItem>
                    <DropdownItem value={ 1 }>Gaussian Filter</DropdownItem>
                    <DropdownItem value={ 2 }>Bilateral Filter</DropdownItem>
                    <DropdownItem value={ 3 }>Motion Filter</DropdownItem>
                    <DropdownItem value={ 4 }>Sobel Gradient Filter</DropdownItem>
                </Dropdown>
            </div>
        )
    }
})

module.exports = FilterSelector
