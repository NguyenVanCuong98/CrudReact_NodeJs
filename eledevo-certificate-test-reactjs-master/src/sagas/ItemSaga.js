import * as types from '../constants'

import { put, select, takeEvery } from 'redux-saga/effects'

import getItem from '../fetchAPIs/getItems'
import addItem from '../fetchAPIs/addItem'
import deleteItem from '../fetchAPIs/deleteItem'
import updateItem from '../fetchAPIs/updateItem'
import paginationItem from '../fetchAPIs/pagination'
import searchPagination from '../fetchAPIs/searchPagination'
// import getOne from '../fetchAPIs/getOne'

function* getListItem() {
    try {
        const res = yield getItem()
        yield put({
            type: types.GET_ITEM_SUCCESS,
            payload: res.getALL
        })
    } catch (error) {
        yield put({
            type: types.GET_ITEM_FAILURE,
            payload: {
                error: error.message
            }
        })
    }
}

function* addListItem(action) {
    const name = action.payload
    try {
        yield addItem(name)
        const reducer = yield select((state)=>{
            return{
                nameSearch: state.items.nameSearch,
                activePage: state.items.activePage,
                totalPage: state.items.totalPage   ,
                listItem: state.items.listItem
            }
        })
        yield put({
            type: types.ADD_ITEM_SUCCESS,
        })
        const pagination = yield paginationItem()
        const search = yield searchPagination(reducer)
        if(reducer.nameSearch){
               yield put({
                   type: types.SEARCHPAGINATION_ITEM_RESQUET,
                   payload: {
                       activePage: search.totalPage,
                       nameSearch: action.payload.name
                   }
               })
        }
        else{
            yield put({
                type: types.PAGINATION_ITEM_RESQUET,
                payload: pagination.totalPage
            })
        }
        
    } catch (error) {
        yield put({
            type: types.ADD_ITEM_FAILURE,
            payload: {
                error: error.message
            }
        })
    }
}


function* deleteListItem(action) {
    try {
        yield deleteItem(action.payload)
        yield put({
            type: types.DELETE_ITEM_SUCCESS,
        })
        const reducer = yield select((state)=>{
            return{
                listItem: state.items.listItem,
                totalPage: state.items.totalPage,
                activePage: state.items.activePage,
                nameSearch: state.items.nameSearch,
            }
        })
        const paginations = yield paginationItem()
        // const search = yield searchPagination(reducer)
        if(reducer.nameSearch){
            if((reducer.listItem.length==1)&&(reducer.activePage==reducer.totalPage)){
                yield put({
                    type:types.SEARCHPAGINATION_ITEM_RESQUET,
                    payload:{
                        activePage: reducer.activePage-1,
                        nameSearch: reducer.nameSearch
                    }
                })
            }else{
                yield put({
                    type:types.SEARCHPAGINATION_ITEM_RESQUET,
                    payload:{
                        activePage: reducer.activePage,
                        nameSearch: reducer.nameSearch
                    }
                })
            }
        }else{
            yield put({
                type: types.PAGINATION_ITEM_RESQUET,
                payload: paginations.activePage
            })
        }

        
    } catch (error) {
        yield put({
            type: types.DELETE_ITEM_FAILURE,
            payload: {
                error: error.message
            }
        })
    }
}

function* updateListItem(action) {
    const name= action.payload
    try {
        yield updateItem(name)
        yield put({
            type: types.UPDATE_ITEM_SUCCESS,
        })
        const reducer = yield select((state)=>{
            return{
                activePage: state.items.activePage,
                totalPage: state.items.totalPage,
                nameSearch: state.items.nameSearch
            }
        })
        const search = yield searchPagination(reducer)
        if(reducer.nameSearch){
            if(name== reducer.nameSearch){
                yield put({
                    type: types.SEARCHPAGINATION_ITEM_RESQUET,
                    payload:{
                        activePage: search.activePage,
                        nameSearch: action.payload.name
                    }
                })
            }else{
                yield put({
                    type: types.SEARCHPAGINATION_ITEM_RESQUET,
                    payload:{
                        activePage: 1,
                        nameSearch: action.payload.name
                    }
                })
            }
        }else{
            yield put({
                type: types.PAGINATION_ITEM_RESQUET,
                payload: reducer.activePage
            })
        }
    } catch (error) {
        yield put({
            type: types.UPDATE_ITEM_FAILURE,
            payload: {
                error: error.message
            }
        })
    }
}

function* paginationListItem(action) {
    console.log(action.payload,'aaa');
    try {
        const res = yield paginationItem(action.payload)
        yield put({
            type: types.PAGINATION_ITEM_SUCCESS,
            payload: {
                listItem: res.listData,
                activePage: action.payload,
                totalPage: res.totalPage
            }
        })
    } catch (error) {
        yield put({
            type: types.PAGINATION_ITEM_FAILURE,
            payload: {
                error: error.message
            }
        })
    }
}

function* searchPaginationListItem(action) {
    // console.log(action.payload, 'aaaaaa');
    try {
        const res = yield searchPagination(action.payload)
        yield put({
            type: types.SEARCHPAGINATION_ITEM_SUCCESS,
            payload: {
                listItem: res.listData,
                activePage: action.payload.activePage,
                totalPage: res.totalPage,
                nameSearch: action.payload.nameSearch,
            }
        })
    } catch (error) {
        yield put({
            type: types.SEARCHPAGINATION_ITEM_FAILURE,
            payload: {
                error: error.message
            }
        })
    }
}

export const ItemSaga = [
    takeEvery(types.GET_ITEM_RESQUET, getListItem),
    takeEvery(types.ADD_ITEM_RESQUET, addListItem),
    takeEvery(types.DELETE_ITEM_RESQUET, deleteListItem),
    takeEvery(types.UPDATE_ITEM_RESQUET, updateListItem),
    takeEvery(types.PAGINATION_ITEM_RESQUET, paginationListItem),
    takeEvery(types.SEARCHPAGINATION_ITEM_RESQUET, searchPaginationListItem)
]