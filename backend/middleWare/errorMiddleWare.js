const errorHandler= (err, req, res, next) => {
    
    //Dynamically checks the error status instead of hard coding it so will fail unless 500
    const statusCode = res.statusCode ? res.statusCode: 500;
    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack: null,
    });
};

module.exports = errorHandler;