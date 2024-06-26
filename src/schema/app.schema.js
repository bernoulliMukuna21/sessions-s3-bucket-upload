const schema = module.exports = {}
const { object, string } = require('yup')

const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

schema.saveImageSchema = object({
  body: object({
    image: string()
      .required('image url is required!')
      .matches(urlRegex, 'Invalid URL provided. Please check again!')
  })
})