import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../redux/actionAuthCreator';

const mapDispatchToProps=()=>dispacth=>{
    return{
        logout: ()=>dispacth(logout())
    }
}

class Logout extends Component{
    componentDidMount(){
        this.props.logout();
    }
    render(){
        return(
            <div><Redirect to="/" /></div>
        );
    }
}

export default connect(null, mapDispatchToProps) (Logout);
