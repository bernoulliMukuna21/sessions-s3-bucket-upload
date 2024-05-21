const { saveImage } = require('./app.controller')
const AWSMock = require('aws-sdk')
const httpMocks = require('node-mocks-http')
const fetch = require('node-fetch')
const { Readable } = require('node:stream')

const mS3 = new AWSMock.S3()

jest.mock('node-fetch')
jest.mock('aws-sdk', () => {
  const putObjectOutputMock = {
    promise: jest.fn(),
  }
  const putObjectMock = jest.fn(() => putObjectOutputMock)

  const mS3 = {
    putObject: putObjectMock,
  }
  return { S3: jest.fn(() => mS3) }
})

describe('App Controller', () => {
  let res, req, options, result, mPutObjectResponse

  beforeEach(() => {
    jest.mock('aws-sdk', () => ({
      S3: jest.fn(() => ({
        putObject: mockPutObject,
      })),
    }))

    mPutObjectResponse = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: undefined,
    }

    jest.spyOn(Readable, 'from').mockReturnValue('image')

    req = { body: { image: 'image-url'}}
    res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    })
  })

  describe('saveImage', () => {
    describe('request fails beforees3 putObject is called', () => {
      it('should return an error if request fails', async () => {
        options = {
          headers: new Headers({ 'content-type': 'text' })
        }
        fetch.mockResolvedValue(options)
        result = await saveImage(req, res)
        result = JSON.parse(result._getData())

        expect(result.status).toMatch('Failed')
        expect(result.message).toMatch('URL provided is not of an image')
      })
    })

    describe ('s3 bucket is called', () => {
      let bucketName, contentType, contentLength
      beforeEach(() => {
        bucketName = 'bucket-name'
        contentType = 'image'
        contentLength = 57821
        process.env.BUCKET_NAME = bucketName
        options = {
          headers: new Headers({
            'content-type': contentType,
            'Content-length': contentLength
          })
        }

        fetch.mockResolvedValue(options)
      })

      it('should return an error if save image into to S3 Bucket putObject fails', async () => {
        mS3.putObject().promise.mockRejectedValueOnce(new Error('s3 bucket putObject error message'))
        result = await saveImage(req, res)
        result = JSON.parse(result._getData())

        expect(mS3.putObject).toHaveBeenCalled()
        expect(result.status).toMatch('Failed')
        expect(result.message).toMatch('s3 bucket putObject error message')
      })

      it('should successfully save image into to S3 Bucket putObject', async () => {
        mS3.putObject().promise.mockResolvedValueOnce(mPutObjectResponse)
        result = await saveImage(req, res)
        result = JSON.parse(result._getData())
        
        expect(mS3.putObject).toHaveBeenCalled()
        expect(result.status).toMatch('Success')
        expect(result.message).toMatch('Image successfully stored')
      })
    })
  })
})
