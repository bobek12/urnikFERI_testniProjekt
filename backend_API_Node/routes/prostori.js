//#region import Modules
const express = require('express');
const router = express.Router();

//Vkljucitev knex in bookshelf
const knexfile = require('../knexfile');
const config = knexfile.development;
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);

/* Vkljucitev modelov*/


const Prostor = require('../database_models/prostor-model');
const Zaposlen = require('../database_models/zaposlen-model');
//#endregion

const { ProstorModel } = Prostor;
const { zaposlenModel } = Zaposlen;

/* get all prostori */
router.get('/', async (req, res) => {
    try {
        const prostoriCount = await new ProstorModel().count();

        if (prostoriCount !== 0) {
            const getProstori = await new ProstorModel().fetchAll();
            res.json(getProstori);
        } else {
            res.json({ napaka: 'ne nobstaja noben prostor' })
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

/*get prostor by id*/
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const getProstor = await new ProstorModel({ 'id': id }).fetch({ withRelated: ['zaposlen'] });
        console.log(getProstor);

        if (getProstor !== null) {
            res.json(getProstor)
        } else {
            res.json({ napaka: 'prostor ne obstaja' });
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

module.exports = router;