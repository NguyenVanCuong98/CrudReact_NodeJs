var Takes = require('../model/TaksModel')

exports.getALL = async function (req, res) {
    try {
        let getALL = await Takes.find()
        res.send({ getALL })
    } catch (error) {
        res.send({ message: 'error' })
    }
}

exports.add = async function (req, res) {
    try {
        let data = req.body
        let luudata = new Takes(data)
        let saveData = await luudata.save()
        res.send({
            saveData,
            id: id
        })
    } catch (error) {
        res.send({ message: 'error' })
    }
}

exports.delete_list = async function (req, res) {
    try {
        let id = req.params.id
        await Takes.findByIdAndDelete(id)
        res.send({ message: 'xoa thanh cong' })
    } catch (error) {
        res.send({ message: 'error' })
    }
}

exports.update_list = async function (req, res) {
    try {
        let id = req.params.id
        let name = req.body
        await Takes.findByIdAndUpdate(id, name)
        res.send({
            message: 'cap nhat thanh cong',
            id: id
        })
    } catch (error) {
        res.send({ message: 'error' })
    }
}

exports.pagination_list = async function (req, res) {
    try {
        let { page, limit } = req.query
        let _page = parseInt(page)
        let _limit = parseInt(limit)
        let skip = (_page - 1) * _limit
        let listData = await Takes.find().skip(skip).limit(_limit)
        let totalRecords = await Takes.estimatedDocumentCount()
        let totalPage = Math.ceil(totalRecords / _limit)
        res.send({
            listData,
            totalPage
        })

    } catch (error) {
        res.send({ message: 'error' })
    }
}
exports.searchPagination_list = async function (req, res) {
    try {
        let { page, limit, nameSearch } = req.query
        let _page = parseInt(page)
        let _limit = parseInt(limit)
        let skip = (_page - 1) * _limit
        let listData = await Takes.find({ name: { $regex: nameSearch, $options: 'i' } }).skip(skip).limit(_limit)
        let totalRecords = await Takes.countDocuments({ name: { $regex: nameSearch, $options: 'i' } })
        let totalPage = Math.ceil(totalRecords / _limit)
        res.send({
            listData,
            totalPage
        })

    } catch (error) {
        res.send({ message: 'error' })
    }
}
exports.getOne = async function (req, res) {
    try {
        let id = req.params.id
        const getONE = await Task.findById(id)
        let listItem = []
        listItem.push(getONE)
        res.send({
            listItem: listItem
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }
}