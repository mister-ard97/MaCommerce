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
        cart: [
            {
                id: 1,
                nama: 'Sepatu'
            },
            {
                id: 2,
                nama: 'Celana'
            }
        ],

        categoryProductSelected: null,
        categoryProductNameSelected: '',
        subCategoryProductSelected: null,
        subCategoryProductNameSelected: '',
        searchLinks: '',
        error: ''
    }

    componentDidMount() {
        if(this.props.statusPage === 'UserLogin') {
            document.getElementById('Header').classList.add('bg-light')
            document.getElementById('CollapseMaCommerce').classList.remove('link-white')
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
                            <DropdownMenu right={true} className='px-2' id='loginDropdown'>
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

    CekInputForm = () => {

        let productName = this.filterProductNameUI.value;
        let categoryId = this.state.categoryProductSelected
        let subCategoryId = this.state.subCategoryProductSelected
        let searchQueryFilter = ''

        if (
            productName === '' &&
            isNaN(categoryId) === true &&
            categoryId === null &&
            isNaN(subCategoryId) === true &&
            subCategoryId === null) {
            this.setState({
                error: 'Untuk dapat mem-filter product, tolong isi Product Name atau pilih salah satu dari Category yang tersedia.'
            })
        } else {
           
            searchQueryFilter += `productName=${productName}&`

            searchQueryFilter += `categoryId=${categoryId}&`

            searchQueryFilter += `subCategoryId=${subCategoryId}&`

            searchQueryFilter += `page=1`

            this.setState({
                searchLinks: searchQueryFilter,
                error: ''
            })
        }

        
    }

    // CekInputFormSm = (e) => {

    //     e.preventDefault();

    //     var category = document.getElementById('CategorySm')
    //     var search = document.getElementById('SearchProductSmHome');

    //     if (category.options[category.selectedIndex].value !== '' && search.value !== '') {
    //         alert('Searching = ' + search.value)
    //         search.value = ''
    //     } else {
    //         alert('Error');
    //         search.value = ''
    //     }
    // }

    renderCategoryProductUI = () => {
        return this.props.categoryProduct.map((val, index) =>
            <option
                key={index}
                value={val.id} >
                {val.name}
            </option>
        )
    }

    renderSubCategoryProductUI = (id) => {
        return this.props.subCatPro.map((val, index) => {
            if (val.parentId === id) {
                return (
                    <option
                        key={index}
                        value={parseInt(val.idsubcategory)} >
                        {val.subcategory}
                    </option>
                )
            }
            return null
        })
    }

    selectedCategoryUI = () => {
        let categoryProduct = document.getElementById('categoryProductUI')
        let selectedOptions = categoryProduct.options[categoryProduct.selectedIndex]
        this.setState({
            categoryProductSelected: parseInt(selectedOptions.value),
            categoryProductNameSelected: selectedOptions.innerHTML,
            subCategoryProductSelected: null,
            subCategoryProductNameSelected: '',
        })
    }

    selectedSubCategoryUI = () => {
        let subCategoryProduct = document.getElementById('subCategoryProductUI')
        let selectedOptions = subCategoryProduct.options[subCategoryProduct.selectedIndex]
        this.setState({
            subCategoryProductSelected: parseInt(selectedOptions.value),
            subCategoryProductNameSelected: selectedOptions.innerHTML
        })
    }

    renderFormSearchLgByCategories = () => {
        return (
            <div className='container justify-content-end d-none d-lg-flex d-xl-flex mr-3'>
                <form className='form-row' onSubmit={this.CekInputForm}>

                    <div className="col-6 my-1 offset-1"> 
                  
                        <Nav navbar className='SearchCategory'>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className='searchIcon'>
                                    <span className='showText'>Search Product </span>
                                    <FontAwesomeIcon icon={faSearch}  />
                                </DropdownToggle>
                                <DropdownMenu right={true} className='px-2'>
                                   
                                    <input type='text' className='mb-3 form-control' ref={(filterProductNameUI) => this.filterProductNameUI = filterProductNameUI} name='searchProductName' placeholder='Search By Name' />
                                    
                                    <select id="categoryProductUI" className="form-control mb-3" onChange={this.selectedCategoryUI}>
                                        <option value=''>Select Category</option>
                                        {this.renderCategoryProductUI()}
                                    </select>
                                    
                                    {
                                        this.state.categoryProductSelected !== null ?
                                            <select id="subCategoryProductUI" className="form-control" onChange={this.selectedSubCategoryUI}>
                                                <option value=''>Select Sub Category</option>
                                                {this.renderSubCategoryProductUI(this.state.categoryProductSelected)}
                                            </select>
                                            :
                                            <select id="subCategoryProductUI" className="form-control">
                                                <option value=''>Select Sub Category</option>
                                            </select>
                                    }
                                    <DropdownItem divider />
                                    <button className='btn btn-warning' type='submit'>
                                        Search Product
                                    </button>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </div>
                </form>
            </div>
        )
    }

    // renderFormSearchSmByCategories = () => {
    //     return (
    //             <form className='form-row' onSubmit={this.CekInputFormSm}>
    //                 <div className="col-6 input-group my-1">
    //                         <UncontrolledDropdown nav inNavbar className='SearchCategorySm'>
    //                             <DropdownToggle nav caret>
    //                                 <FontAwesomeIcon icon={faSearch} className='text-secondary'/>
    //                             </DropdownToggle>
    //                             <DropdownMenu right={true} className='px-2'>
    //                                 <input type="text" className="form-control" placeholder="Product Name" id="SearchProductSmHome" />
    //                                 <select className="custom-select my-3" id="CategorySm">
    //                                     <option value=''>All Categories</option>
    //                                     <option value={1}>One</option>
    //                                     <option value={2}>Two</option>
    //                                     <option value={21} className='text-info'>&nbsp;  Two - 1</option>
    //                                     <option value={22} className='tex-info'>&nbsp;  Two - 2</option>
    //                                     <option value={3}>Three</option>
    //                                     <option value={4}>Four</option>
    //                                     <option value={5}>Five</option>
    //                                     <option value={6}>Six</option>
    //                                 </select>
    //                                 <DropdownItem divider />
    //                                 <button type='submit'>Search</button>
    //                             </DropdownMenu>
    //                         </UncontrolledDropdown>
    //                 </div>
    //             </form>
    //     )
    // }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        if (this.state.searchLinks) {
            return <Redirect to= {`/searchproduct?${this.state.searchLinks}`} />
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
                        {/* <Nav className='d-flex d-lg-none'> */}
                            {/* {this.renderFormSearchSmByCategories()} */}
                            {/* <div className='mt-1'> */}
                                {/* {this.renderCartAccount('text-secondary')} */}
                            {/* </div>
                        </Nav> */}

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
                                <Link to='/' className='navbar-brand justify-content-end d-none d-lg-flex'>
                                    <span>Ma</span>Commerce
                                </Link>
                            </div>
                            {/* Untuk Large Device */}
                            {this.renderFormSearchLgByCategories()}
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
    }
}

export default connect(mapStateToProps, { adminGetCategoryProduct, userLogOut})(Header)