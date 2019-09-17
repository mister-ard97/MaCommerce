import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Slider from 'react-slick';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UncontrolledCollapse, CardBody, Card } from 'reactstrap';

import Header from '../components/header';
import Footer from '../components/footer';
import { checkBg } from '../helpers/stylefunction';
import {
    userAddProduct
} from '../redux/actions'
import { URL_API } from '../helpers/Url_API';
import ModalMaCommerce from '../components/modal';

class ProductDetail extends Component {
    state = {
        modalConfirmation: '', 
        productDetail: null,
        imageProductDetail: null,
        loadingProduct: null,
        stockQty: null,
        stockSelected: '',
        error: ''
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        
        checkBg('LoginPage', 'bg-light');
        checkBg('RegisterPage', 'bg-light');

        let parsedQuery = queryString.parse(this.props.location.search)

        this.setState({loadingProduct: true})
        Axios.get(URL_API + '/productMaCommerce/productDetail/' + parsedQuery.productId)
            .then((res) => {
                this.setState({
                    productDetail: res.data.dataProductDetail,
                    imageProductDetail: res.data.linkImageProduct,
                    loadingProduct: false
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    addedToCart = (productId, productPrice) => {
            window.scrollTo(0, 0)
            // console.log(this.state.stockSelected)
            // console.log(this.state.stockQty)
            // console.log(Number(this.stockProduct.value))
            if (!this.state.stockSelected) {
                console.log(true)
                this.setState({
                    error: 'Harap pilih Size Product yang ingin dibeli'
                })
            } else if (Number(this.stockProduct.value) === 0) {
                console.log(true)
                this.setState({
                    error: 'Harap masukkan jumlah quantity (barang) pada size yang ingin dibeli'
                })
            } else if (Number(this.stockProduct.value) > this.state.stockQty) {
                console.log(true)
                this.setState({
                    error: 'Jangan menginput data stock lebih dari yang tersedia'
                })
            } else {
                let objCart = {
                    productId,
                    price: productPrice,
                    stockSelected: this.state.stockSelected,
                    Qty: Number(this.stockProduct.value)
                }

                this.props.userAddProduct(objCart)
                this.setState({
                    modalConfirmation: true,
                    error: '',
                    stockQty: null,
                    stockSelected: ''
                })
                this.stockProduct.value = ''
            }
    }

    renderCoverProduct = () => {
       if(this.state.productDetail) {
           return this.state.productDetail.map((val, index) => {
                return (
                    <img src={`${URL_API}${val.coverImage}`} alt={'Carousel-' + val.coverImage} className='img-fluid' key={index}/>
                )
           })
       }
    }

    renderImageProduct = () => {
        if(this.state.imageProductDetail) {
            return this.state.imageProductDetail.map((val2, index2) => {
                return <img src={`${URL_API}${val2.imagePath}`} alt={'Carousel-' + val2.imagePath} className='img-fluid' key={index2} />
            })
        }
    }

    renderDetailProduct = () => {
        if(this.state.productDetail) {
            return this.state.productDetail.map((val, index) => {
                return (
                    <div key={index} className='ml-5 col-12 col-md-8 mt-3'>
                        {
                            this.state.error ?
                                <div className='alert alert-danger font-weight-bold'>
                                    {this.state.error}
                                </div>
                                : 
                                null
                        }
                        <h3>{val.name}</h3>
                        <p>
                            <FontAwesomeIcon icon={faHeart} className='text-danger' /> {val.popularCount}
                        </p>
                        <hr />
                        <h4 className='text-danger'>Rp. {val.price}</h4>
                        <hr />
                        <h5>Size Product</h5>
                        <div className='d-flex'>
                            {
                                val.small !== 0 ?
                                    <button className='btn btn-secondary alert alert-info mr-3' onClick={() => this.setState({stockQty: val.small, stockSelected: 'small' })}>S</button>
                                    :
                                    <button className='btn btn-secondary alert alert-info mr-3' disabled>S</button>
                            }
                            {
                                val.medium !== 0 ?
                                    <button className='btn btn-secondary alert alert-info mr-3' onClick={() => this.setState({ stockQty: val.medium, stockSelected: 'medium'})}>M</button>
                                    :
                                    <button className='btn btn-secondary alert alert-info mr-3' disabled>M</button>
                            }
                            {
                                val.large !== 0 ?
                                    <button className='btn btn-secondary alert alert-info mr-3' onClick={() => this.setState({ stockQty: val.large, stockSelected: 'large' })}>L</button>
                                    :
                                    <button className='btn btn-secondary alert alert-info mr-3' disabled>L</button>
                            }
                            {
                                val.xlarge !== 0 ?
                                    <button className='btn btn-secondary alert alert-info mr-3' onClick={() => this.setState({ stockQty: val.xlarge, stockSelected: 'xlarge' })}>XL</button>
                                    :
                                    <button className='btn btn-secondary alert alert-info mr-3' disabled>XL</button>
                            }
                        </div>
                        <hr />
                        <p>Stock Condition: Size: {this.state.stockSelected} {
                            !this.state.stockQty ?
                            null
                            :
                            this.state.stockQty> 9 ?
                                <span className='text-danger'>Available {this.state.stockQty} Stocks</span>
                            :
                                <span className='text-danger'>Available {this.state.stockQty} Stock</span>
                        } </p>

                        <div className='col-6 m-0 p-0'>
                            <input type="number" min='0' max={this.state.stockQty} className='form-control' ref={(stockProduct) => { this.stockProduct = stockProduct} }/>
                        </div>
                        <hr />
                        <button className='alert alert-info' id="togglerDescription" style={{ marginBottom: '1rem' }}>
                            Show Description
                        </button>
                        <UncontrolledCollapse toggler="#togglerDescription">
                            <Card>
                                <CardBody>
                                    {val.description}
                                </CardBody>
                            </Card>
                        </UncontrolledCollapse>
                        <hr />
                        {
                            this.props.username === '' ?
                            <span>Mau Belanja? Login dulu yuuk... <Link to='/login'>Klik disini yah untuk login</Link> </span>
                            :
                            <button className='btn btn-warning' onClick={() => this.addedToCart(val.id, val.price)}>Added To Cart</button>
                        }
                        
                    </div>
                )
            })
        }
    }

    renderModalConfirmation = (params) => {
        if (params) {
            return (
                <ModalMaCommerce
                    idModal='modalConfirmation'
                    className='modal-md'
                    modal={this.state.modalConfirmation}
                    toggle={this.toggle}
                    ModalHeader={'Added To Cart'}
                    ModalBody={
                        'Product telah dimasukkan kedalam Cart'
                    }
                    buttonClickName={'Oke'}
                    colorOnClick="success"
                    onClickModal={() => this.setState({modalConfirmation: false})}
                />
            )
        }
    }

    toggle = () => {
        this.setState({
            modalConfirmation: !this.state.modalConfirmation
        })
    }

    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };

        if(this.props.loading) {
            return (
               <div>
                    <Header statusPage='ProductDetail' />
                        <div className='container'>
                            <div className='row'>
                               <div className="col-12 text-center">
                                    <div className="spinner-border text-warning" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                               </div>
                            </div>
                        </div>
                    <Footer />
               </div>
            )
        }
           
        return (
            <div>
                <Header statusPage='ProductDetail' />
                <div className='container mt-3'>
                    {this.renderModalConfirmation(this.state.modalConfirmation)}
                    <div className='row'>
                        <div className="col-12 col-md-3">
                            <Slider {...settings}>
                                {this.renderCoverProduct()}
                                {this.renderImageProduct()}
                            </Slider>
                        </div>
                        {this.renderDetailProduct()}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}


const mapStateToProps = ({ register }) => {
    return {
        username: register.username,
        loading: register.loading
    }
}

export default connect(mapStateToProps, { userAddProduct })(ProductDetail);