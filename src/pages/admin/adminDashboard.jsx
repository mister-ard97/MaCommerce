import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { KeepLogin } from '../../redux/actions/'
import SidebarAdmin from '../../components/sidebarAdmin';
import AdminHome from '../admin/adminHome';
import AdminCategoryProduct from './feature/categoryProduct';
import AdminProductList from './feature/productList';
import AdminTransaction from './feature/transactionList';
 
class AdminDashboard extends Component {
    render() {
       if(this.props.role === 'Admin') {
           return (
               <div className='container-fluid p-0'>
                   <div className="row" id="body-row">
                       <div className="col-3 p-0">
                           <SidebarAdmin />
                       </div>
                       <div className="col-9 mt-5 p-0">
                           <Route path={`${this.props.match.url}`} component={AdminHome} exact />
                           <Route path={`${this.props.match.url}/category`} component={AdminCategoryProduct} exact />
                           <Route path={`${this.props.match.url}/productlist`} component={AdminProductList} exact />
                           {/* <Route path={`${this.props.match.url}/transaction`} component={AdminTransaction} exact /> */}
                       </div>
                   </div>
               </div>
           );
       } 

        if (this.props.role === 'User') {
            return <Redirect to='/' />  
        }

        if (localStorage.getItem('token') === null) {
            return <Redirect to='/adminLogin' /> 
        }

       return (
           <div className="spinner-border text-warning" role="status">
               <span className="sr-only">Loading...</span>
           </div>
       )
    }
}

const mapStateToProps = (state) => {
   return {
       loading: state.register.loading,
       role: state.register.role
   }
}

export default connect(mapStateToProps, { KeepLogin })(AdminDashboard);
