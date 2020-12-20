const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate')

const TeamSchema = new mongoose.Schema({
    team_name: {
        type: String,
        required: true,
        unique: true
    },
    wins: {
        type: Number,
        required: true
    },
    losses: {
        type: Number,
        required: true
    },
    ties: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
})

TeamSchema.plugin(mongoosePaginate)
module.exports = Team = mongoose.model("team", TeamSchema)