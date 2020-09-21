/*
*                    Interpretation module
*
*      Reads raw text and returns precisely formatted data.
*
*/

const readRawData = function (raw) {

    var pool = { questions: [] }


    raw = raw.replace(/(\r\n|\n|\r)/gm, ' ').split(' ')

    var asterixUse = false

    raw.forEach(word => {
        if (word.startsWith('*')) {
            asterixUse = true
            break
        }
    })

    var question = {value: '', finished: true}
    var answer = {value: '', finished: true, correct: false}

    if (asterixUse) {
        raw.forEach(word => {
            if (word[0]) {
                // Finish question content
                if (!question.finished) {
                    if (!word.endsWith('.' || ')')) {
                        question.value += ` ${word}`
                    } else {
                        if (word.match(/[a-zA-Z]+/g) && word.match(/[a-zA-Z]+/g).join('').length < 3) {
                            question.finished = true
    
                            if (answer.value) {
                                pool.questions[pool.questions.length - 1].answers.push(answer.value)
                                if (answer.correct) {
                                    pool.questions[pool.questions.length - 1].correct = answer.value
                                }
                            }
    
                            pool.questions.push({value: question.value, answers: [], correct: null, type: 'QUESTION_MULTIPLECHOICE'})
    
                            if (word.includes('*')) {
                                answer = {value: '', finished: false, correct: true}
                            } else {
                                answer = {value: '', finished: false, correct: false}
                            }
                        }
                    }
                // Find either (1.) or (a.)
                } else if (word.endsWith('.' || ')')) {
                    // Correct answer
                    if (word.startsWith('*')) {
                        if (word.match(/[a-zA-Z]+/g)) {
                            word = word.match(/[a-zA-Z]+/g).join('')
                        } else {
                            word = word.replace('*', '').replace('.', '').replace(')', '.')
                        }
                        pool.questions[pool.questions.length - 1].answers.push(answer.value)
                        if (answer.correct) {
                            pool.questions[pool.questions.length - 1].correct = answer.value
                        }
                        answer = {value: '', finished: false, correct: true}
                    // Question
                    } else if (Number(word)) {
                        word = Number(word)
                        question = {value: '', finished: false}
                    // Answer
                    } else if (word.match(/[a-zA-Z]+/g) && word.length < 3) {
                        word = word.match(/[a-zA-Z]+/g).join('')
                        pool.questions[pool.questions.length - 1].answers.push(answer.value)
                        if (answer.correct) {
                            pool.questions[pool.questions.length - 1].correct = answer.value
                        }
                        answer = {value: '', finished: false, correct: false}
                    } else if (!answer.finished) {
                        answer.value += ` ${word}`
                        if (raw[raw.length - 1] === word) {
                            pool.questions[pool.questions.length - 1].answers.push(answer.value)
                            if (answer.correct) {
                                pool.questions[pool.questions.length - 1].correct = answer.value
                            }
                        }
                    }
                // Finish answer content
                } else if (!answer.finished) {
                    answer.value += ` ${word}`
                    if (raw[raw.length - 1] === word) {
                        pool.questions[pool.questions.length - 1].answers.push(answer.value)
                        if (answer.correct) {
                            pool.questions[pool.questions.length - 1].correct = answer.value
                        }
                    }
                }
            } 
        })
    } else {
        // Other reading method here.
    }

    return pool
}

module.exports.convertRawData = readRawData