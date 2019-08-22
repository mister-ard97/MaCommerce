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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';

class Header2 extends Component {
    state = {
        isOpen: false,
        login: false,
        loadingLogin: '',
        cart: [
            {
                id: 1,
                nama: 'Sepatu'
            },
            {
                id: 2,
                nama: 'Celana'
            }
        ]
    }

    componentDidMount() {
        window.addEventListener('scroll', this.navbarBgChangeWhenScroll);
    }

    navbarBgChangeWhenScroll = () => {
        if(document.getElementById('Header')) {
            if (this.props.status === 'Home') {
                if (window.scrollY >= 10) {
                    document.getElementById('Header').classList.add('bg-light')
                    document.getElementById('CollapseMaCommerce').classList.remove('link-white')
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

    renderCart = () => {
        return this.state.cart.map((val, id)=>{
            return (
                <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{val.nama}</td>
                </tr>
            )
        })
    }

    renderCartAccount = (param) => {
        return (
            <div className='navbar-nav-cust d-flex font-weight-normal'>
                <UncontrolledDropdown nav inNavbar className='mr-2'>
                    <DropdownToggle nav caret>
                        <FontAwesomeIcon icon={faShoppingCart} className={param}/>
                    </DropdownToggle>
                    <DropdownMenu right={true} className='px-2'>
                        <table border='1'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Product</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                        </table>
                        <DropdownItem divider />
                        <button type='submit'>Go To Cart</button>
                    </DropdownMenu>
                </UncontrolledDropdown>

               {
                   this.state.loadingLogin ?
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    :
                        <UncontrolledDropdown nav inNavbar>

                            <DropdownToggle nav caret>
                                {
                                    this.state.login ?
                                        <FontAwesomeIcon icon={faUserCircle} className={param} />
                                        :
                                        <div className='bg-warning font-weight-bold rounded px-1'>
                                            <span className='text-dark mr-2'>Login</span>
                                            <FontAwesomeIcon icon={faUserCircle} className={param} />
                                        </div>

                                }

                            </DropdownToggle>
                            <DropdownMenu right={true} className='px-2' id='loginDropdown'>
                                {
                                    this.state.login ?
                                        <p>Selamat Datang Reza</p>
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

    CekInputForm = (e) => {

        e.preventDefault();

        var category = document.getElementById('CategoryLg')
        var search = document.getElementById('SearchProductLgHome');

        if (category.options[category.selectedIndex].value !== '' && search.value !== '') {
            alert('Searching = ' + search.value)
            search.value = ''
        } else {
            alert('Error');
            search.value = ''
        }
    }

    CekInputFormSm = (e) => {

        e.preventDefault();

        var category = document.getElementById('CategorySm')
        var search = document.getElementById('SearchProductSmHome');

        if (category.options[category.selectedIndex].value !== '' && search.value !== '') {
            alert('Searching = ' + search.value)
            search.value = ''
        } else {
            alert('Error');
            search.value = ''
        }
    }

    renderFormSearchLgByCategories = () => {
        return (
            <div className='container justify-content-end d-none d-lg-flex d-xl-flex mr-3'>
                <form className='form-row' onSubmit={this.CekInputForm}>

                    <div className="col-6 my-1"> 
                        <Nav navbar className='SearchCategory'>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className='searchIcon'>
                                    <span className='showText'>Search Product </span>
                                    <FontAwesomeIcon icon={faSearch}  />
                                </DropdownToggle>
                                <DropdownMenu right={true} className='px-2'>
                                    <input type="text" className="form-control" placeholder="Product Name" id="SearchProductLgHome" />
                                    <select className="custom-select my-3" id="CategoryLg">
                                        <option value=''>All Categories</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={21} className='text-info'>&nbsp;  Two - 1</option>
                                        <option value={22} className='tex-info'>&nbsp;  Two - 2</option>
                                        <option value={3}>Three</option>
                                        <option value={4}>Four</option>
                                        <option value={5}>Five</option>
                                        <option value={6}>Six</option>
                                    </select>
                                    <DropdownItem divider />
                                    <button type='submit'>Search</button>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </div>
                </form>
            </div>
        )
    }

    renderFormSearchSmByCategories = () => {
        return (
                <form className='form-row' onSubmit={this.CekInputFormSm}>
                    <div className="col-6 input-group my-1">
                            <UncontrolledDropdown nav inNavbar className='SearchCategorySm'>
                                <DropdownToggle nav caret>
                                    <FontAwesomeIcon icon={faSearch} className='text-secondary'/>
                                </DropdownToggle>
                                <DropdownMenu right={true} className='px-2'>
                                    <input type="text" className="form-control" placeholder="Product Name" id="SearchProductSmHome" />
                                    <select className="custom-select my-3" id="CategorySm">
                                        <option value=''>All Categories</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={21} className='text-info'>&nbsp;  Two - 1</option>
                                        <option value={22} className='tex-info'>&nbsp;  Two - 2</option>
                                        <option value={3}>Three</option>
                                        <option value={4}>Four</option>
                                        <option value={5}>Five</option>
                                        <option value={6}>Six</option>
                                    </select>
                                    <DropdownItem divider />
                                    <button type='submit'>Search</button>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                    </div>
                </form>
        )
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className='sticky-top'>
                <Navbar id='Header' expand="lg" className='navbar-light font-weight-bold'>
                    <div className='container'>
                        <NavbarToggler onClick={this.toggle} />

                        {/* Untuk Small Device  */}
                        <Link to='/' className='navbar-brand mx-auto justify-content-start d-flex d-lg-none'>
                            <span>Ma</span>Commerce
                        </Link>
                        <Nav className='d-flex d-lg-none'>
                            {this.renderFormSearchSmByCategories()}
                            <div className='mt-1'>
                                {this.renderCartAccount('text-secondary')}
                            </div>
                        </Nav>

                        <Collapse id="CollapseMaCommerce" isOpen={this.state.isOpen} navbar className='link-white'>
                            <Nav className="mr-auto" navbar>
                                <UncontrolledDropdown nav inNavbar className='mr-4'>
                                    <DropdownToggle nav caret>
                                        All Categories
                                </DropdownToggle>
                                    <DropdownMenu left={1}>
                                        <DropdownItem>
                                            Option 1
                                </DropdownItem>
                                        <DropdownItem>
                                            Option 2
                                </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            Reset
                                </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>

                                <UncontrolledDropdown nav inNavbar className='mr-4'>
                                    <DropdownToggle nav caret>
                                        Men
                                </DropdownToggle>
                                    <DropdownMenu left={1}>
                                        <DropdownItem>
                                            Option 1
                                </DropdownItem>
                                        <DropdownItem>
                                            Option 2
                                </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            Reset
                                </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>

                                <UncontrolledDropdown nav inNavbar className='mr-4'>
                                    <DropdownToggle nav caret>
                                        Girls
                                </DropdownToggle>
                                    <DropdownMenu left={1}>
                                        <DropdownItem>
                                            Option 1
                                </DropdownItem>
                                        <DropdownItem>
                                            Option 2
                                </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            Reset
                                </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>

                                <UncontrolledDropdown nav inNavbar className='mr-4'>
                                    <DropdownToggle nav caret>
                                        Kids
                                </DropdownToggle>
                                    <DropdownMenu left={1}>
                                        <DropdownItem>
                                            Option 1
                                </DropdownItem>
                                        <DropdownItem>
                                            Option 2
                                </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            Reset
                                </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                
                            </Nav>
                            <div className='container'>
                                <Link to='/' className='navbar-brand justify-content-lg-center justify-content-md-center d-none d-lg-flex'>
                                    <span>Ma</span>Commerce
                            </Link>
                            </div>
                            {/* Untuk Large Device */}
                            {this.renderFormSearchLgByCategories()}
                            <Nav navbar className='d-none d-lg-flex'>
                                {this.renderCartAccount('text-black-50')}
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }
}

export default Header2