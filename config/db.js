require("dotenv").config();
const { mongoose } = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("Db conntection is succesful")
    } catch (error) {
        console.log("Db conntection is failes")
        process.exit(1);

    }
}
module.exports = connectDB
