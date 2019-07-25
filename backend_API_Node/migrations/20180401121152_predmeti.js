
exports.up = function (knex, Promise) {
    return knex.schema.createTable('prostor', (table) => {
        table.increments('id').primary();
        table.string('stavba').notNullable();
        table.string('predel').notNullable();
        table.string('nadstropje').notNullable();
        table.string('stevilka_prostora').notNullable();
    })
        .createTable('zaposlen', (table) => {
            table.increments('id').primary();
            table.string('ime').notNullable();
            table.string('priimek').notNullable();
            table.string('naziv').notNullable();
            table.string('elektronska_posta').notNullable();
            table.string('govorilne_ure').notNullable();
            table.integer('prostor_id').references('id').inTable('prostor');
        })
        .createTable('predmet', (table) => {
            table.increments('id').primary();
            table.string('naziv').notNullable();
            table.string('institut').notNullable();
        })
        .createTable('predmet_zaposlen', (table) => {
            table.integer('predmet_id').references('id').inTable('predmet');
            table.integer('zaposlen_id').references('id').inTable('zaposlen');
        })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('prostor').dropTable('zaposlen').dropTable('predmet').dropTable('predmet_zaposlen');
}
