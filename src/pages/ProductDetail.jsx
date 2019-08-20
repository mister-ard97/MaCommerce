import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { checkBg } from '../helpers/stylefunction';

class ProductDetail extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        document.getElementById('Header').classList.add('bg-light')
        checkBg('LoginPage', 'bg-light');
        checkBg('RegisterPage', 'bg-light');
    }

    render() {
        return (
            <div>
                <Header status='ProductDetail' />
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

export default ProductDetail;