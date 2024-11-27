const Joi = require('joi');

// Joi-Schema for MovieList validation
const schema = Joi.object({
	name: Joi.string().required().max(100).messages({"string.max": "Name must not exceed 100 characters."}),
    description: Joi.string().allow("").optional().max(300).messages({"string.max": "Description must not exceed 100 characters."}),
    isPublic: Joi.boolean().default(false)
});

function validateMovieList(req, res, next) {
    const { error, value } = schema.validate(req.body, { abortEarly: false }); // Collect all errors (abortEarly: false)

    if (error) {
        // Provide detailed error-list
        const details = error.details.map(detail => detail.message);
        return res.status(400).json({ success: false, msg: "Invalid input data.", details });
    }

    req.body = value; // Store reference to the value-object in body. value contained the validated data.
    next();
}

module.exports = { validateMovieList };

