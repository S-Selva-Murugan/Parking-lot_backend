const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const parkingLotSchema = new Schema({
    name: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    floors: [{
        type: Schema.Types.ObjectId,
        ref: 'Floor'
    }]
});

const ParkingLot = model('ParkingLot', parkingLotSchema);

module.exports = ParkingLot;
