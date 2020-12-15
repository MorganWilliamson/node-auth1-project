const router = require('express').Router();
const checkUserLoggedIn = require('../middlewares/middleware').checkUserLoggedIn;
const User = require('./users-model');

/// USERS ENDPOINT(S(?)) ///
// Get a list of all users. 
router.get('/', checkUserLoggedIn, (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });

    // try {
    //     const fetchUsers = User.find();
    //     res.status(200).json(fetchUsers);
    // } catch (err) {
    //     res.json(500).json({ message: err.message });
    // }
});

module.exports = router;
