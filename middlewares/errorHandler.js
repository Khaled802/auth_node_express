const CustomError = require('../errors/customError');


const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomError) {
        return res.status(err.statusCode).send(err.message);
    }
    res.status(500).send(err.message);
}

module.exports = {
    errorHandler
}