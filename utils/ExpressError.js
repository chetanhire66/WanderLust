// custome error class extands form js build-in error class
class ExpressError extends Error {
    constructor(statusCode, message){
        // call the parent error class
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;