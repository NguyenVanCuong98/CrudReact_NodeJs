import React, { Component } from 'react';
import { connect } from 'react-redux';
import Items from '../components/Items';
import * as action from '../actions/ItemAction'

function mapStateToProps(state) {
    return {
        items: state.items.listItem,
        activePage: state.items.activePage,
        totalPage: state.items.totalPage,
        nameSearch: state.items.nameSearch
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initLoad: () => {
            dispatch(action.getListItem())
        },
        addItem: (name) => {
            dispatch(action.addListItem(name))
        },
        deleteItem: (id) => {
            dispatch(action.deleteListItem(id))
        },
        updateItem: (data) => {
            dispatch(action.updateListItem(data))
        },
        pagination: (num) => {
            dispatch(action.paginationListItem(num))
        },
        searchPagination: (data) => {
            dispatch(action.searchPaginationListItem(data))
        },
    };
}

class ItemPageContainer extends Component {
    componentDidMount() {
        //this.props.initLoad()
        this.props.pagination(1)
    }
    render() {
        return (
            <div>
                <Items {...this.props} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(ItemPageContainer);