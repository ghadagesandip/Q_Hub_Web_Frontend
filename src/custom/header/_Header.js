import React, { Component } from 'react';
import { Popover } from 'material-ui';

import * as globals from '../../lib/globals';


import './style.css';


class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            profileState: false
        }
    }

    componentWillMount(){

    }

    render(){
        return (
            <div>
                <header>
                    <div className="appName">
                        <span>{globals.vars.appName}</span>
                    </div>
                    <div className="profileWrap">
                        <div className="imgWrap">
                            <i className="fas fa-user"></i>
                        </div>
                        <span className="icoWrap">
                            <i className="fas fa-caret-down"></i>
                        </span>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;