const db = require('../../database/connection');

module.exports = {
    add,
    find() {
        return db('userCreds').select('id', 'username').orderBy('id');
    },
    findBy(filter) {
        return db('userCreds').where(filter).orderBy('id');
    },
    findById,
};

async function add(user) {
    const [id] = await db('userCreds').insert(user, 'id');
    return findById(id);
}

function findById(id) {
    return db('userCreds').where({ id }).first();
}