jest.dontMock('../define-enums.js')

describe('generate enums', function () {

    var defineEnums = null

    beforeEach(function () {
        defineEnums = require('../define-enums.js')
    })

    it('should start from 1', function () {
        var ENUMS = defineEnums([
            'ENUMS'
        ])

        expect(ENUMS).toEqual({
            ENUMS: 1
        })
    })

    it('should be consecutive in order', function () {
        var SUITS = defineEnums([
            'DIAMONDS',
            'CLUBS',
            'HEARTS',
            'SPADES'
        ])

        expect(SUITS).toEqual({
            DIAMONDS: 1,
            CLUBS: 2,
            HEARTS: 3,
            SPADES: 4
        })
    })

    it('should not reset in next call', function () {
        var COLORS = defineEnums([
            'BLACK',
            'WHITE'
        ])

        var ANIMALS = defineEnums([
            'CAT',
            'DOG'
        ])

        expect(COLORS).toEqual({
            BLACK: 1,
            WHITE: 2
        })

        expect(ANIMALS).toEqual({
            CAT: 3,
            DOG: 4
        })
    })
})
