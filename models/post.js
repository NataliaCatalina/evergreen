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
        require:true
    },
    lighting: {
        type: String, 
        require:true
    },
    watering: {
        type: String,
        require:true
    },
    temperature: {
        type: String, 
        require:true
    },
    size: {
        type: String,
        require:true
    },
    trade: {
        type: String,
        require:true
    },
    comment: {
       type: Array,
       require:true
    }
   

    },{
        timestamps: true
    });
    
module.exports = mongoose.model('Post', postSchema);