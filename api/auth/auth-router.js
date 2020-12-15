const express = require('express');
const User = require('../users/users-model');
const router = express.Router();
const bcrypt = require('bcryptjs');
const middleware = require('../middlewares/middleware');


/// AUTH ENDPOINTS ///
// New user registration. Add back: middleware.checkPayload, middleware.checkUsernameUnique,
router.post('/register', middleware.checkPayload, middleware.checkUsernameUnique, async (req, res) => {
    console.log('Attempting to register.');
    try {
        const hash = bcrypt.hashSync(req.body.password, 10);
        const newUser = await User.add({ username: req.body.username, password: hash });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Existing user login. 
router.post('/login', middleware.checkPayload, middleware.checkUsernameExists, async (req, res) => {
    console.log('Attempting to sign in.');
    try {
        const verify = bcrypt.compareSync(req.body.password, req.userData.password);
        if (verify) {
            req.session.user = req.userData;
            res.json(`Welcome back, ${req.userData.username}`); // "Logged in" message
        } else {
            res.status(401).json({ message: "You shall not pass!" }); // Requested message
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Come back and add a logout endpoint.

module.exports = router;
