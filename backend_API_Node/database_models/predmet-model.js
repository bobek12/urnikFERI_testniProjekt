//#region knex and bookshelf
const knexfile = require('../knexfile');
const config = knexfile.development;
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);

//pridobimo modele
const Zaposlen = require('./zaposlen-model')

//#endregion

const PredmetModel = bookshelf.Model.extend({
    tableName: 'predmet',
    zaposlen: function () {
        return this.belongsToMany(Zaposlen.zaposlenModel, 'predmet_zaposlen', 'predmet_id', 'zaposlen_id');
    }
})

module.exports.PredmetModel = PredmetModel;