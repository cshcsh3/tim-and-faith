// simple alphabet mapping
const alphabetLibrary = {
    ' ': 0,
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 5,
    'f': 6,
    'g': 7,
    'h': 8,
    'i': 9,
    'j': 10,
    'k': 11,
    'l': 12,
    'm': 13,
    'n': 14,
    'o': 15,
    'p': 16,
    'q': 17,
    'r': 18,
    's': 19,
    't': 20,
    'u': 21,
    'v': 22,
    'w': 23,
    'x': 24,
    'y': 25,
    'z': 26
}

class Letter {
    constructor (tag, name, first, reveal) {
        this.tag = tag
        this.name = name
        this.first = first
        this.reveal = reveal
    }
}

/* 
A simple letter tracing puzzle.
All letters in the message are tagged with a number.
The tag for the first letter occurrences follows the alphabetical numbering (see alphabetLibrary).
The tag for the subsequent letter occurrences follow the previous letter positioning.
*/

export const generatePuzzle = (clues) => {
    let allow = []

    if (clues.includes('1')) {
        allow.push('s')
        allow.push('a')
    }

    if (clues.includes('2')) {
        allow.push('t')
        allow.push('i')
        allow.push('m')
    }

    if (clues.includes('3')) {
        allow.push('f')
        allow.push('h')   
    }

    const message = "it was only eleven months ago that the king was born find the king and you shall find the key"
    let hist = {}
    let puzzle = []

    let index = 1
    for (const character of message) {
        // spaces are not considered letters, tag position count will not count spaces
        if (character === ' ') {
            const letter = new Letter(alphabetLibrary[character], character, false, false) 
            puzzle.push(letter)
            continue
        }

        if (!hist[character]) {
            // char appearing for first time
            if (allow.includes(character)) {
                const letter = new Letter(alphabetLibrary[character], character, true, true)
                puzzle.push(letter)
            } else {
                const letter = new Letter(alphabetLibrary[character], character, true, false)
                puzzle.push(letter)
            }
        } else {
            // char appearing subsequent times
            // tag should be index of previous character
            const letter = new Letter(hist[character], character, false, false)
            puzzle.push(letter)
        }

        // update history stack
        hist[character] = index
        index++
    }

    return puzzle
}
