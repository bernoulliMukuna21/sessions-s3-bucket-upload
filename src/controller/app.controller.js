const controller = module.exports = {}
const AWS = require('aws-sdk')
const fetch = require('node-fetch')
const { Readable } = require('node:stream')
const { generateFileName } = require('../lib/fileNameGenerator')

const S3 = new AWS.S3()

controller.getAppStatus = (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  }

  try {
    return res.status(200).json(healthCheck)
  } catch (error) {
    healthCheck.message = error
    return res.status(503).json(healthCheck)
  }
}

controller.saveImage = async (req, res) => {
  try {
    const fetchedImage = await fetch(req.body.image)
    const contentType = fetchedImage.headers.get('Content-Type')

    if (!contentType.includes('image')) {
      throw new Error('URL provided is not of an image')
    }

    const contentLength = fetchedImage.headers.get('Content-length')
    const image = Readable.from(fetchedImage.body)

    const params = {
      Bucket: process.env.BUCKET_NAME || '',
      Key: generateFileName(),
      Body: image,
      ContentType: contentType,
      ContentLength: contentLength,
    }

    await S3.putObject(params).promise()

    return res.status(200).json({
      message: 'Image successfully stored',
      status: 'Success'
    })
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message,
      status: 'Failed',
    })
  }
}
