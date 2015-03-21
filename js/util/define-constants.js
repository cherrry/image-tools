'use strict'

var defined = 0

function defineConstants(constant_names) {
    var constants = {}

    for (var i = 0, _len = constant_names.length; i < _len; i++) {
        var name = constant_names[i]
        constants[name] = ++defined
    }

    return constants
}

module.exports = defineConstants
