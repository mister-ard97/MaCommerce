import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { KeepLogin, showCart, getAllProductUI } from './redux/actions';
import './App.css';

import Home from './pages/Home';
import SearchProduct from './pages/SearchProduct'
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import ConfirmOrder from './pages/ConfirmOrder';
import Payment from './pages/Payment';
import TransactionList from './pages/TransactionList'
import Login from './pages/Login';
import Register from './pages/Register';
import WaitingVerification from './pages/WaitingVerification';
import Verified from './pages/Verified';

// admin 
import AdminDashboard from './pages/admin/adminDashboard';
import AdminLogin from './pages/admin/adminLogin';
import AdminRegister from './pages/admin/adminRegister';
import AdminWaitingVerification from './pages/admin/adminWaitingVer';
import AdminVerified from './pages/admin/adminVerified';
 
class App extends Component {
  
  componentDidMount() {
    this.props.KeepLogin();
    this.props.showCart();
    this.props.getAllProductUI(6)
  }

  render() {
    return (
        <div>
          <Route path='/' component={Home} exact />
          <Route path='/searchproduct' component={SearchProduct} />
          <Route path='/productDetail' component={ProductDetail} />
          <Route path='/cart' component={Cart} />
          <Route path='/confirm_order' component={ConfirmOrder} />
          <Route path='/payment' component={Payment} />
          <Route path='/transaction_list' component={TransactionList} />
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/waitingverification' component={WaitingVerification} />
          <Route path='/verified' component={Verified} />

          {/* Route Admin */}
          <Route path='/adminDashboard' component={AdminDashboard} />
          <Route path='/adminLogin' component={AdminLogin} exact />
          <Route path='/adminRegister' component={AdminRegister} exact />
          <Route path='/adminWaitingVerification' component={AdminWaitingVerification} exact />
          <Route path='/adminVerified' component={AdminVerified} />
        </div>
    )
  }
} 

export default connect(null, { KeepLogin, showCart, getAllProductUI})(App);
