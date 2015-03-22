'use strict'

var shortid = require('shortid')

function uniqueString() {
    return shortid.generate()
}

module.exports = uniqueString
