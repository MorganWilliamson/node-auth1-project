/// MIDDLEWARES ///

const checkPayload = (req, res, next) => {
    next();
};

const checkUsernameUnique = (req, res, next) => {
    next();
};

const checkUsernameExists = (req, res, next) => {
    next();
};

const checkUserLoggedIn = (req, res, next) => {
    next();
};


module.exports = {
    checkPayload,
    checkUsernameUnique,
    checkUsernameExists,
    checkUserLoggedIn
};
