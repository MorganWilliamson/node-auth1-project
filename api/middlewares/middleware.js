const User = require('../users/users-model');

/// MIDDLEWARES ///
const checkPayload = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(401).json({ message: "Missing or invalid credentials." });
    } else {
        next();
    }
};

const checkUsernameUnique = async (req, res, next) => {
    try {
        const rows = await User.findBy({ username: req.body.username });
        if (!rows.length) {
            next();
        } else {
            res.status(401).json({ message: "There was a problem processing your request." });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error." });
        console.log(err);
    }
};

const checkUsernameExists = async (req, res, next) => {
    try {
        const rows = await User.findBy({ username: req.body.username });
        if (rows.length) {
            req.userData = rows[0];
            next();
        } else {
            res.status(403).json({ message: "There was a problem logging in." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const checkUserLoggedIn = (req, res, next) => {
   if (req.session && req.session.user) {
       next();
   } else {
       res.status(401).json({ message: "You shall not pass!" });
   }
};


module.exports = {
    checkPayload : checkPayload,
    checkUsernameUnique : checkUsernameUnique,
    checkUsernameExists : checkUsernameExists,
    checkUserLoggedIn : checkUserLoggedIn
};
