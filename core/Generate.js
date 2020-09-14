const { generateXMLFile } = require('./XML')
const { convertRawData } = require('./Raw')

const textract = require('textract');
const path = require('path')

function generate(input, err) {

    if (err) throw err

    if (!input || input === '') {
            // Find required file in filesystem
        textract.fromFileWithPath(`${path.resolve(__dirname, '../core')}\\input.docx`, function( error, text ) {
            if (error) {
                console.log(error)
            } else {
                // Convert raw document to formatted text
                var pool = convertRawData(text)

                // Generate the XML data with formatted text
                generateXMLFile(pool.questions)
            }
        })
    } else {
        var pool = convertRawData(input)

        var xml = generateXMLFile(pool.questions)
    }

    return [xml, pool]
}

module.exports.generateFullPool = generate