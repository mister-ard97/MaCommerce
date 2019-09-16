import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import Footer from '../components/footer';
import Carousel from '../components/carousel';
import PopularProduct from '../components/popularproduct';
import { checkBg } from '../helpers/stylefunction';
import {showCart} from '../redux/actions'

class Home extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        checkBg('LoginPage', 'bg-light');
        checkBg('RegisterPage', 'bg-light');
        checkBg('AdminLoginPage', 'bg-dark');
        this.props.showCart()
    }

    render() {
        return (
            <div>
                {
                    this.props.username !== '' ?
                        <Header statusPage='UserLogin' />
                        : 
                        null
                }

                {
                    this.props.username === '' ?
                    <Header statusPage='Home' />
                    :
                    null
                }
               
                {
                    this.props.loading ? 
                       <div className='container-fluid'>
                           <div className="row">
                               <div className="col-12 text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                               </div>
                           </div>
                       </div>
                    :
                    <div>
                            <Carousel />
                            <PopularProduct />
                    </div>

                }

                <Footer />
            </div>
        )
    }
}

const mapStateToProps = ({register, admin}) => {
    return {
        loading: register.loading,
        username: register.username,
        FirstName: register.FirstName,
        role: register.role,
    }
}

export default connect(mapStateToProps, {showCart})(Home);