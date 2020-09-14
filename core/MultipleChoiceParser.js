
// Generates multiple choice question formatting for XML & Blackboard

generateQuestions= function (questions, now, err) {

    if (err) throw err

    let mcqs = []

    questions.forEach(question => {
        if (question.type === 'QUESTION_MULTIPLECHOICE') {

            if (question.value.startsWith(' ')) {
                question.value = question.value.substring(1)
            }

            question.answers.forEach(answer => {
                if (answer.startsWith(' ')) {
                    answer = answer.substring(1)
                }
            })

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
        }
    })
    return mcqs
}

module.exports.generateMultipleChoiceQuestions = generateQuestions