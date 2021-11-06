var express =require('express')
var router = express.Router()

var ketnoi = require('./todolistRouter')

router.use('/tasks' ,ketnoi)

module.exports=router