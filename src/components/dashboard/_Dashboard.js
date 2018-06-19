import React, { Component } from 'react';
import '../../App.css';

import { Header, Sidebar, BreadCrumb } from '../../custom';

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentWillMount(){

    }

    render(){
        return (
            <div className="appBody">
                <Header />
                <Sidebar />
                <BreadCrumb title={'Dashboard'}/>
            </div>
        )
    }
}

export default Dashboard;