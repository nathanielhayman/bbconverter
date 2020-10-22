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
    var currentQuestion
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

        currentQuestion = pool.questions[pool.questions.length - 1] 
        
        if (questionTerms.some(i => words[0].endsWith(i))) {

            console.log(words[0])

            if (words[0].toLowerCase().startsWith('ans' || 'answer')) {

                if (currentQuestion.answers[0]) {

                    currentQuestion.correct = 
                    currentQuestion.answers[alphabet.indexOf(words[1].toLowerCase())]

                } else if (trueTerms.some(i => words[1].toLowerCase().includes(i))) {

                    currentQuestion.type = 'QUESTION_TRUEFALSE'
                    currentQuestion.correct = 't'

                } else if (falseTerms.some(i => words[1].toLowerCase().includes(i))) {

                    currentQuestion.type = 'QUESTION_TRUEFALSE'
                    currentQuestion.correct = 'f'

                }

            } else if (words[0].match(/[a-zA-Z]+/g)) {

                if (words[0].startsWith('*')) {
                    words.shift()
                    currentQuestion.correct = words.join(' ')
                    currentQuestion.type = 'QUESTION_MULTIPLECHOICE'
                    currentQuestion.answers.push(words.join(' '))
                } else {
                    words.shift()
                    currentQuestion.type = 'QUESTION_MULTIPLECHOICE'
                    currentQuestion.answers.push(words.join(' '))
                }

            } else if (Number(words[0].slice(0, -1))) {

                words.shift()
                pool.questions.push({value: words.join(' '), answers: [], correct: null, type: 'QUESTION_ESSAY'})

            }

        } else if (!pool.title && !pool.questions[0]) {

            pool.title = line

        }
    })

    return pool
}

module.exports.convertRawData = readRawData