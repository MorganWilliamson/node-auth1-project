
exports.up = function(knex) {
  return knex.schema
    .createTable('userInfo', tbl => {
        tbl.increments();
        tbl.string('name', 128);
    })
    .createTable('userCreds', tbl => {
        tbl.increments();
        tbl.string('username', 128).unique().index();
        tbl.string('password', 256);
        tbl.integer('user')
            .unsigned()
            .references('userInfo.id')
            .onDelete('restrict').onUpdate('cascade');
    });
};

exports.down = function(knex) {
  return knex.schema  
  .dropTableIfExists('userCreds')
  .dropTableIfExists('userInfo');
};
