const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    division : {
     type:String,
     required:true
    },
    s_No : {
      type:Number,
      required:true 
    },
    question: {
        type:String,
        required:true
    },
    option:{
        type:Array,
        required:true
    },
    answer:{
        type:String,
        required:true
    }

},{Timestamp:true})

const Quiz = mongoose.model("Quiz",quizSchema);
module.exports = Quiz;