import React , { Component } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class PopularProduct extends Component {

    renderPopularProduct = () => {
        let dataCart = [
            {
                id: 1,
                url: '/productDetail?name=T-Shirt1',
                altImg: 'T-shirt1',
                imgLink: 'http://www.empire-leshop.com/boutique_us/images_produits/stussy_stocktee_rust_1-z.jpg',
                productTitle: 'T-Shirt Orange',
                productPrice: 50000,
                categoryProduct: [
                    {
                        id: 1,
                        caterogyProductName: 'Pria'
                    },
                    {
                        id: 2,
                        caterogyProductName: 'T-Shirt'
                    }
                ],
                popularProductCount: 10
            }, 
            {
                id: 2,
                url: '/productDetail?name=Jacket2',
                altImg: 'Jacket2',
                imgLink: 'https://image.shutterstock.com/image-photo/blank-jacket-bomber-black-color-260nw-1028756722.jpg',
                productTitle: 'Black Jacket',
                productPrice: 150000,
                categoryProduct: [
                    {
                        id: 1,
                        caterogyProductName: 'Pria'
                    },
                    {
                        id: 2,
                        caterogyProductName: 'Jaket'
                    },
                    {
                        id: 3,
                        caterogyProductName: 'Bomber'
                    }
                ],
                popularProductCount: 15
            },
            {
                id: 3,
                url: '/productDetail?name=T-Shirt3',
                altImg: 'T-shirt3',
                imgLink: 'http://www.empire-leshop.com/boutique_us/images_produits/stussy_stocktee_rust_1-z.jpg',
                productTitle: 'T-Shirt Orange',
                productPrice: 50000,
                categoryProduct: [
                    {
                        id: 1,
                        caterogyProductName: 'Pria'
                    },
                    {
                        id: 2,
                        caterogyProductName: 'T-Shirt'
                    }
                ],
                popularProductCount: 10
            },
            {
                id: 4,
                url: '/productDetail?name=Jacket4',
                altImg: 'Jacket4',
                imgLink: 'https://image.shutterstock.com/image-photo/blank-jacket-bomber-black-color-260nw-1028756722.jpg',
                productTitle: 'Black Jacket',
                productPrice: 150000,
                categoryProduct: [
                    {
                        id: 1,
                        caterogyProductName: 'Pria'
                    },
                    {
                        id: 2,
                        caterogyProductName: 'Jaket'
                    },
                    {
                        id: 3,
                        caterogyProductName: 'Bomber'
                    }
                ],
                popularProductCount: 15
            },
            {
                id: 5,
                url: '/productDetail?name=T-Shirt5',
                altImg: 'T-shirt5',
                imgLink: 'http://www.empire-leshop.com/boutique_us/images_produits/stussy_stocktee_rust_1-z.jpg',
                productTitle: 'T-Shirt Orange',
                productPrice: 50000,
                categoryProduct: [
                    {
                        id: 1,
                        caterogyProductName: 'Pria'
                    },
                    {
                        id: 2,
                        caterogyProductName: 'T-Shirt'
                    }
                ],
                popularProductCount: 10
            },
            {
                id: 6,
                url: '/productDetail?name=Jacket6',
                altImg: 'Jacket6',
                imgLink: 'https://image.shutterstock.com/image-photo/blank-jacket-bomber-black-color-260nw-1028756722.jpg',
                productTitle: 'Black Jacket',
                productPrice: 150000,
                popularProductCount: 15
            }
        ]
        
        let jsx = dataCart.map((val, index) => {
            return (
                <Link to={`${val.url}`} className='card' key={index}>
                    <img src={`${val.imgLink}`} className="card-img-top img-fluid" alt={`${val.altImg}-${val.id}`} />
                    <div className="card-body font-weight-bold p-2">
                        <h5 className="card-title">{val.productTitle + ' - ' + this.props.categoryParent + ' - ' + val.id}</h5>
                        <p className="card-text text-danger">Rp. {val.productPrice}</p>
                        <div className='container-fluid'>
                            <div className='row'>
                                {
                                    val.categoryProduct === undefined ?
                                    null
                                    :
                                        val.categoryProduct.map((val2, index2) => {
                                            return (
                                                <span className='card-text text-warning bg-secondary rounded mt-1 mr-3 px-1 py-1' key={index2}>{val2.caterogyProductName}</span>
                                            )
                                        })
                                }
                            </div>
                        </div>
                        <p className="card-text mt-3">
                            <FontAwesomeIcon icon={faHeart} className='text-danger' /> {val.popularProductCount}
                        </p>
                    </div>
                </Link>
            )
        })

        return jsx;
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
                    Product Populer For {this.props.categoryParent}
                </h2>
                   <Slider {...settings}>
                        {this.renderPopularProduct()}
                    </Slider>
            </div>
        )
    }
}

export default PopularProduct;