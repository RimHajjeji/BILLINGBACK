const Joi = require('@hapi/joi');



//register admin validation
const register_admin_val = (data) => {
    const schema = Joi.object({
        nom: Joi.string().min(3).required(),
        prenom: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required(),
        tle: Joi.string().min(8).required(),
        role: Joi.number().required(),
        abon: Joi.string().required(),
        etats: Joi.boolean().required(),
    });
    return schema.validate(data);
}
const register_user_val = (data) => {
    const schema = Joi.object({
        nom: Joi.string().min(3).required(),
        prenom: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required(),
        tle: Joi.string().min(8).required(),
        role: Joi.number().required(),
        abon: Joi.date().required(),
        etats: Joi.boolean().required(),
    });
    return schema.validate(data);
}

//login admin validation
const login_val = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}



module.exports = {
    register_admin_val,
    register_user_val,
    login_val,

}