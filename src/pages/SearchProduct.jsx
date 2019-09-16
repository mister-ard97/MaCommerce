import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Link , Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import {
    getFilteredProduct,
    getProduct
} from '../redux/actions';

import Header from '../components/header';
import CategoryListUI from '../components/categoryListUi';
import Footer from '../components/footer';

import { URL_API } from '../helpers/Url_API'


class SearchProduct extends Component {
    state = {
        allProduct: false,
        productName: '',
        categoryId: 0,
        subCategoryid: 0,
        productFiltered: false
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.getElementById('Header').classList.add('bg-light')
        document.getElementById('CollapseMaCommerce').classList.remove('link-white')

        let parsedQuery = queryString.parse(this.props.location.search)
        console.log(parsedQuery)
        if (parsedQuery.allproduct) {
            console.log(parsedQuery.allproduct)
            this.props.getProduct(parsedQuery.page);
        } else {
            let objFilteredProductUI = {
                product: parsedQuery.product,
                page: parsedQuery.page,
                categoryId: parsedQuery.categoryId,
                subCategoryId: parsedQuery.subCategoryId,
            }

            console.log(objFilteredProductUI)

            this.props.getFilteredProduct(objFilteredProductUI)
            this.setState({
                productName: objFilteredProductUI.productName,
                categoryId: objFilteredProductUI.categoryId,
                subCategoryid: objFilteredProductUI.subCategoryId,
                productFiltered: true
            })
            
        }
    }
    
    componentWillReceiveProps(newProps){
        // make a comparison to old state.
        if (this.props.location.search !== newProps.location.search) {
            window.scrollTo(0, 0);
            let parsedQuery = queryString.parse(newProps.location.search)
            console.log(newProps.allProduct)
            console.log(parsedQuery)
            if (parsedQuery.allproduct) {
                console.log(parsedQuery.allproduct)
                this.props.getProduct(parsedQuery.page);
               
            } else {
                console.log(parsedQuery.allproduct)
                let objFilteredProductUI = {
                    product: parsedQuery.product,
                    page: parsedQuery.page,
                    categoryId: parsedQuery.categoryId,
                    subCategoryId: parsedQuery.subCategoryId,
                }

                console.log(objFilteredProductUI)

                this.props.getFilteredProduct(objFilteredProductUI)
            }
        }
    }

    renderProductListUI = () => {
        return this.props.productList.map((val, index) => {
            return (
               
                    <Link to={`/productDetail?productId=${val.productId}`} className='col-3 mt-3 removeTagA' key={index}>
                    <div className='card'>
                        <img src={`${URL_API}${val.coverImage}`} className="card-img-top" alt={`${val.coverImage}-${val.productId}`} style={{ height: '250px' }}/>
                        <div className="card-body font-weight-bold p-2">
                            <h5 className="card-title">{
                                val.name.length > 13 ?
                                    val.name.substr(0, 13) + '...'
                                    :
                                    val.name
                            }</h5>
                            <p className="card-text text-danger">Rp. {val.price}</p>
                            <div className='container-fluid'>
                                <div className='row'>

                                </div>
                            </div>
                            <p className="card-text mt-3 popCount">
                                <FontAwesomeIcon icon={faHeart} className='text-danger' /> {val.popularCount}
                            </p>
                        </div>
                    </div>
                    </Link>
            )
        })
    }

    getAllProduct = (page) => {
        this.props.history.push(`searchproduct?allproduct=true&page=${page}`)
    }

    getProductByFilter = (page) => {
        let parsedQuery = queryString.parse(this.props.location.search)
        let objFilteredProductUI = {
            product: parsedQuery.product,
            page
        }

        this.props.history.push(`searchproduct?product=${parsedQuery.product}&page=${page}`)

        console.log(objFilteredProductUI)

        this.props.getFilteredProduct(objFilteredProductUI)
    }

    renderPagination = () => {
        let pageNumbers = []
        if (this.props.total_pages > 0) {
            for (let i = 1; i <= this.props.total_pages; i++) {
                pageNumbers.push(i)
            }
        }

        if (pageNumbers.length > 0) {
            let jsx = pageNumbers.map((number, index) => {
                let activePage = this.props.page === number ? 'active' : '';

                if (number === 1 || number === this.props.total_pages || (number >= this.props.page - 2 && number <= this.props.page + 2)) {
                    return (
                        <li key={index} className={'cursorPointer page-item ' + activePage} onClick={
                            this.props.filteredProduct ?

                                () => this.getProductByFilter(number)
                                :
                                () => this.getAllProduct(number)
                        }><span className="page-link">{number}</span></li>
                    )
                } else {
                    return null
                }
            })
            return jsx
        } else {
            return null
        }
    }

    render() {
        if(this.props.error) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <Header statusPage='searchProduct' />

                        <div className='container d-flex'>
                            <div className='col-9 mt-5'>
                                <div className="card">
                                    <div className="card-body d-flex justify-content-between">

                                        <div className='font-weight-bold'>
                                            {
                                                this.props.allProduct ?
                                                    ` Anda memfilter produk berdasarkan All Product`
                                                    :
                                                    ` Anda memfilter produk berdasarkan Product ${this.props.filteredProduct}`
                                            }
                                        </div>
                                        <div className=''>
                                            {this.props.page} of {this.props.total_pages}
                                            {
                                                this.props.total_pages > 1 ?
                                                    `pages`
                                                    :
                                                    `page`
                                            }
                                        </div>
                                       
                                    </div>
                                </div>
                                <div className='row'>
                                    {this.renderProductListUI()}
                                </div>
                                <div className='text-center'>
                            {
                                this.props.total_pages === 0 ?
                                    null
                                    :
                                    <ul className="d-flex justify-content-center pagination mt-3">
                                        {
                                            this.props.page === 1 ?
                                                <li className="page-item disabled">
                                                    <span className="page-link">&laquo;</span>
                                                </li>
                                                :
                                                <li className="page-item cursorPointer">
                                                    <span className="page-link" onClick={
                                                        this.props.filteredProduct ?
                                                            () => this.getProductByFilter(1)
                                                            :
                                                            () => this.getAllProduct(1)
                                                    }>&laquo; First</span>
                                                </li>
                                        }
                                        {this.renderPagination()}
                                        {
                                            this.props.page === this.props.total_pages ?
                                                <li className="page-item disabled">
                                                    <span className="page-link">&raquo;</span>
                                                </li>
                                                :
                                                <li className="page-item cursorPointer">
                                                    <span className="page-link" onClick={
                                                        this.props.filteredProduct ?
                                                            () => this.getProductByFilter(this.props.total_pages)
                                                            :
                                                            () => this.getAllProduct(this.props.total_pages)
                                                    }>Last &raquo;</span>
                                                </li>
                                        }

                                    </ul>
                            }
                                </div>
                            </div>
                            <div className='col-3 mt-5'>
                                {
                                    this.props.allProduct ?
                                        <CategoryListUI  />
                                        :
                                        <CategoryListUI categoryName={this.props.filteredProduct}/>
                                }
                            </div>
                        </div>
                <Footer />
            </div>
           
        )
    }
}

const mapStateToProps = ({admin}) => {
    return {
        loading: admin.loading,
        page: admin.page,
        total_pages: admin.total_pages,
        total_product: admin.total_product,
        productList: admin.productList,
        allProduct: admin.allProduct,
        filteredProduct: admin.filteredProduct,
        success: admin.success,
        error: admin.error
    }
}

export default connect(mapStateToProps, {
    getFilteredProduct,
    getProduct
})(SearchProduct);