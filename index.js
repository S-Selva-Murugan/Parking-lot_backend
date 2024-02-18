const express = require("express");
const cors = require("cors");
const path = require('path')
const { checkSchema } = require("express-validator")
const configDB = require('./config/db')
const app = express();
const parkingLotCltr = require('./app/controller/parkingLot-controller')
// const floorCltr = require('./app/controller/floor-controller')
const { parkingValidationSchema } = require('./app/validations/parking-validation')
const { floorValidationSchema } = require('./app/validations/floor-validation')

configDB()

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the site');
});

app.post('/api/parking/create',checkSchema(parkingValidationSchema),parkingLotCltr.create)
app.get('/api/parking',checkSchema(parkingValidationSchema),parkingLotCltr.retrieve)
app.get('/api/parking/:id',parkingLotCltr.retrieveOne)
app.put('/api/parking/:id',checkSchema(parkingValidationSchema),parkingLotCltr.update)
app.delete('/api/parking/:id',checkSchema(parkingValidationSchema),parkingLotCltr.delete)


const PORT = 4545
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
