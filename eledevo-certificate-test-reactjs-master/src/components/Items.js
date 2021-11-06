import React, { Component } from 'react';
import { LIMIT } from '../constants';

class Items extends Component {
    state = {
        id: '',
        name: '',
        nameUpdate: '',
        nameSearch: '',
        form:'',
        url:''
    }
    //
    handleUpload(file){
        //chon file
        const imageFile = file[0];
         // tao duong dan de hien thi cho nguoi dung nhin thay
        if(imageFile){
            //tao form va duong dan roi luu lai vao state
            const form= new FormData();
            form.append('myFile',imageFile)
            this.setState({
                form: form,
                url: URL.createObjectURL(imageFile)
            })
        }
    }


    render() {
        let page = []
        let activePage = this.props.activePage
        let totalPage = this.props.totalPage
        let nameSearch = this.props.nameSearch

        for (let i = 1; i <= totalPage; i++) {
            page.push(i)
        }
        let activeBtn = { background: 'black', color: 'white' }
        let pagination = []
        pagination = page.map((item, key) => {
            if (nameSearch) {
                if (item === activePage) {
                    return (
                        <button style={activeBtn} key={key} onClick={() => this.props.searchPagination({ nameSearch: nameSearch, activePage: item })}>{item}</button>
                    )
                } else {
                    return (
                        <button key={key} onClick={() => this.props.searchPagination({ nameSearch: nameSearch, activePage: item })}>{item}</button>
                    )
                }
            } else {
                if (item === activePage) {
                    return (
                        <button style={activeBtn} key={key} onClick={() => this.props.pagination(item)}>{item}</button>
                    )
                } else {
                    return (
                        <button key={key} onClick={() => this.props.pagination(item)}>{item}</button>
                    )
                }
            }
        })
        let listData = []
        if (this.props.items) {
            listData = this.props.items.map((item, idx) => {
                return (
                    <tr key={idx}>
                        <th>{(activePage - 1) * LIMIT + idx + 1}</th>
                        <th>{item.name}</th>
                        <th><button onClick={() => this.props.deleteItem({ id: item._id })}>delete</button></th>
                        <th><button onClick={() => this.setState({ nameUpdate: item.name, id: item._id })}>edit</button></th>
                    </tr>
                )
            })
        }
        return (
            <div>
                <div>
                    <div>
                        <input type='text' onChange={(e) => this.setState({ nameSearch: e.target.value })}></input>
                        <button onClick={() => this.props.searchPagination({ nameSearch: this.state.nameSearch, activePage: 1 })}>search</button>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>stt</th>
                                <th>name</th>
                            </tr>
                            {listData}
                        </tbody>
                    </table>
                    {pagination}
                </div>
                <div>
                    <input type='text' onChange={(e) => this.setState({ name: e.target.value })}></input>
                    <button onClick={() => this.props.addItem({ name: this.state.name })}>add</button>
                </div>
                <div>
                    <input type='text' onChange={(e) => this.setState({ nameUpdate: e.target.value })} value={this.state.nameUpdate}></input>
                    <button onClick={() => this.props.updateItem({ name: this.state.nameUpdate, id: this.state.id })}>update</button>
                </div>
            </div>
        );
    }
}

export default Items;