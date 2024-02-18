const ParkingLot = require('../models/parking-model')

const parkingValidationSchema = {
    name:{
        notEmpty:{
            errorMessage:'Name cannot be empty'
        },
        isLength:{
            options:{min:3, max:64},
            errorMessage: 'Name length should be between 3 and 64 characters'
        }
    },
    location:{
        notEmpty:{
            errorMessage:'Location cannot be empty'
        }
    }
};

module.exports = {
    parkingValidationSchema
};
