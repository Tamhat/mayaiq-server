const mongoose = require("mongoose")
const emailSchema = new mongoose.Schema({
    userEmail: {
        type: String,

    },
    messsage: { type: String }
})
module.exports = mongoose.model("email", emailSchema)