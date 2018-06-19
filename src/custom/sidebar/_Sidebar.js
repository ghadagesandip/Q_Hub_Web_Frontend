import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './style.css';

class Sidebar extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeId: 0,
            sideBarArr: [
                { id:0, name:'Dashboard', link: '/dashboard', icon:'fas fa-tachometer-alt' },
                { id:1, name:'Questions', link: '/questions', icon:'fas fa-question-circle' },
                { id:2, name:'Clients', link: '/clients', icon:'fas fa-users' },
                { id:3, name:'Technologies', link: '/technology', icon:'fas fa-laptop' },
                { id:4, name:'Employees', link: '/employee', icon:'fas fa-user-circle' },
                { id:4, name:'Sign Out', link: '/', icon:'fas fa-sign-out-alt' },
            ]
        }
    }

    componentWillMount(){

    }

    render(){
        return (
            <aside>
                <div className="sidebarHead">
                    MAIN NAVIGATION
                </div>
                <ul>
                    {
                        this.state.sideBarArr.map((item, index)=>{
                            var active = '';
                            return (
                                <li className={active} key={index}>
                                    <Link to={item.link}>
                                        <i className={item.icon}></i>
                                        &nbsp;&nbsp;
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </aside>
        )
    }
}

export default Sidebar;