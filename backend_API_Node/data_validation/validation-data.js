const Joi = require('joi');

//#region validation predmeti data
const schemaPredmeti = Joi.object().keys({
    naziv: Joi.string().min(2).required(),
    institut: Joi.string().min(3).required(),
});

const schemaZaposleni = Joi.object().keys({
    ime: Joi.string().min(2).required(),
    priimek: Joi.string().min(2).required(),
    naziv: Joi.string().min(2).required(),
    elektronska_posta: Joi.string().email(),
    govorilne_ure: Joi.string().min(5).required(),
    prostor_id: Joi.number().integer().required()
});


module.exports.schemaPredmeti = schemaPredmeti;
module.exports.schemaZaposleni = schemaZaposleni;