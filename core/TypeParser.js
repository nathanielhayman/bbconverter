
// Generates multiple choice question formatting for XML & Blackboard

generateQuestions= function (questions, now, err) {

    if (err) throw err

    let mcqs = []
    let tfqs = []
    let esqs = []

    questions.forEach(question => {

        if (question.value.startsWith(' ')) {
            question.value = question.value.substring(1)
        }

        question.answers.forEach(answer => {
            if (answer.startsWith(' ')) {
                answer = answer.substring(1)
            }
        })

        if (question.type === 'QUESTION_MULTIPLECHOICE') {

            mcqs.push({
                '@id': `q${questions.indexOf(question) + 1}`,

                DATES: {
                    CREATED: {'@value': now},
                    UPDATED: {'@value': now}
                },

                BODY: {
                    TEXT: question.value,
                    FLAGS: {
                        '@value': 'true',
                        ISHTML: { '@value': 'true' },
                        ISNEWLINELITERAL: ''
                    }
                },

                ANSWER: function () {

                    let answers = []

                    question.answers.forEach(answer => {

                        answers.push({
                            '@id': `q${questions.indexOf(question) + 1}_a${question.answers.indexOf(answer) + 1}`,
                            '@position': `${question.answers.indexOf(answer) + 1}`,

                            DATES: {
                                CREATED: {'@value': now},
                                UPDATED: {'@value': now}
                            },

                            TEXT: answer
                        })
                    })
                    return answers
                },

                GRADABLE: {

                    FEEDBACK_WHEN_CORRECT: 'Correct!',
                    FEEDBACK_WHEN_INCORRECT: 'That\'s not correct!',
                    CORRECTANSWER: function () {

                        return {
                            '@answer_id': `q${questions.indexOf(question) + 1}_a${question.answers.indexOf(question.correct) + 1}`
                        }
                    }
                }
            })
        } else if (question.type === 'QUESTION_TRUEFALSE') {

            tfqs.push({
                '@id': `q${questions.indexOf(question) + 1}`,

                DATES: {
                    CREATED: {'@value': now},
                    UPDATED: {'@value': now}
                },

                BODY: {
                    TEXT: question.value,
                    FLAGS: {
                        '@value': 'true',
                        ISHTML: { '@value': 'true' },
                        ISNEWLINELITERAL: ''
                    }
                },

                ANSWER: function () {

                    let answers = []

                    answers.push({
                        '@id': `q${questions.indexOf(question) + 1}_a1`,
                        '@position': `1`,
                        DATES: {
                            CREATED: {'@value': now},
                            UPDATED: {'@value': now}
                        },
                        TEXT: 'true'
                    })

                    answers.push({
                        '@id': `q${questions.indexOf(question) + 1}_a2`,
                        '@position': `2`,
                        DATES: {
                            CREATED: {'@value': now},
                            UPDATED: {'@value': now}
                        },
                        TEXT: 'false'
                    })

                    return answers
                },

                GRADABLE: {

                    FEEDBACK_WHEN_CORRECT: 'Correct!',
                    FEEDBACK_WHEN_INCORRECT: 'That\'s not correct!',
                    CORRECTANSWER: function () {

                        if (question.correct === 't') {
                            return {
                                '@answer_id': `q${questions.indexOf(question) + 1}_a1`
                            }
                        } else {
                            return {
                                '@answer_id': `q${questions.indexOf(question) + 1}_a2`
                            }
                        }
                    }
                }
            })
        } else if (question.type === 'QUESTION_ESSAY') {
            
            esqs.push({
                '@id': `q${questions.indexOf(question) + 1}`,

                DATES: {
                    CREATED: {'@value': now},
                    UPDATED: {'@value': now}
                },

                BODY: {
                    TEXT: question.value,
                    FLAGS: {
                        '@value': 'true',
                        ISHTML: { '@value': 'true' },
                        ISNEWLINELITERAL: ''
                    }
                }
            })

        }
    })
    return [mcqs, tfqs, esqs]
}

module.exports.generateXMLQuestions = generateQuestions