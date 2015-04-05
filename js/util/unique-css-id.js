'use strict'

var shortid = require('shortid')

var prefix = 'css-'
function uniqueCssId() {
    return prefix + shortid.generate()
}

module.exports = uniqueCssId
