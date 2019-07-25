//#region imports Modules
const express = require('express');
const router = express.Router();

//const zaposleni = require('../database/data');

//Vkljucitev knex in bookshelf
const knexfile = require('../knexfile');
const config = knexfile.development;
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);

/* Validacija */
const Joi = require('joi');
const validacija = require('../data_validation/validation-data')

/* Vkljucitev modelov*/
const Predmet = require('../database_models/predmet-model');
const Zaposlen = require('../database_models/zaposlen-model');
const Prostor = require('../database_models/prostor-model');
//#endregion

const { zaposlenModel } = Zaposlen;
const { PredmetModel } = Predmet

/*get zaposlene*/
router.get('/', async (req, res) => {
    try {
        const zaposleniCount = await new zaposlenModel().count();

        if (zaposleniCount !== 0) {
            const getZaposleni = await new zaposlenModel().fetchAll();
            res.json(getZaposleni);
        } else {
            res.json({ napaka: 'ne obstaja noben zaposleni' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

/*get zaposlen by id */
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const getZaposlen = await new zaposlenModel({ 'id': id }).fetch();

        if (getZaposlen !== null) {
            res.json(getZaposlen);
        } else {
            res.json({ napaka: 'zaposlen ne obstaja' });
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

//#region dodaj zaposlenega
/*post zaposlen - dodamo zaposlenega */
// router.post('/', async (req, res, next) => {
//     try {
//         //preverimo če obstaja prostor s tem id-jem
//         let preverimo = await new Prostor.ProstorModel({ 'id': parseInt(req.body.prostor_id) }).fetch();
//         if (preverimo !== null) {
//             try {
//                 let addZaposleni = await new zaposlenModel().save({ ime: req.body.ime, priimek: req.body.priimek, naziv: req.body.naziv, elektronska_posta: req.body.elektronska_posta, govorilne_ure: req.body.govorilne_ure, prostor_id: parseInt(req.body.prostor_id) })
//                 res.json(addZaposleni)
//             } catch (error) {
//                 res.status(500).json({ napaka: error });
//             }
//         } else {
//             res.json({ napaka: 'Prostor ne obstaja' });
//         }
//     } catch (error) {
//         res.status(500).json({ napaka: error });
//     }
// });
//#endregion

/*dodamo zaposlenega in ga dodamo v predmet (many to many)*/
router.post('/', async (req, res) => {
    try {
        let resultPost = Joi.validate({ ime: req.body.ime, priimek: req.body.priimek, naziv: req.body.naziv, elektronska_posta: req.body.elektronska_posta, govorilne_ure: req.body.govorilne_ure, prostor_id: parseInt(req.body.prostor_id) }, validacija.schemaZaposleni);
        let getProstor = await new Prostor.ProstorModel({ 'id': parseInt(req.body.prostor_id) }).fetch();
        let getPredmet = await new PredmetModel({ 'id': 1 }).fetch();

        if (getProstor !== null && getPredmet !== null && resultPost.error === null) {
            try {
                const zaposleniAdd = await new zaposlenModel(req.body).save({ ime: req.body.ime, priimek: req.body.priimek, naziv: req.body.naziv, elektronska_posta: req.body.elektronska_posta, govorilne_ure: req.body.govorilne_ure, prostor_id: parseInt(req.body.prostor_id) }).then(function (zaposlenModel) {
                    return zaposlenModel.predmet().attach(getPredmet);
                })
                res.json({ sporocilo: 'uspesno ste dodali zaposlenega v predmet' });
            } catch (error) {
                res.status(500).send(error);
            }
        } else {
            res.json({ sporocilo: 'Niste vpisali pravih podatkov/predmet ali prostor ki ga iscete ne obstaja' })
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
