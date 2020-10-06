/*
*                    Interpretation module
*
*      Reads raw text and returns precisely formatted data.
*
*/

const readRawData = function (raw) {

    var pool = { questions: [], title: null }

    var ograw = raw

    raw = ograw.replace(/(\r\n|\n|\r)/gm, ' ').split(' ')

    var question = {value: '', finished: true}
    var answer = {value: '', finished: true, correct: false}

    var trueTerms = ['t', 'true', 'correct']
    var falseTerms = ['f', 'false', 'incorrect']
    var questionTerms = [':', '.', ')']

    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
                    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    console.log(questionTerms.some(i => i === ')'))

    raw = ograw.replace(/(\r)/gm, ' ')
    var lines = raw.split('\n')
    lines.forEach(line => {
        words = line.split(' ')
        
        if (questionTerms.some(i => words[0].endsWith(i))) {

            console.log(words[0])

            if (words[0].toLowerCase().startsWith('ans' || 'answer')) {

                if (pool.questions[pool.questions.length - 1].answers[0]) {

                    pool.questions[pool.questions.length - 1].correct = 
                    pool.questions[pool.questions.length - 1].answers[alphabet.indexOf(words[1].toLowerCase())]

                } else if (trueTerms.some(i => words[1].toLowerCase().includes(i))) {

                    pool.questions[pool.questions.length - 1].type = 'QUESTION_TRUEFALSE'
                    pool.questions[pool.questions.length - 1].correct = 't'

                } else if (falseTerms.some(i => words[1].toLowerCase().includes(i))) {

                    pool.questions[pool.questions.length - 1].type = 'QUESTION_TRUEFALSE'
                    pool.questions[pool.questions.length - 1].correct = 'f'

                }

            } else if (words[0].match(/[a-zA-Z]+/g)) {

                if (words[0].startsWith('*')) {
                    words.shift()
                    pool.questions[pool.questions.length - 1].correct = words.join(' ')
                    pool.questions[pool.questions.length - 1].type = 'QUESTION_MULTIPLECHOICE'
                    pool.questions[pool.questions.length - 1].answers.push(words.join(' '))
                } else {
                    words.shift()
                    pool.questions[pool.questions.length - 1].type = 'QUESTION_MULTIPLECHOICE'
                    pool.questions[pool.questions.length - 1].answers.push(words.join(' '))
                }

            } else if (Number(words[0].slice(0, -1))) {

                words.shift()
                pool.questions.push({value: words.join(' '), answers: [], correct: null, type: 'QUESTION_ESSAY'})

            }

        } else if (!pool.title && !pool.questions[0]) {

            pool.title = line

        }
    })

    console.log(pool)

    return pool
}

module.exports.convertRawData = readRawData