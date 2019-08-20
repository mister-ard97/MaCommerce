import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Carousel from '../components/carousel';
import PopularProduct from '../components/popularproduct';
import { checkBg } from '../helpers/stylefunction';


class Home extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        checkBg('LoginPage', 'bg-light');
        checkBg('RegisterPage', 'bg-light');
    }

    render() {
        return (
            <div>
                <Header status='Home'/>
                <Carousel />
                <PopularProduct categoryParent={'Men'} />
                <PopularProduct categoryParent={'Girls'} />
                <PopularProduct categoryParent={'Kids'} />
                <Footer />
            </div>
        )
    }
}

export default Home;