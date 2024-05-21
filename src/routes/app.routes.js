const express = require('express')
const router = express.Router()
const { getAppStatus, saveImage } = require('../controller/app.controller')
const { validateRequest } = require('../lib/requestValidator')
const { saveImageSchema } = require('../schema/app.schema')

router.get('/', getAppStatus)
router.post('/save', validateRequest(saveImageSchema), saveImage)

module.exports = router
