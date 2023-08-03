const Joi = require('@hapi/joi');

const validationMiddleware = (req, res, next) => {
  // Define the validation schema using Joi
  const schema = Joi.object({
    firstName: Joi.string().required().messages({
      'any.required': 'First name is required.',
    }),
    lastName: Joi.string().required().messages({
      'any.required': 'Last name is required.',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required.',
      'string.email': 'Invalid email format.',
    }),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$'))
      .required()
      .messages({
        'any.required': 'Password is required.',
        'string.pattern.base':
          'Password must contain at least 8 characters, one capital letter, and one special character (!@#$%^&*).',
      }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).optional().messages({
      'any.only': 'Passwords do not match.',
    }), // Must match the 'password' field, but it's optional
  });

  // Validate the request body against the schema
  const { error } = schema.validate(req.body, { abortEarly: false });

  // If there's a validation error, return a response with the error details
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(' ');
    return res.status(400).json({ error: errorMessage });
  }

  // If validation is successful, move to the next middleware
  next();
};

module.exports = {validationMiddleware};

