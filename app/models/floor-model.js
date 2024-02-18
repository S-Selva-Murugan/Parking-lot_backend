const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const floorSchema = new Schema({
    floorNumber: {
        type: Number
    },
    slots: [{
        size: {
            type: String,
            enum: ['Small', 'Medium', 'Large', 'XLarge']
        },
        slotsAvailable: {
            type: Number,
        }
    }],
    parkingLot: {  
        type: Schema.Types.ObjectId,
        ref: 'ParkingLot'
    }
});

const Floor = model('Floor', floorSchema);

module.exports = Floor;
