const isEmpty = require('./isEmpty');
const Validator = require('validator')

module.exports = function validateProfileInput(data) {

    let errors = {}

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    } 

    if(Validator.isEmpty(data.description)) {
        errors.description = 'Description is required, describe yourself. It can be anything'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}