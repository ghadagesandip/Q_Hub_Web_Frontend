import React, { Component } from 'react';
import './style.css';

import { API } from '../../../src/lib/api';
import Register from './_Register';

import {
    RaisedButton,
    Dialog,
    TextField,
    Snackbar
} from 'material-ui';


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            alertBoxShow: false,
            alertBoxMsg: '',
            modalState: false
        }
    }

    componentWillMount(){

    }

    _propSet = (flag, event) => {
        this.setState({
            [flag]:event.target.value
        });
    }

    _login = () => {
        if(this.state.username == ""){
            alert('Please select username');
        }
        else if(this.state.password==""){
            alert('Please select password');
        }
        else{
            var dataToSend = {
                email: this.state.username,
                password: this.state.password
            }
            API.login(this._loginCallback, dataToSend);
        }
    }

    _loginCallback = {
        success: (result) => {
            console.log('Login Result', result);
            this.setState({
                alertBoxShow: true,
                alertBoxMsg: result.msg
            }, ()=>{
                this.props.history.push('/dashboard');
            })
        },
        error: (error) => {
            console.log('Login Error', error);
            this.setState({
                alertBoxShow: true,
                alertBoxMsg: error.data
            })
        }
    }

    _handleAlertClose = () => {
        this.setState({
            alertBoxShow: false,
            alertBoxMsg: ''
        })
    }

    _toggleModal = (state) => {
        this.setState({
            modalState: state
        })
    }

    render(){

        return(
            <div className="wrapParent">
                <div className="wrap">
                    <p className="head">Sign In</p>
                    <div className="inputWrap">
                        <input type="text" value={this.state.username} placeholder="Username" onChange={(event)=> { this._propSet('username', event) } } />
                    </div>
                    <div className="inputWrap">
                        <input type="password" value={this.state.password} placeholder="Password" onChange={(event)=>{ this._propSet('password', event) }}/>
                    </div>
                    <button onClick={()=>{ this._login() }}>Sign In</button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={()=>{ this._toggleModal(true) }}>Register</button>
                </div>
                <Snackbar
                    open={this.state.alertBoxShow}
                    message={this.state.alertBoxMsg}
                    onRequestClose={this._handleAlertClose}
                    />
                <Register show={this.state.modalState} callback={this._toggleModal} />
            </div>
        )
    }
}

export default Home;