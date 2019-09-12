import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {sendCartToTransaction } from '../redux/actions'
import Header from '../components/header';
import Footer from '../components/footer';

class ConfirmOrder extends Component {
    state = {
        link: '', 
        loadingProcess: false
    }

    componentDidMount() {

        if (this.props.role) {
            window.scrollTo(0, 0);
            document.getElementById('Header').classList.add('bg-light')
            document.getElementById('CollapseMaCommerce').classList.remove('link-white')
        }
    }

    sendDataCartToTransaction = () => {
        let obj = []
        // make callback function for make loadingProcess true
        // make promise to make action creator run first then our setState to move page automatically
        this.setState({loadingProcess: true} , () => {

            // forEach is a syncronous, which means the code will run until forEach process completed
            this.props.cartUser.forEach((val, id) => {
                obj.push(val)
            })

             this.props.sendCartToTransaction(obj)
            
            
        })

        this.setState({
            loadingProcess: false,
            link: 'GoToTransaction'
        })

       
    }

    renderOrderConfirmation = () => {
        if (this.props.cartUser) {
            // Kalo cart tidak kosong
           if(this.props.cartUser.length !== 0) {
               return this.props.cartUser.map((val, id) => {
                   return (
                       <tr key={id}>
                           <td>{val.productName}</td>
                           <td>
                               {val.small !== 0 ? `S` : null}
                               {val.medium !== 0 ? ` M` : null}
                               {val.large !== 0 ? ` L` : null}
                               {val.xlarge !== 0 ? ` XL` : null}
                           </td>
                           <td>
                               {val.small !== 0 ? `Size S: ${val.small}` : null}
                               {val.medium !== 0 ? ` Size M: ${val.medium}` : null}
                               {val.large !== 0 ? ` Size L: ${val.large}` : null}
                               {val.xlarge !== 0 ? ` Size XL: ${val.xlarge}` : null}
                           </td>
                           <td>
                               {val.total_price}
                           </td>
                       </tr>
                   )
               })
           } else {
               return <Redirect to='/' />
           }
        }

        return (
            <tr>
                <td colSpan='6'>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </td>
            </tr>
        )

    }
    render() {
        if (this.state.link === 'GoToTransaction'){
            return <Redirect to='/' />
        }
        if (this.props.loading) {
            return (
                <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        } 
            return (
                <div>
                    <Header statusPage='orderConfirm' />
                    {
                        this.props.auth ?

                            this.props.role === 'User' || this.props.role === 'Admin' ?
                                <div className='container py-3'>
                                    <div className='row py-3'>
                                        <div className="offset-2 col-8 py-3">
                                            <div className='py-3 text-center'>
                                                <h4>Order Confirmation for user: {this.props.username}</h4>
                                            </div>
                                            <div className="card px-3">
                                                <div className="card-body">
                                                    <h5 className="card-title mb-3"></h5>
                                                    <table class="table">
                                                        <thead class="thead-dark">
                                                            <tr>
                                                                <th scope="col">Product Name</th>
                                                                <th scope="col">Size</th>
                                                                <th scope='col'>Total Qty</th>
                                                                <th scope='col'>Total Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.renderOrderConfirmation()}
                                                        </tbody>
                                                    </table>
                                                    <Link to='/cart' className='btn btn-warning mr-3'>
                                                        Back to Cart
                                                    </Link>
                                                    {
                                                        this.state.loadingProcess ? 
                                                        <button className=' btn btn-success'>
                                                                <div className="spinner-border" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                        </button>
                                                           
                                                        :
                                                            <Link className='btn btn-success' onClick={() => {
                                                                this.sendDataCartToTransaction()
                                                            }}>
                                                                Proceed to Payment Product
                                                        </Link>
                                                    }
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <Redirect to='/' />
                            :
                            null
                    }
                    <Footer />
                </div>
            )
    }
}

const mapStateToProps = ({cart , register}) => {
    return {
        cartUser: cart.cart,
        role: register.role,
        loading: register.loading,
        auth: register.authChecked,
        username: register.username
    }
}

export default connect(mapStateToProps, {
    sendCartToTransaction
})(ConfirmOrder)