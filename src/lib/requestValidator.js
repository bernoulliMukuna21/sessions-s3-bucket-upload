module.exports.validateRequest = schema => async (req, res, next) => {
  try {
    await schema.validate({ body: req.body })
    return next()
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: 'Failed'
    })
  }
}
