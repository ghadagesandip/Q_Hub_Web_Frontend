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

class Technology extends Component {
    constructor(props){
        super(props)
        this.state = {
            techsData: [],
            newTechModal: false,
            alertBoxShow: false,
            alertBoxMsg: '',
            errMsg:{
                technologyName: '',
                technologyDesc: ''
            },
            data: {
                _id: '',
                technology_name: '',
                technology_desc: ''
            }
        }
    }

    componentWillMount(){
        this._getTechList();
    }

    _getTechList = () => {
        API.tech_get(this.getTechsResponse, {});
    }

    getTechsResponse = {
        success: (result) => {
            console.log('Success: ', result);
            this.setState({
                techsData:result
            });
        },
        error: (error) => {
            console.log('Error: ', error);
        }
    }

    _renderTechList = () => {
        var listArr = [];
        this.state.techsData.map((item, index)=>{
            listArr.push((
                <TableRow key={index}>
                    <TableRowColumn>{index+1}</TableRowColumn>
                    <TableRowColumn>{item.technology_name}</TableRowColumn>
                    <TableRowColumn>{item.technology_desc}</TableRowColumn>
                    <TableRowColumn>
                        <i className="fas fa-pencil-alt" style={{cursor:'pointer'}} onClick={()=>{ this._editTechModal(item) }}></i>
                    </TableRowColumn>
                </TableRow>
            ))
        })
        return listArr;
    }

    _editTechModal = (item) => {
        this.setState({
            data: {
                _id: item._id,
                technology_name: item.technology_name,
                technology_desc: item.technology_desc
            }
        }, ()=>{
            this._toggleModal('newTechModal', true)
        })
    }

    _toggleModal = (modalName, state) => {
        this.setState({
            [modalName]: state,
            errMsg:{
                technologyName: '',
                technologyDesc: ''
            }
        })
    }

    _newTechModal = () => {

        var edit = this.state.data._id == "" ? false : true;

        return (
            <Dialog
            title={ this.state.data._id=="" ? "New Technology" : "Update Technology" }
            modal={false}
            open={this.state.newTechModal}
            >
                <div style={{position:'absolute', top:20, right:20, cursor:'pointer'}} onClick={()=>{ this._toggleModal('newTechModal', false) }}>
                    <i className="fas fa-times"></i>
                </div>
                <div style={{paddingLeft:30, paddingRight:30}}>
                    <div>
                        <TextField
                        hintText="Technlogy Name"
                        errorText={this.state.errMsg.technologyName}
                        fullWidth={true}
                        value={this.state.data.technology_name}
                        onChange={(event)=> { this._propSet('technology_name', event) } }
                        />
                    </div>
                    <div>
                        <TextField
                        hintText="Technlogy Information"
                        errorText={this.state.errMsg.technologyDesc}
                        floatingLabelText="Technlogy Inforamtion"
                        value={this.state.data.technology_desc}
                        multiLine={true}
                        rows={2}
                        fullWidth={true}
                        onChange={(event)=> { this._propSet('technology_desc', event) } }
                        />
                    </div>
                    <div style={{textAlign:'center', marginTop:20}}>
                        { !edit ? (
                            <RaisedButton label="Save Technlogy" primary={true} onClick={()=>{ this._saveTech() }} />
                        ) : <RaisedButton label="Update Technlogy" primary={true} onClick={()=>{ this._editTech() }} />}
                    </div>
                </div>
            </Dialog>
        )
    }

    _saveTech = () => {
        var errorObj = this.state.errMsg;
        var valid = true;
        if(this.state.data.technology_name==""){
            valid = false;
            errorObj = { ...errorObj, technologyName: 'Name is required' };
        }
        if(this.state.data.technology_desc==""){
            valid = false;
            errorObj = { ...errorObj, technologyDesc: 'Desc is required' };
        }
        if(valid){
            var dataToSend = this.state.data;
            API.tech_save(this._saveCallback, dataToSend);
        }
        else{
            this.setState({
                errMsg: errorObj
            })
        }
    }

    _editTech = () => {
        var errorObj = this.state.errMsg;
        var valid = true;
        if(this.state.data.technology_name==""){
            valid = false;
            errorObj = { ...errorObj, technologyName: 'Name is required' };
        }
        if(this.state.data.technology_desc==""){
            valid = false;
            errorObj = { ...errorObj, technologyDesc: 'Desc is required' };
        }
        if(valid){
            var dataToSend = this.state.data;
            API.tech_update(this._saveCallback, dataToSend);
        }
        else{
            this.setState({
                errMsg: errorObj
            })
        }
    }

    _saveCallback = {
        success: (result) => {
            console.log('Success', result);
            this._getTechList();
            this.setState({
                newTechModal: false,
                data: {
                    _id: '',
                    technology_name: '',
                    technology_desc: ''
                },
                alertBoxShow: true,
                alertBoxMsg: result
            })
        },
        error: (error) => {
            console.log('Error', error);
            this.setState({
                data: {
                    _id: '',
                    technology_name: '',
                    technology_desc: ''
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
                <BreadCrumb title={'Technologies'}/>
                <div className="appInnerBody">
                    <div style={{textAlign:'right', marginBottom:20}}>
                        <RaisedButton label="New Technology" onClick={()=>{ this._toggleModal('newTechModal', true) }} />
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
                            {this._renderTechList()}
                        </TableBody>
                    </Table>
                    {this._newTechModal()}
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

export default Technology;