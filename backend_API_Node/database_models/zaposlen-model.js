
//#region knex and bookshelf
const knexfile = require('../knexfile');
const config = knexfile.development;
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);

//pridobimo modele
const Predmet = require('./predmet-model')
const Prostor = require('./prostor-model')
//#endregion

const zaposlenModel = bookshelf.Model.extend({
    tableName: 'zaposlen',
    zaposlen: function () {
        return this.belongsTo(Prostor.ProstorModel);
    },
    predmet: function () {
        return this.belongsToMany(Predmet.PredmetModel, 'predmet_zaposlen', 'zaposlen_id', 'predmet_id')
    }
})

module.exports.zaposlenModel = zaposlenModel;