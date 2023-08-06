const Joi = require("@hapi/joi");

const passwordMiddleware = (req, res, next) => {
  // Define the validation schema using Joi
  const schema = Joi.object({
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

module.exports = { passwordMiddleware };
