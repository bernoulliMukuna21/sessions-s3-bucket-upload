const controller = require('../controller/app.controller')

const getSpy = jest.fn()
const postSpy = jest.fn()

jest.doMock('express', () => {
  return {
    Router() {
      return {
        get: getSpy,
        post: postSpy
      }
    }
  }
})

describe('should test router', () => {
  require('./app.routes.js')
  it('should test get App Status', () => {
    expect(getSpy).toHaveBeenCalledWith('/', controller.getAppStatus)
  })
  it('should test post save image', async () => {
    expect(postSpy).toHaveBeenCalledWith('/save', postSpy.mock.calls[0][1], controller.saveImage)
  })
})
