var mongoose = require('mongoose')

const { Schema, model } = mongoose

var TakeSchema = new Schema({
    name:{
        type:String,
        required: true
    }
})

module.exports = model('task', TakeSchema)