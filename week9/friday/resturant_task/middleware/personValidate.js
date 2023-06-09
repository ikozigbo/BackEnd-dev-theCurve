const Joi = require("@hapi/joi")

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

const validateBranch = (req, res, next) => {
  const schema = Joi.object({
    branchName: Joi.string().required(),
    branchAddress: Joi.string().required(),
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

const validateMenu = (req, res, next) => {
  const schema = Joi.object({
    mealName: Joi.string().required(),
    branch: Joi.object().required(),
    side: Joi.string().required(),
    main: Joi.string().required(),
    drink: Joi.string().required(),
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
module.exports = { validateBranch, validateMenu };
