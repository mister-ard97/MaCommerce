import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { KeepLogin } from '../../redux/actions/'
import SidebarAdmin from '../../components/sidebarAdmin';
import AdminHome from '../admin/adminHome';
import AdminCategoryProduct from './feature/categoryProduct';
 
class AdminDashboard extends Component {
    render() {
       if(localStorage.getItem('token') !== null) {
           return (
               <div className='container-fluid p-0'>
                   <div className="row" id="body-row">
                       <div className="col-3 p-0">
                           <SidebarAdmin />
                       </div>
                       <div className="col-9 mt-5 p-0">
                           <Route path={`${this.props.match.url}`} component={AdminHome} exact />
                           <Route path={`${this.props.match.url}/category`} component={AdminCategoryProduct} exact />
                       </div>
                   </div>
               </div>
           );
       }

     

       return <Redirect to='/' />
    }
}

const mapStateToProps = (state) => {
   return {
       loading: state.register.loading,
       role: state.register.role
   }
}

export default connect(mapStateToProps, { KeepLogin })(AdminDashboard);
