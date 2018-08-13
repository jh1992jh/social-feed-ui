const isEmpty = require('./isEmpty');
const Validator = require('validator');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';
    data.postImage = !isEmpty(data.postImage) ? data.postImage : '';
    
    if(!Validator.isLength(data.text ,{min: 5, max: 300})) {
        errors.text = 'The post has to be between 5 and 300 characters';
    }

    if(Validator.isEmpty(data.text)) {
        errors.text = 'The text field is required'
    }

    if(!Validator.isURL(data.postImage)) {
        errors.postImage = 'Enter a valid image URL';
    }

    if(Validator.isEmpty(data.postImage)) {
        errors.postImage = 'Post image URL is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}