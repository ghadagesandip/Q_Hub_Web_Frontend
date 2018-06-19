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

class Employee extends Component {
    constructor(props){
        super(props)
        this.state = {
            employeesData: [],
            newEmployeeModal: false,
            alertBoxShow: false,
            alertBoxMsg: '',
            errMsg:{
                employeeName: '',
                employeeEmail: '',
                employeeDesignation: '',
                employeePassword: ''
            },
            data: {
                _id: '',
                name: '',
                email: '',
                designation: '',
                password: ''
            }
        }
    }

    componentWillMount(){
        this._getEmployeesList();
    }

    _getEmployeesList = () => {
        API.emp_get(this.getEmployeesResponse, {});
    }

    getEmployeesResponse = {
        success: (result) => {
            console.log('Success: ', result);
            this.setState({
                employeesData:result
            });
        },
        error: (error) => {
            console.log('Error: ', error);
        }
    }

    _renderEmployeeList = () => {
        var listArr = [];
        this.state.employeesData.map((item, index)=>{
            listArr.push((
                <TableRow key={index}>
                    <TableRowColumn>{index+1}</TableRowColumn>
                    <TableRowColumn>{item.name}</TableRowColumn>
                    <TableRowColumn>{item.email}</TableRowColumn>
                    <TableRowColumn>{item.designation}</TableRowColumn>
                    <TableRowColumn>
                        <i className="fas fa-pencil-alt" style={{cursor:'pointer'}} onClick={()=>{ this._editEmployeeModal(item) }}></i>
                    </TableRowColumn>
                </TableRow>
            ))
        })
        return listArr;
    }

    _editEmployeeModal = (item) => {
        this.setState({
            data: {
                _id: item._id,
                name: item.name,
                email: item.email,
                designation: item.designation
            }
        }, ()=>{
            this._toggleModal('newEmployeeModal', true)
        })
    }

    _toggleModal = (modalName, state) => {
        this.setState({
            [modalName]: state,
            errMsg:{
                employeeName: '',
                employeeEmail: '',
                employeeDesignation: '',
                employeePassword: ''
            }
        })
        if(!state){
            this.setState({
                data: {
                    _id: '',
                    name: '',
                    email: '',
                    designation: '',
                    password: ''
                }
            })
        }
    }

    _newEmployeeModal = () => {

        var edit = this.state.data._id == "" ? false : true;

        return (
            <Dialog
            title={ this.state.data._id=="" ? "New Employee" : "Update Employee" }
            modal={false}
            open={this.state.newEmployeeModal}
            >
                <div style={{position:'absolute', top:20, right:20, cursor:'pointer'}} onClick={()=>{ this._toggleModal('newEmployeeModal', false) }}>
                    <i className="fas fa-times"></i>
                </div>
                <div style={{paddingLeft:30, paddingRight:30}}>
                    <div>
                        <TextField
                        hintText="Employee Name"
                        errorText={this.state.errMsg.employeeName}
                        fullWidth={true}
                        value={this.state.data.name}
                        onChange={(event)=> { this._propSet('name', event) } }
                        />
                    </div>
                    <div>
                        <TextField
                        hintText="Employee Email"
                        errorText={this.state.errMsg.employeeEmail}
                        floatingLabelText="Employee Inforamtion"
                        value={this.state.data.email}
                        fullWidth={true}
                        onChange={(event)=> { this._propSet('email', event) } }
                        />
                    </div>
                    <div>
                        <TextField
                        hintText="Employee Designation"
                        errorText={this.state.errMsg.employeeDesignation}
                        floatingLabelText="Employee Designation"
                        value={this.state.data.designation}
                        fullWidth={true}
                        onChange={(event)=> { this._propSet('designation', event) } }
                        />
                    </div>
                    <div style={{display: !edit ? 'blcok' : 'none'}}>
                        <TextField
                        hintText="Employee Password"
                        errorText={this.state.errMsg.employeePassword}
                        floatingLabelText="Employee Password"
                        value={this.state.data.password}
                        fullWidth={true}
                        type="password"
                        onChange={(event)=> { this._propSet('password', event) } }
                        />
                    </div>
                    <div style={{textAlign:'center', marginTop:20}}>
                        { !edit ? (
                            <RaisedButton label="Save Employee" primary={true} onClick={()=>{ this._saveEmployee() }} />
                        ) : <RaisedButton label="Update Employee" primary={true} onClick={()=>{ this._editEmployee() }} />}
                    </div>
                </div>
            </Dialog>
        )
    }

    _saveEmployee = () => {
        var errorObj = this.state.errMsg;
        var valid = true;
        if(this.state.data.name==""){
            valid = false;
            errorObj = { ...errorObj, employeeName: 'Name is required' };
        }
        if(this.state.data.email==""){
            valid = false;
            errorObj = { ...errorObj, employeeEmail: 'Email is required' };
        }
        if(this.state.data.designation==""){
            valid = false;
            errorObj = { ...errorObj, employeeDesignation: 'Designation is required' };
        }
        if(this.state.data.password==""){
            valid = false;
            errorObj = { ...errorObj, employeePassword: 'Password is required' };
        }
        if(valid){
            var dataToSend = this.state.data;
            API.emp_save(this._saveCallback, dataToSend);
        }
        else{
            this.setState({
                errMsg: errorObj
            })
        }
    }

    _editEmployee = () => {
        var errorObj = this.state.errMsg;
        var valid = true;
        if(this.state.data.name==""){
            valid = false;
            errorObj = { ...errorObj, employeeName: 'Name is required' };
        }
        if(this.state.data.email==""){
            valid = false;
            errorObj = { ...errorObj, employeeEmail: 'Email is required' };
        }
        if(this.state.data.designation==""){
            valid = false;
            errorObj = { ...errorObj, employeeDesignation: 'Designation is required' };
        }
        if(valid){
            var dataToSend = this.state.data;
        API.emp_update(this._saveCallback, dataToSend);
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
            this._getEmployeesList();
            this.setState({
                newEmployeeModal: false,
                data: {
                    _id: '',
                    name: '',
                    email: '',
                    designation: '',
                    password: ''
                },
                errMsg:{
                    employeeName: '',
                    employeeEmail: '',
                    employeeDesignation: '',
                    employeePassword: ''
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
                    name: '',
                    email: '',
                    designation: '',
                    password: ''
                },
                errMsg:{
                    employeeName: '',
                    employeeEmail: '',
                    employeeDesignation: '',
                    employeePassword: ''
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
                <BreadCrumb title={'Employees'}/>
                <div className="appInnerBody">
                    <div style={{textAlign:'right', marginBottom:20}}>
                        <RaisedButton label="New Employee" onClick={()=>{ this._toggleModal('newEmployeeModal', true) }} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Information</TableHeaderColumn>
                                <TableHeaderColumn>Designation</TableHeaderColumn>
                                <TableHeaderColumn>Edit</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this._renderEmployeeList()}
                        </TableBody>
                    </Table>
                    {this._newEmployeeModal()}
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

export default Employee;