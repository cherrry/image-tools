'use strict'

var defined = 0

function defineEnums(enum_names) {
    var enums = {}
    for (var i = 0, l = enum_names.length; i < l; i ++) {
        var name = enum_names[i];
        enums[name] = ++defined
    }
    return enums
}

module.exports = defineEnums
