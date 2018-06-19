import React, { Component } from 'react';
import './style.css';

class BreadCrumb extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentWillMount(){

    }

    render(){
        return (
            <div className="appBreadcrumb">
                <div className="wrap1">
                    <span>{this.props.title}</span>
                </div>
                <div className="wrap2">
                    <i className="fas fa-tachometer-alt"></i>
                    &nbsp;&nbsp;
                    <span>Home</span>
                    &nbsp;&nbsp;
                    <i className="fas fa-angle-right"></i>
                    &nbsp;&nbsp;
                    <span>{this.props.title}</span>
                </div>
            </div>
        )
    }
}

export default BreadCrumb;