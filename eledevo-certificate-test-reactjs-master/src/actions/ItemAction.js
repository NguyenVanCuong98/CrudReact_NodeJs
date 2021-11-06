import * as types from '../constants'

export function getListItem(payload){
    return{
        type: types.GET_ITEM_RESQUET,
        payload
    }
}
export function addListItem(payload){
    return{
        type: types.ADD_ITEM_RESQUET,
        payload
    }
}
export function deleteListItem(payload){
    return{
        type: types.DELETE_ITEM_RESQUET,
        payload
    }
}
export function updateListItem(payload){
    return{
        type: types.UPDATE_ITEM_RESQUET,
        payload
    }
}
export function paginationListItem(payload){
    return{
        type: types.PAGINATION_ITEM_RESQUET,
        payload
    }
}
export function searchPaginationListItem(payload){
    return{
        type: types.SEARCHPAGINATION_ITEM_RESQUET,
        payload
    }
}