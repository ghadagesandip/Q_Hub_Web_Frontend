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
    Snackbar,
    SelectField,
    MenuItem,
    Card
} from 'material-ui';


class Questions extends Component {
    constructor(props){
        super(props)
        this.state = {
            newEmployeeModal: false,
            ansModal: false,
            addAnsModal: false,
            alertBoxShow: false,
            alertBoxMsg: '',
            queListArr: [],
            employeesData: [],
            techsData: [],
            clientsData: [],
            newQueModal: false,
            data: {
                selectedClientId: '',
                selectedEmpId: '',
                selectedTechId: ''
            },
            addAnsData: {
                questionId: '',
                question: '',
                answer: ''
            },
            filter: {
                selectedClientId: '',
                selectedTechId: ''
            },
            temp_que_list: [
                {question: '', answer: ''}
            ],
            selectedQueInfo: {question: '', answers:[]}
        }
    }

    componentWillMount(){
        this._getQueList();
        this._getEmployeesList();
        this._getTechList();
        this._getClientsList();
    }

    _getQueList = () => {
        API.que_get(this._getQueResponse, {});
    }

    _getEmployeesList = () => {
        API.emp_get(this.getEmployeesResponse, {});
    }

    _getTechList = () => {
        API.tech_get(this.getTechsResponse, {});
    }

    _getClientsList = () => {
        API.clients_get(this.getClientsResponse, {});
    }

    _getQueResponse = {
        success: (result) => {
            console.log('Ques Success: ', result);
            this.setState({
                queListArr:result
            });
        },
        error: (error) => {
            console.log('Error: ', error);
        }
    }

    getEmployeesResponse = {
        success: (result) => {
            console.log('Emp Success: ', result);
            this.setState({
                employeesData:result
            });
        },
        error: (error) => {
            console.log('Error: ', error);
        }
    }

    getTechsResponse = {
        success: (result) => {
            console.log('Tech Success: ', result);
            this.setState({
                techsData:result
            });
        },
        error: (error) => {
            console.log('Error: ', error);
        }
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

    _renderList = () => {
        var listArr = [];
        this.state.queListArr.map((item, index)=>{
            if( (this.state.filter.selectedClientId=="" || item.client_id==this.state.filter.selectedClientId)
                && (this.state.filter.selectedTechId=="" || item.technology_id==this.state.filter.selectedTechId) ){
                listArr.push((
                    <TableRow key={index}>
                        <TableRowColumn>{index+1}</TableRowColumn>
                        <TableRowColumn style={{width:'70%'}}>{item.question}</TableRowColumn>
                        <TableRowColumn>
                            <i className="fas fa-plus-circle" style={{cursor:'pointer'}} onClick={()=>{ this._setAddAnsModal(item) }}></i>
                        </TableRowColumn>
                        <TableRowColumn>
                            <i className="fas fa-pencil-alt" style={{cursor:'pointer'}} onClick={()=>{  }}></i>
                        </TableRowColumn>
                        <TableRowColumn>
                            <i className="fas fa-eye" style={{cursor:'pointer'}} onClick={()=>{ this._setAnswers(item) }}></i>
                        </TableRowColumn>
                    </TableRow>
                ))
            }
        })
        return listArr
    }

    _setAnswers = (item) => {
        this.setState({
            selectedQueInfo: item
        }, ()=>{
            this._toggleModal('ansModal', true);
        })
    }

    _toggleModal = (modalName, state) => {
        console.log('sdfsdf');

        this.setState({
            [modalName]: state
        })
        if(!state){

        }
    }

    _handleModalClose = () => {

    }

    _dropdownChange = (prop, value) => {
        var newData = { ...this.state.data, [prop]: value };
        this.setState({
            data: newData
        })
    }

    _filterChange = (prop, value) => {
        var newData = { ...this.state.filter, [prop]: value };
        this.setState({
            filter: newData
        })
    }

    _quePropSet = (event, index, type) => {
        console.log(event, index, type);
        var queArr = this.state.temp_que_list;
        queArr[index][type] = event.target.value;
        this.setState({
            temp_que_list: queArr
        }, ()=>{
            console.log('QueArr', queArr);
        })
    }

    _addQue = () => {
        console.log('asdasd');
        var queArr = this.state.temp_que_list;
        queArr.push({
            question:'',
            answer: ''
        })
        this.setState({
            temp_que_list: queArr
        })
    }

    _newQueModal = () => {
        var clientArr = [];
        this.state.clientsData.map((item)=>{
            clientArr.push((
                <MenuItem value={item._id} primaryText={item.client_name} fullWidth={true} />
            ))
        })

        var techArr = [];
        this.state.techsData.map((item)=>{
            techArr.push((
                <MenuItem value={item._id} primaryText={item.technology_name} fullWidth={true} />
            ))
        })

        var queArr = [];
        this.state.temp_que_list.map((item, index)=>{
            queArr.push((
                <div className="row">
                    <div className="col-md-6">
                        <TextField
                            hintText="Question"
                            errorText={''}
                            floatingLabelText="Enter Question"
                            value={item.question}
                            fullWidth={true}
                            onChange={(event)=> { this._quePropSet(event, index, 'question') } }
                        />
                    </div>
                    <div className="col-md-6">
                        <TextField
                            hintText="Answer"
                            errorText={''}
                            floatingLabelText="Enter Answer"
                            value={item.answer}
                            fullWidth={true}
                            onChange={(event)=> { this._quePropSet(event, index, 'answer') } }
                        />
                    </div>
                </div>
            ))
        })

        return (
            <Dialog
            title="Add Questions"
            modal={false}
            open={this.state.newQueModal}
            onRequestClose={()=>{  }}
            autoScrollBodyContent = {true}
            >
                <div style={{position:'absolute', top:20, right:20, cursor:'pointer'}} onClick={()=>{ this._toggleModal('newQueModal', false) }}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <SelectField
                            floatingLabelText="Client"
                            value={this.state.data.selectedClientId}
                            onChange={(event, index, value)=> { this._dropdownChange('selectedClientId', value) }}
                            >
                                {clientArr}
                            </SelectField>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <SelectField
                            floatingLabelText="Technology"
                            value={this.state.data.selectedTechId}
                            onChange={(event, index, value)=> { this._dropdownChange('selectedTechId', value) }}
                            >
                                {techArr}
                            </SelectField>
                        </div>
                    </div>
                    <div className="row text-right">
                        <div className="col-md-12">
                            <i className="fas fa-plus-circle" style={{fontSize:28}} onClick={this._addQue}></i>
                        </div>
                    </div>
                    <div style={{maxHeight:200, overflowX:'hidden'}}>
                        {queArr}
                    </div>
                    <br/>
                    <div className="row text-center">
                        <div className="col-md-12">
                            <RaisedButton label="Save Questions" primary={true} onClick={()=>{ this._saveQue() }} />
                        </div>
                    </div>
                </div>
            </Dialog>
        )
    }

    _saveQue = () => {
        var dataToSend = {
            client_id: this.state.data.selectedClientId,
            technology_id: this.state.data.selectedTechId,
            employee_id: this.state.data.selectedEmpId,
            temp_que_list: JSON.stringify(this.state.temp_que_list)
        }
        API.que_save(this._saveQueCallback, dataToSend);
    }

    _saveQueCallback = {
        success: (result) => {
            console.log('Success', result);
            this._getQueList();
            this.setState({
                newQueModal: false,
                temp_que_list: [ { question: '', answer: '' } ],
                data: {
                    selectedClientId: '',
                    selectedEmpId: '',
                    selectedTechId: ''
                },
                alertBoxShow: true,
                alertBoxMsg: result
            })
        },
        error: (error) => {
            console.log('Error', error);
            this.setState({
                newQueModal: false,
                temp_que_list: [ { question: '', answer: '' } ],
                data: {
                    selectedClientId: '',
                    selectedEmpId: '',
                    selectedTechId: ''
                },
                alertBoxShow: true,
                alertBoxMsg: error
            })
        }
    }

    _handleAlertClose = () => {
        this.setState({
            alertBoxShow: false,
            alertBoxMsg: ''
        })
    }

    _renderFilter = () => {
        var clientArr = [];
        this.state.clientsData.map((item)=>{
            clientArr.push((
                <MenuItem value={item._id} primaryText={item.client_name} fullWidth={true} />
            ))
        })

        var techArr = [];
        this.state.techsData.map((item)=>{
            techArr.push((
                <MenuItem value={item._id} primaryText={item.technology_name} fullWidth={true} />
            ))
        })

        return (
                <div className="row">
                    <div className="col-md-4">
                        <SelectField
                            value={this.state.filter.selectedClientId}
                            onChange={(event, index, value)=> { this._filterChange('selectedClientId', value) }}
                            >
                                <MenuItem value={''} primaryText={'Select Client'} fullWidth={true} />
                                {clientArr}
                        </SelectField>
                    </div>
                    <div className="col-md-6">
                        <SelectField
                            value={this.state.filter.selectedTechId}
                            onChange={(event, index, value)=> { this._filterChange('selectedTechId', value) }}
                            >
                                <MenuItem value={''} primaryText={'Select Technology'} fullWidth={true} />
                                {techArr}
                        </SelectField>
                    </div>
                </div>
        )
    }

    _ansInfoModal = () => {
        var ansArr = [];
        this.state.selectedQueInfo.answers.map((item, index)=>{
            ansArr.push((
                <Card style={{marginBottom:20}}>
                    <div style={{padding:20}}>{item.answer}</div>
                </Card>
            ))
        })
        return (
            <Dialog
            title=""
            modal={false}
            open={this.state.ansModal}
            onRequestClose={()=>{  }}
            autoScrollBodyContent = {true}
            >
                <div style={{position:'absolute', top:20, right:20, cursor:'pointer'}} onClick={()=>{ this._toggleModal('ansModal', false) }}>
                    <i className="fas fa-times"></i>
                </div>
                <h3>{this.state.selectedQueInfo.question}</h3>
                {ansArr}
            </Dialog>
        )
    }

    _setAddAnsModal = (item) => {
        this.setState({
            addAnsData: {
                question_id: item._id,
                question: item.question,
                answer: ''
            }
        }, ()=>{
            this._toggleModal('addAnsModal', true)
        })
    }

    _addAnsModal = () => {
        return (
            <Dialog
            title="Add Answer"
            modal={false}
            open={this.state.addAnsModal}
            onRequestClose={()=>{  }}
            autoScrollBodyContent = {true}
            >
                <div style={{position:'absolute', top:20, right:20, cursor:'pointer'}} onClick={()=>{ this._toggleModal('addAnsModal', false) }}>
                    <i className="fas fa-times"></i>
                </div>
                <h4>{ this.state.addAnsData.question }</h4>
                <div className="row">
                    <div className="col-md-12">
                        <TextField
                            hintText="Answer"
                            errorText={''}
                            floatingLabelText="Enter Your Answer"
                            value={this.state.addAnsData.answer}
                            fullWidth={true}
                            multiLine={true}
                            rows={4}
                            onChange={(event)=> {
                                var newData= { ...this.state.addAnsData, answer: event.target.value };
                                this.setState({
                                    addAnsData: newData
                                })
                             } }
                        />
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-12">
                        <RaisedButton label="Save Answer" primary={true} onClick={()=>{ this._saveAnswer() }} />
                    </div>
                </div>
            </Dialog>
        )
    }

    _saveAnswer = () => {
        var dataToSend = {
            question_id: this.state.addAnsData.question_id,
            answer: this.state.addAnsData.answer
        }
        API.ans_save(this._answerSaveCallback, dataToSend);
    }

    _answerSaveCallback = {
        success: (result) => {
            console.log('Success', result);
            this._getQueList();
            this.setState({
                addAnsModal: false,
                addAnsData: {
                    questionId: '',
                    question: '',
                    answer: ''
                },
                alertBoxShow: true,
                alertBoxMsg: result
            })
        },
        error: (error) => {
            console.log('Error', error);
            this.setState({
                addAnsModal: false,
                addAnsData: {
                    questionId: '',
                    question: '',
                    answer: ''
                },
                alertBoxShow: true,
                alertBoxMsg: error
            })
        }
    }

    render(){
        return (
            <div className="appBody">
                <Header />
                <Sidebar />
                <BreadCrumb title={'Questions'}/>
                <div className="appInnerBody">
                    <div style={{textAlign:'right', marginBottom:20}}>
                        <RaisedButton label="New Questions" onClick={()=>{ this._toggleModal('newQueModal', true) }} />
                    </div>
                    {this._renderFilter()}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn style={{width:'70%'}}>Questions</TableHeaderColumn>
                                <TableHeaderColumn>Add</TableHeaderColumn>
                                <TableHeaderColumn>Edit</TableHeaderColumn>
                                <TableHeaderColumn>View</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this._renderList()}
                        </TableBody>
                    </Table>
                    {this._newQueModal()}
                    {this._ansInfoModal()}
                    {this._addAnsModal()}
                </div>
                <Snackbar
                open={this.state.alertBoxShow}
                message={this.state.alertBoxMsg}
                onRequestClose={this._handleAlertClose}
                />
            </div>
        )
    }
}

export default Questions;