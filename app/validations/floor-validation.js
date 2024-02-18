const Floor = require('../models/parking-model')

const floorValidationSchema = {
    floorNumber:{
        notEmpty:{
            errorMessage:'Floor number cannot be empty'
        },
        isNumeric:{
           errorMessage:'Floor number should be a number'
        }
    },
    location:{
        notEmpty:{
            errorMessage:'Location cannot be empty'
        }
    }
};

module.exports = {
    floorValidationSchema
};
