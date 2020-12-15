const db = require('../../database/connection');

module.exports = {
    add,
    find, 
    findBy,
    findById,
};

async function add(user) {
    const [id] = await db('userCreds').insert(user, 'id');
    return findById(id);
}

function find() {
    return db('userCreds').select('id', 'username');
}

function findBy(filter) {
    return db('userCreds').where(filter).orderBy('id');
}

function findById(id) {
    return db('userCreds').where({ id }).first();
}