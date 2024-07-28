class userError extends Error {
    constructor(message, statusCode){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode; //status code
    }
}
class adminError extends Error {
    constructor(message, statusCode){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode; //status code
    }
}
class validatorError extends Error {
    constructor(message, statusCode){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode; //status code
    }
}
class storyError extends Error {
    constructor(message, statusCode){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode; //status code
    }
}


class cloudinaryError extends Error{
    constructor(message, statusCode){
        super(message)
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}
class uploadError extends Error{
    constructor(message, statusCode){
        super(message)
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}
class emailError extends Error{
    constructor(message, statusCode){
        super(message)
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}
module.exports = { userError, cloudinaryError, uploadError, adminError, validatorError, storyError, emailError }