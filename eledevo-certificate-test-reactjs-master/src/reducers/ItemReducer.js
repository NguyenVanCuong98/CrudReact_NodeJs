import * as types from '../constants'

const DEFAULT_STATE = {
    listItem: [],
    dataFetched: false,
    isFetching: false,
    error: false,
    errorMessage: null,
    activePage: 1,
    totalPage: 0,
    nameSearch: ''

}
export default ((state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_ITEM_RESQUET:
        case types.ADD_ITEM_RESQUET:
        case types.DELETE_ITEM_RESQUET:
        case types.UPDATE_ITEM_RESQUET:
        case types.PAGINATION_ITEM_RESQUET:
        case types.SEARCHPAGINATION_ITEM_RESQUET:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                listItem: action.payload
            }
        case types.PAGINATION_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                listItem: action.payload.listItem,
                activePage: action.payload.activePage,
                totalPage: action.payload.totalPage,
            }
        case types.SEARCHPAGINATION_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                listItem: action.payload.listItem,
                activePage: action.payload.activePage,
                totalPage: action.payload.totalPage,
                nameSearch: action.payload.nameSearch
            }
        case types.ADD_ITEM_SUCCESS:
        case types.DELETE_ITEM_SUCCESS:
        case types.UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
            }
        case types.GET_ITEM_FAILURE:
        case types.ADD_ITEM_FAILURE:
        case types.DELETE_ITEM_FAILURE:
        case types.UPDATE_ITEM_FAILURE:
        case types.PAGINATION_ITEM_FAILURE:
        case types.SEARCHPAGINATION_ITEM_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: false,
                errorMessage: action.payload.errorMessage
            }
        default:
            return state;
    }
})