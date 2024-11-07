const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(6).max(100).required(),
    name: Joi.string().max(20).required()
}).unknown(false); // Verhindert unbekannte Felder

// Middleware zum Validieren
function signUpValidation(req, res, next) {
    const { error } = schema.validate(req.body, {abortEarly: false});

    if (error) {
        return res.status(400).json({ success: false, errors: error.details });
    }
    next();
}


module.exports = {signUpValidation};

