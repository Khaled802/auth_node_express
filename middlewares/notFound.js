

const notFoundURL = (req, res, next) => {
    res.status(404).send('URL not found');
}


module.exports = {
    notFoundURL
}