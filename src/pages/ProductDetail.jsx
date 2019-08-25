import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import Footer from '../components/footer';
import { checkBg } from '../helpers/stylefunction';

class ProductDetail extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        document.getElementById('Header').classList.add('bg-light')
        document.getElementById('CollapseMaCommerce').classList.remove('link-white')
        checkBg('LoginPage', 'bg-light');
        checkBg('RegisterPage', 'bg-light');
        //checkBg('AdminLoginPage', 'bg-dark');
    }

    render() {
        return (
            <div>
                <Header statusPage='ProductDetail' />
                <div className='container text-center'>
                    <div className='row'>
                        <div className="col-12 mt-5">
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                            <h2>Product Detail</h2>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default connect()(ProductDetail);