const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const db = await mongoose.connect("mongodb://localhost:27017",{
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    
        console.log('Successfully conneceted to DB');
        return db;
    }catch(err){
        console.error(err.message);
        process.exit(-1);
    }
};

module.exports = connectDB;