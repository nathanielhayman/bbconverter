/*
*                   Generation module
*
*      Creates a formatted file usable in Blackboard.
*   File consists of 'ismanifest.xml' and 'res00001.xml'
*
*/

const builder = require('xmlbuilder');
const fs = require('fs');

const { generateXMLQuestions } = require('./TypeParser')
const { bbFormattedDate } = require('../utils/Date')


module.exports.generateXMLFile = function (questions, err) {

    if (err) throw err;

    const now = bbFormattedDate()

    // Writer for the XML. Uses package 'xmlbuilder'
    const root = builder.create('POOL', { encoding: 'UTF-8' })

    const generatedQuestions = generateXMLQuestions(questions, now)

    console.log(generatedQuestions[1])
    console.log(generatedQuestions[2])

    const obj = {

        COURSEID: {'@value': 'IMPORT'},

        TITLE: {'@value': 'CrawfordNovakCh1'},

        DESCRIPTION: {
            TEXT: 'Created by the Generator yay!'
        },

        DATES: {
            CREATED: {'@value': now},
            UPDATED: {'@value': now}
        },

        // List of every question, does not include answers
        QUESTIONLIST: {
            QUESTION: function () {
                let bbqs = []
                questions.forEach(question => {
                    bbqs.push({
                        '@id': `q${questions.indexOf(question) + 1}`,
                        '@class': `${question.type}`
                    })
                })
                return bbqs
            }
        },

        // Multiple Choice with answers
        QUESTION_MULTIPLECHOICE: generatedQuestions[0],

        QUESTION_TRUEFALSE: generatedQuestions[1],

        QUESTION_ESSAY: generateXMLQuestions[2],

    };
    
    console.log('ESSAY')
    console.log(generatedQuestions[2])

    root.ele(obj);
    const xml = root.end({ pretty: true })

    return xml
}