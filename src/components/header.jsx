import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogOut, adminGetCategoryProduct } from '../redux/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    state = {
        isOpen: false,
        login: false,
        loadingLogin: '',
        logOut: false
    }

    componentDidMount() {
        if(this.props.statusPage !== 'Home') {
            document.getElementById('Header').classList.add('bg-light')
            document.getElementById('CollapseMaCommerce').classList.remove('link-white')
            document.getElementById('CollapseMaCommerce').classList.add('link-dark')
        }
        window.addEventListener('scroll', this.navbarBgChangeWhenScroll);
        this.props.adminGetCategoryProduct();
    }

    navbarBgChangeWhenScroll = () => {
        if(document.getElementById('Header')) {
            if (this.props.statusPage === 'Home') {
                if (window.scrollY >= 10) {
                    document.getElementById('Header').classList.add('bg-light')
                    document.getElementById('CollapseMaCommerce').classList.remove('link-white')
                    document.getElementById('CollapseMaCommerce').classList.add('link-dark')
                } else {
                    document.getElementById('Header').classList.remove('bg-light')
                    document.getElementById('CollapseMaCommerce').classList.add('link-white')
                }
            } else {
                document.getElementById('Header').classList.add('bg-light')
                document.getElementById('CollapseMaCommerce').classList.remove('link-white')
            }
        } else {
            return null;
        }
    }

    userLogOut = () => {
        this.props.userLogOut()
        this.setState({
            logOut: true
        })
    }

    renderCart = () => {
        if(this.props.cart) {
            if (this.props.cart.length !== 0) {
                return this.props.cart.map((val, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{val.productName}</td>
                            <td>
                                {val.small !== 0 ? `S` : null}
                                {val.medium !== 0 ? ` M` : null}
                                {val.large !== 0 ? ` L` : null}
                                {val.xlarge !== 0 ? ` XL` : null}
                            </td>
                            <td className='d-flex'>
                                {val.small !== 0 ? `Size S: ${val.small}` : null}&nbsp;
                                {val.medium !== 0 ? ` Size M: ${val.medium}` : null}&nbsp;
                                {val.large !== 0 ? ` Size L: ${val.large}` : null}&nbsp;
                                {val.xlarge !== 0 ? ` Size XL: ${val.xlarge}` : null}&nbsp;                                                                                       
                            </td>
                            <td>Rp. {val.total_price}</td>
                        </tr>
                    )
                })
            } else {
                return (
                    <tr>
                        <td colSpan='5' className='text-center'>Data Cart Kosong</td>
                    </tr>
                )
            }
        }
        
    }

    renderCartAccount = (param) => {
        return (
            <div className='navbar-nav-cust d-flex font-weight-normal'>
                <UncontrolledDropdown nav inNavbar className='mr-2'>
                    <DropdownToggle nav caret>
                        <FontAwesomeIcon icon={faShoppingCart} className={param}/> <span>Cart ({this.props.cartCount})</span>
                    </DropdownToggle>
                    <DropdownMenu right={true} className='px-2'>
                        <table border='1'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Product</th>
                                    <th>Size</th>
                                    <th>Qty</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                        </table>
                        <DropdownItem divider />
                        <Link to='/cart' className='btn btn-warning'>Go To Cart Page</Link>
                    </DropdownMenu>
                </UncontrolledDropdown>

               {
                   this.state.loadingLogin ?
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    :
                        <UncontrolledDropdown nav inNavbar>                            
                            {
                                this.props.loading ?

                                <DropdownToggle nav caret >
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                </DropdownToggle>
                                :
                                    <DropdownToggle nav caret>
                                        {
                                            this.props.loginChecked ?
                                                <FontAwesomeIcon icon={faUserCircle} className={param} />
                                                :
                                                <div className='bg-warning font-weight-bold rounded px-1'>
                                                    <span className='text-dark mr-2'>Login</span>
                                                    <FontAwesomeIcon icon={faUserCircle} className={param} />
                                                </div>

                                        }

                                    </DropdownToggle>
                            }
                            <DropdownMenu right={true} className='px-2 userDropdown' id='loginDropdown'>
                                {
                                    this.props.FirstName !== '' ?
                                        
                                        this.props.justRegister ?
                                            <div>
                                                <p>Selamat Bergabung di MaCommerce, {this.props.FirstName}</p>
                                                <Link onClick={this.userLogOut}> Log Out </Link>
                                               
                                            </div>
                                        :
                                            <div>
                                                <p>Selamat Datang Kembali, {this.props.FirstName}</p>
                                                <Link onClick={this.userLogOut}> Log Out </Link>
                                            </div>
                                    :
                                        <div>
                                            <p>Anda belum login silahkan login <Link to='/login'>disini</Link></p>
                                            <p>Anda belum mendaftar? <Link to='/register'>Daftar</Link> Sekarang</p>
                                        </div>
                                }
                            </DropdownMenu>
                        </UncontrolledDropdown>
               }
            </div>
        )
    }


    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        if (this.state.searchLinks) {
            return <Redirect to= {`/searchproduct?${this.state.searchLinks}`} />
        }

        if(this.state.logOut) {
            return <Redirect to={`/`} />
        }

        return (
            <div className='sticky-top'>
                <Navbar id='Header' expand="lg" className='navbar-light font-weight-bold'>
                    <div className='container'>
                        <NavbarToggler onClick={this.toggle} />

                        {/* Untuk Small Device  */}
                        <Link to='/' className='navbar-brand mx-auto justify-content-start d-flex d-lg-none'>
                            <span>Ma</span>Commerce
                        </Link>

                        <Collapse id="CollapseMaCommerce" isOpen={this.state.isOpen} navbar className='link-white'>
                            <Nav className="mr-auto navbar-nav-cust" navbar>
                                <UncontrolledDropdown nav inNavbar className='mr-4'>
                                   
                                        <DropdownToggle nav caret>
                                        <Link to={`/searchproduct?allproduct=true&page=1`}>
                                            All Categories
                                            </Link>
                                        </DropdownToggle>
                                    
                                    
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav inNavbar className='mr-4'>

                                    <DropdownToggle nav caret>
                                        <Link to={`/searchproduct?product=Men&page=1`}>
                                            Men
                                            </Link>
                                    </DropdownToggle>


                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav inNavbar className='mr-4'>

                                    <DropdownToggle nav caret>
                                        <Link to={`/searchproduct?product=Women&page=1`}>
                                            Women
                                            </Link>
                                    </DropdownToggle>


                                </UncontrolledDropdown>
                            </Nav>
                            <div className='container'>
                                <Link to='/' className='ml-5 pl-5 navbar-brand justify-content-start d-none d-lg-flex'>
                                    <span>Ma</span>Commerce
                                </Link>
                            </div>
                            {/* Untuk Large Device */}
                            <Nav navbar className='d-flex'>
                                {this.renderCartAccount('text-black-50')}
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        FirstName: state.register.FirstName,
        justRegister: state.register.justRegister,
        loginChecked: state.register.loginChecked,
        loading: state.register.loading,

        // category
        categoryProduct: state.admin.categoryProduct,
        subCatPro: state.admin.subCategoryProduct,
        loadingAdmin: state.admin.loading,
        error: state.admin.error,

        //cart
        cart: state.cart.cart,
        cartCount: state.cart.cartCount
    }
}

export default connect(mapStateToProps, { adminGetCategoryProduct, userLogOut})(Header)