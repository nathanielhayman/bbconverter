/*
*                   Generation module
*
*      Creates a formatted file usable in Blackboard.
*   File consists of 'ismanifest.xml' and 'res00001.xml'
*
*/

const builder = require('xmlbuilder');
const fs = require('fs');

const { generateXMLQuestions } = require('./MultipleChoiceParser')
const { bbFormattedDate } = require('../utils/Date')


let generateFile = function (questions, err) {

    if (err) throw err;

    // Get the current date in BB form
    const dt = new Date();

    const now = `${
        dt.getFullYear().toString().padStart(4, '0')}-${
        (dt.getMonth() + 1).toString().padStart(2, '0')}-${
        dt.getDate().toString().padStart(2, '0')} ${
        dt.getHours().toString().padStart(2, '0')}:${
        dt.getMinutes().toString().padStart(2, '0')}:${
        dt.getSeconds().toString().padStart(2, '0')}z`;

    // Writer for the XML. Uses package 'xmlbuilder'
    const root = builder.create('POOL', { encoding: 'UTF-8' })

    const generatedQuestions = generateXMLQuestions(questions, now)

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

        QUESTION_ESSAY: generateXMLQuestions[2]

    };

    root.ele(obj);
    const xml = root.end({ pretty: true })

    // Create xml file
    fs.writeFile('something.xml', xml, function (err) {
        if (err) throw err;
    })
    return xml
}

module.exports.generateXMLFile = generateFile