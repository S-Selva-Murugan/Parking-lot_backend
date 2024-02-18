const _ = require('lodash')
const { validationResult } = require('express-validator')
const ParkingLot = require('../models/parking-model')
const Floor = require('../models/floor-model')
const parkingLotCltr = {}

parkingLotCltr.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, location, floors } = req.body;

    try {
        if (!floors || !Array.isArray(floors) || floors.length === 0) {
            return res.status(400).json({ error: 'Floors must be provided as a non-empty array' });
        }

        const floorDocuments = [];

        for (const floorData of floors) {
            const floor = new Floor(floorData);
            await floor.save();
            floorDocuments.push(floor);
        }

        const parkingLot = new ParkingLot({
            name,
            location,
            floors: floorDocuments.map(floor => floor._id)
        });

        await parkingLot.save();

        res.status(201).json(parkingLot);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};




parkingLotCltr.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { floors } = req.body;

    try {
        const parkingLot = await ParkingLot.findById(id).populate('floors');
        if (!parkingLot) {
            return res.status(404).json({ error: 'Parking lot not found' });
        }

        // Update slot availability for each floor
        for (const updatedFloorData of floors) {
            const currentFloor = parkingLot.floors.find(floor => floor.floorNumber === updatedFloorData.floorNumber);
            if (currentFloor) {
                for (const updatedSlotData of updatedFloorData.slots) {
                    const currentSlot = currentFloor.slots.find(slot => slot.size === updatedSlotData.size);
                    if (currentSlot) {
                        const slotsDifference = updatedSlotData.slotsAvailable - currentSlot.slotsAvailable;
                        currentSlot.slotsAvailable = updatedSlotData.slotsAvailable;
                        // Update the slot availability in the database
                        await currentFloor.save();
                        parkingLot.slotsAvailable += slotsDifference;
                    }
                }
            }
        }

        // Save the updated parkingLot document
        await parkingLot.save();

        res.status(200).json(parkingLot);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


parkingLotCltr.retrieve = async (req, res) => {
    try {
        const parkingLots = await ParkingLot.find({}).populate('floors'); // Use populate to retrieve floors' details
        res.status(200).json(parkingLots);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};

parkingLotCltr.retrieveOne = async (req, res) => {
    const parkingId = req.params.id;
    try {
        const parkingLot = await ParkingLot.findById(parkingId).populate('floors')
        if (!parkingLot) {
            return res.status(404).json({ error: 'Parking lot not found' });
        }
        res.status(200).json(parkingLot);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


parkingLotCltr.delete = async (req, res) => {
    try {
        const parkingLot = await ParkingLot.findByIdAndDelete(req.params.id);
        
        if (!parkingLot) {
            return res.status(404).json({ error: 'Parking lot not found' });
        }

        res.status(200).json(parkingLot);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = parkingLotCltr