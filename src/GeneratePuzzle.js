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

// allow will always only be the first alphabet
export const getAllowAlphabet = (allow) => {
    return alphabetLibrary[allow]
}

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
    for (const i of message) {
        if (!hist[i]) {
            // char appearing for first time
            // store letter number (obtained from alphabet library) as value
            if (allow.includes(i)) {
                puzzle.push(i)
            } else {
                puzzle.push(alphabetLibrary[i])
            }
        } else {
            // char appearing subsequent times
            // get previous letter number (obtained from history stack) as value
            puzzle.push(hist[i])
        }

        if (i !== ' ') {
            // update history stack
            hist[i] = index
        }
        index++
    }

    return puzzle
}
