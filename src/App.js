import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
 
class App extends Component {
  componentDidMount() {
    
  }
  render() {
    return (
        <div>
          <Route path='/' component={Home} exact />
          <Route path='/productDetail' component={ProductDetail} />
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
        </div>
    )
  }
} 

export default App;
