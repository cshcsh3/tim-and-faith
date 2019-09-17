import { message } from './secret.json'

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

const allCluesMapper = {
    '4': 'a',
    '5': 'n',
    '6': 'k',
    '7': 'i',
    '8': 'e'
}

export const stripped = message.replace(/\s/g, "")

export const generatePuzzle = (clues) => {
    let allow = []
    let showAll = []

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

    const keys = Object.keys(allCluesMapper)
    for (const k of keys) {
        if (clues.includes(k)) {
            showAll.push(allCluesMapper[k])
        }
    }

    let hist = {}
    let puzzle = []

    let index = 1
    for (const character of message) {
        if (character === ' ') {
            const letter = new Letter(alphabetLibrary[character], character, false, false) 
            puzzle.push(letter)
            continue
        }

        if (!hist[character]) {
            if (allow.includes(character) || showAll.includes(character)) {
                const letter = new Letter(alphabetLibrary[character], character, true, true)
                puzzle.push(letter)
            } else {
                const letter = new Letter(alphabetLibrary[character], character, true, false)
                puzzle.push(letter)
            }
        } else {
            if (showAll.includes(character)) {
                const letter = new Letter(hist[character], character, false, true)
                puzzle.push(letter)
            } else {
                const letter = new Letter(hist[character], character, false, false)
                puzzle.push(letter)
            }
        }

        hist[character] = index
        index++
    }

    return puzzle
}
