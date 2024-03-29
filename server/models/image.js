const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const imageSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        default: null
    }
});

module.exports=mongoose.model('Image', imageSchema);