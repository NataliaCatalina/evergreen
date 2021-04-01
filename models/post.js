const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    plant_name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    image_url:{
        type:String,
        require:true
    }



});

module.exports = mongoose.model('Post', postSchema);