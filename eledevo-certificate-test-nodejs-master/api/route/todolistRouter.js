var express = require('express')
var router = express.Router()

var todolist = require('../controller/todolistController')

router.route('/')
    .get(todolist.getALL)
    .post(todolist.add)

router.route('/pagination')
    .get(todolist.pagination_list)

router.route('/searchPagination')
    .get(todolist.searchPagination_list)

router.route('/:id')
    .delete(todolist.delete_list)
    .put(todolist.update_list)
    .get(todolist.getOne)

module.exports = router