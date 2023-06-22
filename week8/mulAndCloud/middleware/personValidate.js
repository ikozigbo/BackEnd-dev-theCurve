const Joi = require("@hapi/joi");

// const validatePerson = (data) => {
//   const schema = Joi.object({
//     personName: Joi.string().required(),
//     personPhone: Joi.string()
//       .pattern(/^[0-9]{11}$/)
//       .required(),
//     personProfile: Joi.string().required(),
//   });

//   return schema.validate(data);
// };

const validatePerson = (req, res, next) => {
  const schema = Joi.object({
    personName: Joi.string().required(),
    personPhone: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .required(),
    //personProfile: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const validatorError = error.details.map((detail) => detail.message);
    res.status(409).json({
      message: validatorError,
    });
  } else {
    next();
  }
};

const updateValidation = (req, res, next) => {
  const schema = Joi.object({
    personName: Joi.string(),
    personPhone: Joi.string().pattern(/^[0-9]{11}$/),
    //personProfile: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const validatorError = error.details.map((detail) => detail.message);
    res.status(409).json({
      message: validatorError,
    });
  } else {
    next();
  }
};
module.exports = { validatePerson, updateValidation };
