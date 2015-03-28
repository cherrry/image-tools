'use strict'

jest.dontMock('../upload-button.jsx')

describe('upload button', function () {

    var React = null
    var TestUtils = null

    var UploadButton = null

    beforeEach(function () {
        React = require('react/addons')
        TestUtils = React.addons.TestUtils

        UploadButton = require('../upload-button.jsx')
    })

    it('should trigger click event on file input', function () {
        var onChange = jest.genMockFunction()
        var onClick = jest.genMockFunction()
        var uploadButton = TestUtils.renderIntoDocument(
            <UploadButton onChange={ onChange } />
        )

        var fileInput = TestUtils.findRenderedDOMComponentWithTag(uploadButton, 'input').getDOMNode()
        fileInput.addEventListener('click', onClick)

        var clickableButton = TestUtils.findRenderedDOMComponentWithTag(uploadButton, 'button')

        TestUtils.Simulate.click(clickableButton)
        expect(onClick).toBeCalled()
    })

    it('should call props.onChange when file changed', function () {
        var onChange = jest.genMockFunction()
        var uploadButton = TestUtils.renderIntoDocument(
            <UploadButton onChange={ onChange } />
        )

        var fileInput = TestUtils.findRenderedDOMComponentWithTag(uploadButton, 'input')

        TestUtils.Simulate.change(fileInput)
        expect(onChange).toBeCalled()
    })

})
