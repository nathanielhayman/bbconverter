const express = require('express')
const router = express.Router()

const { generateFullPool } = require('../../core/Generate')

router.get('/', async (req, res) => {

    res.render('../views/main.html')
})

router.get('/test', async (req, res) => {
    res.render('../views/aah.html', {
        field: 'Input here',
        pool: null,
        xml: null
    })
})

router.post('/something', async (req, res) => {

    var xml
    var pool
    var data

    if (req.body.title || req.body.title === 'Input here') {
        data = generateFullPool(req.body.title)
        xml = data[0]
        pool = data[1]
    } else if (req.body.upload) {
        console.log(req.body.upload)
    }
    console.log(xml)

    res.render('../views/aah.html', {
        field: req.body.title,
        xml: xml,
        pool: pool
    })
})

router.post('/update', async (req, res) => {
    console.log(req.body)

    res.render('../views/aah.html', {
        field: 'Input here',
        xml: null,
        pool: null
    })
})

module.exports = router