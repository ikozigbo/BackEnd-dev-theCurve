// const Joi = require('@hapi/joi');

// const validationMiddleware = (req, res, next) => {
//   // Define the validation schema using Joi
//   const schema = Joi.object({
//     firstName: Joi.string().required().messages({
//       'any.required': 'First name is required.',
//     }),
//     lastName: Joi.string().required().messages({
//       'any.required': 'Last name is required.',
//     }),
//     email: Joi.string().email().required().messages({
//       'any.required': 'Email is required.',
//       'string.email': 'Invalid email format.',
//     }),
//     password: Joi.string()
//       .pattern(new RegExp('^(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$'))
//       .required()
//       .messages({
//         'any.required': 'Password is required.',
//         'string.pattern.base':
//           'Password must contain at least 8 characters, one capital letter, and one special character (!@#$%^&*).',
//       }),
//     confirmPassword: Joi.string().valid(Joi.ref('password')).optional().messages({
//       'any.only': 'Passwords do not match.',
//     }), // Must match the 'password' field, but it's optional
//   });

//   // Validate the request body against the schema
//   const { error } = schema.validate(req.body, { abortEarly: false });

//   // If there's a validation error, return a response with the error details
//   if (error) {
//     const errorMessage = error.details.map((err) => err.message).join(' ');
//     return res.status(400).json({ error: errorMessage });
//   }

//   // If validation is successful, move to the next middleware
//   next();
// };

// module.exports = {validationMiddleware};
const Joi = require("@hapi/joi");

const validationMiddleware = (req, res, next) => {
  // Define the validation schema using Joi
  const schema = Joi.object({
    firstName: Joi.string()
      .regex(/^[A-Za-z]+$/)
      .required()
      .messages({
        "string.base": "Please provide your first name.",
        "string.empty": "Please provide your first name.",
        "string.regex.base": "First name should only contain letters.",
      }),
    lastName: Joi.string()
      .regex(/^[A-Za-z]+$/)
      .required()
      .messages({
        "string.base": "Please provide your last name.",
        "string.empty": "Please provide your last name.",
        "string.regex.base": "Last name should only contain letters.",
      }),
    email: Joi.string().email().required().messages({
      "string.base": "Please provide your email address.",
      "string.email": "Please provide a valid email address.",
      "string.empty": "Please provide your email address.",
    }),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$"))
      .required()
      .messages({
        "string.base": "Please provide a password.",
        "string.empty": "Please provide a password.",
        "string.pattern.base":
          "Password must be at least 8 characters long and include one uppercase letter and one special character (!@#$%^&*).",
      }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match.",
        "string.empty": "Please confirm your password.",
      }), // Must match the 'password' field, and it's required
  });

  // Validate the request body against the schema
  const { error } = schema.validate(req.body, { abortEarly: false });

  // If there's a validation error, return a response with the error details
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(" ");
    return res.status(400).json({ error: errorMessage });
  }

  // If validation is successful, move to the next middleware
  next();
};

module.exports = { validationMiddleware };
