import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { KeepLogin } from './redux/actions';
import './App.css';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import WaitingVerification from './pages/WaitingVerification';
import Verified from './pages/Verified';
 
class App extends Component {
  
  componentDidMount() {
    this.props.KeepLogin();
  }

  render() {
    return (
        <div>
          <Route path='/' component={Home} exact />
          <Route path='/productDetail' component={ProductDetail} />
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/waitingverification' component={WaitingVerification} />
          <Route path='/verified' component={Verified} />
        </div>
    )
  }
} 

export default connect(null, { KeepLogin })(App);
