//#region knex and bookshelf
const knexfile = require('../knexfile');
const config = knexfile.development;
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);

//pridobimo modele
const Zaposlen = require('./zaposlen-model');
//#endregion

const ProstorModel = bookshelf.Model.extend({
    tableName: 'prostor',
    zaposlen: function () {
        return this.hasMany(Zaposlen.zaposlenModel);
    }
})

module.exports.ProstorModel = ProstorModel;