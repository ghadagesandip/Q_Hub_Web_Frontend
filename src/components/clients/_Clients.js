import React, { Component } from 'react';

import { Header, Sidebar, BreadCrumb } from '../../custom';
import * as globals from '../../lib/globals';
import { API } from '../../lib/api';
import './style.css';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    RaisedButton,
    Dialog,
    TextField,
    Snackbar
} from 'material-ui';

class Clients extends Component {
    constructor(props){
        super(props)
        this.state = {
            clientsData: [],
            newClientModal: false,
            alertBoxShow: false,
            alertBoxMsg: '',
            errMsg:{
                clientName: '',
                clientInfo: ''
            },
            data: {
                _id: '',
                client_name: '',
                client_info: ''
            }
        }
    }

    componentWillMount(){
        this._getClientsList();
    }

    _getClientsList = () => {
        API.clients_get(this.getClientsResponse, {});
    }

    getClientsResponse = {
        success: (result) => {
            console.log('Success: ', result);
            this.setState({
                clientsData:result
            });
        },
        error: (error) => {
            console.log('Error: ', error);
        }
    }

    _renderClientList = () => {
        var listArr = [];
        this.state.clientsData.map((item, index)=>{
            listArr.push((
                <TableRow key={index}>
                    <TableRowColumn>{index+1}</TableRowColumn>
                    <TableRowColumn>{item.client_name}</TableRowColumn>
                    <TableRowColumn>{item.client_info}</TableRowColumn>
                    <TableRowColumn>
                        <i className="fas fa-pencil-alt" style={{cursor:'pointer'}} onClick={()=>{ this._editClientModal(item) }}></i>
                    </TableRowColumn>
                </TableRow>
            ))
        })
        return listArr;
    }

    _editClientModal = (item) => {
        this.setState({
            data: {
                _id: item._id,
                client_name: item.client_name,
                client_info: item.client_info
            }
        }, ()=>{
            this._toggleModal('newClientModal', true)
        })
    }

    _toggleModal = (modalName, state) => {
        this.setState({
            [modalName]: state,
            errMsg:{
                clientName: '',
                clientInfo: ''
            }
        })
    }

    _newClientModal = () => {

        var edit = this.state.data._id == "" ? false : true;

        return (
            <Dialog
            title={ this.state.data._id=="" ? "New Client" : "Update Client" }
            modal={false}
            open={this.state.newClientModal}
            >
                <div style={{position:'absolute', top:20, right:20, cursor:'pointer'}} onClick={()=>{ this._toggleModal('newClientModal', false) }}>
                    <i className="fas fa-times"></i>
                </div>
                <div style={{paddingLeft:30, paddingRight:30}}>
                    <div>
                        <TextField
                        hintText="Client Name"
                        errorText={this.state.errMsg.clientName}
                        fullWidth={true}
                        value={this.state.data.client_name}
                        onChange={(event)=> { this._propSet('client_name', event) } }
                        />
                    </div>
                    <div>
                        <TextField
                        hintText="Client Information"
                        errorText={this.state.errMsg.clientInfo}
                        floatingLabelText="Client Inforamtion"
                        value={this.state.data.client_info}
                        multiLine={true}
                        rows={2}
                        fullWidth={true}
                        onChange={(event)=> { this._propSet('client_info', event) } }
                        />
                    </div>
                    <div style={{textAlign:'center', marginTop:20}}>
                        { !edit ? (
                            <RaisedButton label="Save Client" primary={true} onClick={()=>{ this._saveClient() }} />
                        ) : <RaisedButton label="Update Client" primary={true} onClick={()=>{ this._editClient() }} />}
                    </div>
                </div>
            </Dialog>
        )
    }

    _saveClient = () => {
        var errorObj = this.state.errMsg;
        var valid = true;
        if(this.state.data.client_name==""){
            valid = false;
            errorObj = { ...errorObj, clientName: 'Name is required' };
        }
        if(this.state.data.client_info==""){
            valid = false;
            errorObj = { ...errorObj, clientInfo: 'Info is required' };
        }
        if(valid){
            var dataToSend = this.state.data;
            API.clients_save(this._saveCallback, dataToSend);
        }
        else{
            this.setState({
                errMsg: errorObj
            })
        }
    }

    _editClient = () => {
        var errorObj = this.state.errMsg;
        var valid = true;
        if(this.state.data.client_name==""){
            valid = false;
            errorObj = { ...errorObj, clientName: 'Name is required' };
        }
        if(this.state.data.client_info==""){
            valid = false;
            errorObj = { ...errorObj, clientInfo: 'Info is required' };
        }
        if(valid){
            var dataToSend = this.state.data;
            API.clients_update(this._saveCallback, dataToSend);
        }
        else{
            this.setState({
                errMsg: errorObj
            })
        }
    }

    _saveCallback = {
        success: (result) => {
            console.log(result);
            this._getClientsList();
            this.setState({
                newClientModal: false,
                data: {
                    _id: '',
                    client_name: '',
                    client_info: ''
                },
                errMsg:{
                    clientName: '',
                    clientInfo: ''
                },
                alertBoxShow: true,
                alertBoxMsg: result
            })
        },
        error: (error) => {
            console.log(error);
            this.setState({
                data: {
                    _id: '',
                    client_name: '',
                    client_info: ''
                },
                errMsg:{
                    clientName: '',
                    clientInfo: ''
                },
                alertBoxShow: true,
                alertBoxMsg: error.data
            })
        }
    }

    _propSet = (flag, event) => {
        var newData = {...this.state.data, [flag]: event.target.value};
        this.setState({
            data:newData
        });
    }
    _errorSet = (flag, event) => {
        var newData = {...this.state.errMsg, [flag]: event.target.value};
        this.setState({
            errMsg:newData
        });
    }

    _handleAlertClose = () => {
        this.setState({
            alertBoxShow: false,
            alertBoxMsg: ''
        })
    }

    render(){
        return (
            <div className="appBody">
                <Header />
                <Sidebar />
                <BreadCrumb title={'Clients'}/>
                <div className="appInnerBody">
                    <div style={{textAlign:'right', marginBottom:20}}>
                        <RaisedButton label="New Client" onClick={()=>{ this._toggleModal('newClientModal', true) }} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Information</TableHeaderColumn>
                                <TableHeaderColumn>Edit</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this._renderClientList()}
                        </TableBody>
                    </Table>
                    {this._newClientModal()}
                    <Snackbar
                    open={this.state.alertBoxShow}
                    message={this.state.alertBoxMsg}
                    onRequestClose={this._handleAlertClose}
                    />
                </div>
            </div>
        )
    }
}

export default Clients;