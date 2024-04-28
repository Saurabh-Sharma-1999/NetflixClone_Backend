const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        success: false
    });
};

module.exports = errorHandler;