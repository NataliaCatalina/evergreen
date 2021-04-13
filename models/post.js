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
    },
    created: { 
        type: Date,
        default: Date.now
    },
    author: { 
        type: String,
    },
    category: {
        type: String,
    },
    lighting: {
        type: String, 
    },
    watering: {
        type: String,
    },
    temperature: {
        type: String, 
    },
    size: {
        type: String,
    },
    trade: {
        type: String,
    }
   

    },{
        timestamps: true
    });
    
module.exports = mongoose.model('Post', postSchema);