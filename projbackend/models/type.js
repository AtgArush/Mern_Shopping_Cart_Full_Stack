const mongoose = require("mongoose")

const typeSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        }
    },
    {timestamps: true}
)
module.exports = mongoose.model("Type", typeSchema)