const {Validator, ValidationError} = require("express-json-validator-middleware")

const validator = new Validator()

export const validate = validator.validate