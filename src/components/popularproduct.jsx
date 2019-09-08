import React , { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getAllProductUI
} from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { URL_API } from '../helpers/Url_API'

class PopularProduct extends Component {
    state = {
        productName: '',
        productSelected: []
    }

    componentDidMount() {

        this.props.getAllProductUI(6)
        this.setState({
            productSelected: this.props.productListHome
        })
        
    }



    renderPopularProduct = () => {
        return this.state.productSelected.map((val, index) => {
            return (
                <Link to={`/productDetail?productId=${val.productId}`} className='card' key={index}>
                    <img src={`${URL_API}${val.coverImage}`} className="card-img-top img-fluid" alt={`${val.coverImage}-${val.productId}`} />
                    <div className="card-body font-weight-bold p-2">
                        <h5 className="card-title">{val.name}</h5>
                        <p className="card-text text-danger">Rp. {val.price}</p>
                        <div className='container-fluid'>
                            <div className='row'>
                               
                            </div>
                        </div>
                        <p className="card-text mt-3">
                            <FontAwesomeIcon icon={faHeart} className='text-danger' /> {val.popularCount}
                        </p>
                    </div>
                </Link>
            )
        })

    }
    render() {
        
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll:1,
            
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3
                    }
                }, 
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2
                    }
                }, 
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        };
        return (
            <div className='container pt-5'>
                <h2 className='my-5 pl-2 text-center text-sm-left'>
                    Product Populer Right Now!!
                </h2>
                   <Slider {...settings}>
                        {this.renderPopularProduct()}
                    </Slider>
            </div>
        )
    }
}

const mapStateToProps = ({admin}) => {
    return {
        productListHome: admin.productListHome,
        loading: admin.loading
    }
}

export default connect(mapStateToProps, { getAllProductUI })(PopularProduct);