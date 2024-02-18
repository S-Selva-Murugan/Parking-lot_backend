// require("dotenv").config();
// const mongoose = require("mongoose");

// const db = () => {
//   mongoose
//     .connect(process.env.DB_NAME)
//     .then(() => console.log("DB is running"))
//     .catch((err) => {
//       console.error(err);
//       setTimeout(() => {
//         db(); // Call the db function recursively to retry connection
//       }, 3000);
//     });
// };

// module.exports = db;

const mongoose = require('mongoose')
const configDB = async ()=>{
    try{
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/parking-lot')
        console.log('connected to db')
    } catch (e) {
        console.log('error in connecting to db')
    }
}
module.exports = configDB
