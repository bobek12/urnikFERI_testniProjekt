//#region imports modules
const express = require('express');
const router = express.Router();

//const predmetiData = require('../database/data');

//Vkljucitev knex in bookshelf
const knexfile = require('../knexfile');
const config = knexfile.development;
const knex = require('knex')(config);

const bookshelf = require('bookshelf')(knex);

//Vkljucitev 
const Joi = require('joi');

/* Vkljucitev modelov*/
const Predmet = require('../database_models/predmet-model');
const Zaposlen = require('../database_models/zaposlen-model');
const Prostor = require('../database_models/prostor-model');

/*Vkljucitev validiranja */
const validacija = require('../data_validation/validation-data')

//#endregion

const { PredmetModel } = Predmet;
const { zaposlenModel } = Zaposlen;
/*get all predmeti */
router.get('/', async (req, res) => {
    try {
        const zaposleniCount = await new PredmetModel().count()

        if (zaposleniCount !== 0) {
            const getPredmeti = await new PredmetModel().fetchAll();
            res.json(getPredmeti);
        } else {
            res.json({ napaka: 'ne nobstaja noben predmet' })
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

/*get single predmet with id */
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const getPredmet = await new PredmetModel({ 'id': id }).fetch();

        if (getPredmet !== null) {
            res.json(getPredmet)
        } else {
            res.json({ napaka: 'Predmet ne obstaja' });
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

/* post new predmet */
router.post('/', async (req, res) => {
    //validacija podatkov
    let resultPost = Joi.validate({ naziv: req.body.naziv, institut: req.body.institut }, validacija.schemaPredmeti);

    if (resultPost.error === null) {
        try {
            let saveNewPredmet = await new PredmetModel().save({ naziv: req.body.naziv, institut: req.body.institut });
            res.json({ 'Sporocilo': 'Uspesno ste dodali novi predmet' });
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.json({ napaka: 'Niste vpisali pravilnih podatkov' });
    }
});

/*update predmet*/
router.put('/:id', async (req, res) => {
    //validacija podatkov
    let resultPost = Joi.validate({ naziv: req.body.naziv, institut: req.body.institut }, validacija.schemaPredmeti);

    if (resultPost.error === null) {
        try {
            let updatePredmet = await new PredmetModel({ 'id': req.params.id }).save({ naziv: req.body.naziv, institut: req.body.institut });
            res.json({ 'Sporocilo': 'Uspesno ste posodobili predmet' });

        } catch (error) {
            res.status(500).json({ 'napaka': 'stolpec, ki ga hocete posodobiti ne obstaja' });
            console.log(error);
        }
    } else {
        res.json({ napaka: 'Niste vpisali pravilnih podatkov' });
    }
});

/*delete predmet*/
router.delete('/:id', async (req, res) => {
    try {
        let deletePredmet = await new PredmetModel({ 'id': req.params.id }).destroy();
        res.json({ 'Sporocilo': 'Uspesno ste odstranili predmet' });
    } catch (error) {
        res.status(500).json({ 'napaka': 'Niste uspeli izbrisati zapisa' });
    }
});

module.exports = router;