import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import Footer from '../components/footer';
import Carousel from '../components/carousel';
import PopularProduct from '../components/popularproduct';
import { checkBg } from '../helpers/stylefunction';

class Home extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        checkBg('LoginPage', 'bg-light');
        checkBg('RegisterPage', 'bg-light');
        checkBg('AdminLoginPage', 'bg-dark');
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
                            <PopularProduct categoryParent={'Men'} />
                            <PopularProduct categoryParent={'Girls'} />
                            <PopularProduct categoryParent={'Kids'} />
                    </div>

                }

                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.register.loading,
        username: state.register.username,
        FirstName: state.register.FirstName
    }
}

export default connect(mapStateToProps)(Home);