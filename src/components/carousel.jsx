import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators
} from 'reactstrap';
import { Link } from 'react-router-dom'

const items = [
    {
        id: 1,
        img: 'https://images.pexels.com/photos/374808/pexels-photo-374808.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        altText: 'Slide 1',
        captionHeader: 'Styling with our Products',
        link: 'link ke all product'
    },
    {
        id: 2,
        img: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        altText: 'Slide 2',
        captionHeader: 'All Size T-Shirt for Everyone',
        link: 'link ke T-Shirt Product'
    },
    {
        id: 3,
        img: 'https://images.pexels.com/photos/2601442/pexels-photo-2601442.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        altText: 'Slide 3',
        captionHeader: 'Prepare Your Winter Season!!! ',
        link: 'link ke all jacket product'
    }
];

class CarouselCustom extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    className="custom-items"
                    tag="div"
                    key={item.id}
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                >
                    <img src={item.img} alt={'Carousel-' + item.altText} className='img-fluid' />
                    <div className='carousel-caption text-left pb-0 mb-5 pt-5 pt-sm-0'>
                        <div className='container d-flex justify-content-end opacity-carousel-items'>
                           <div className='col-12 py-3 rounded bg-light px-3'>
                                <h3 className='display-4'>{item.captionHeader}</h3>
                                <p>{item.caption}</p>
                                <Link to={item.link}>
                                    <button className='btn btn-warning'>
                                        Click Here!
                                    </button>
                                </Link>
                           </div>
                       </div>
                    </div>
                </CarouselItem>
            );
        });

        return (
            <div id='Carousel' className='carousel-custom'>
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                    autoPlay={true}
                    ride="carousel"
                >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
            </div>
        );
    }
}

export default CarouselCustom;
