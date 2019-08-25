import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'; 
import { userLogOut } from '../redux/actions';

class SideBarAdmin extends Component {
    
    LogOutAdmin = () => {
        this.props.userLogOut()
    }
    render() {
        if(localStorage.getItem('token') !== null) {
            return (

                    <div id="sidebar-container" className="sidebar-expanded d-md-block">
                        <ul className="list-group">
                            <li className="list-group-item sidebar-separator-title text-light d-block align-items-center">
                                <small>Hai, Welcome</small>
                                {
                                    this.props.loading ?
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    :
                                     <div>
                                            <p className="text-info my-3">{this.props.FirstName + ' ' + this.props.LastName}</p>
                                            <p className="text-info my-3">{this.props.role}</p>
                                     </div>
                                }
                                <button type="button" className="btn btn-danger" onClick={this.LogOutAdmin}>Logout &raquo;</button>
                            </li>
                            
                            <Link to="/adminDashboard/category" class="list-group-item list-group-item-action bg-light text-dark">
                                <span><i class="mr-2"></i> Category Product </span>
                            </Link>

                        </ul>
                    </div>
            );
        }

        return <Redirect to='/adminLogin' />
    }
}

const mapStateToProps = (state) => {
    return {
        FirstName: state.register.FirstName,
        LastName: state.register.LastName,
        role: state.register.role,
        loading: state.register.loading
    }
}

export default connect(mapStateToProps, { userLogOut })(SideBarAdmin);