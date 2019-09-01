import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CustomInput } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { adminAddProduct } from '../../../redux/actions';
import ModalMaCommerce from '../../../components/modal';
import { URL_API } from '../../../helpers/Url_API';

class ProductList extends Component {
    state = {
        modalAddProduct: false,

        categoryProductSelectedInProduct: null,
        categoryProductNameSelectedInProduct: '',
        subCategoryProductSelectedInProduct: null,
        subCategoryProductNameSelectedInProduct: '',

        productCoverImageFile: `${URL_API}/defaultPhoto/defaultCategory.png`,
        productImage1File: `${URL_API}/defaultPhoto/defaultCategory.png`,
        productImage2File: `${URL_API}/defaultPhoto/defaultCategory.png`,

        productCoverImageName: `Select Cover Image`,
        productImage1Name: `Select Product Image`,
        productImage2Name: `Select Product Image`,

        productCoverImageDB: undefined,
        productImage1DB: undefined,
        productImage2DB: undefined,

        errorStateProduct: '',
        successStateProduct: '',

    }

    backToTopModal = (params, params2) => {
       if(params) {
           if (document.getElementById('modalHeader')) {
               document.getElementById('modalHeader').scrollIntoView(true)
           } else {
               return null
           }
       }

       if(params2) {
           this.setState({
               successStateProduct: 'Product berhasil ditambahkan',
               modalAddProduct: !this.state.modalAddProduct
           })
       }
       return null
    }

    productImageCoverChange = (e) => {
        if(e.target.files[0]) {
            this.setState({
                productCoverImageFile: URL.createObjectURL(e.target.files[0]),
                productCoverImageName: e.target.files[0].name,
                productCoverImageDB: e.target.files[0]
            })
        } else {
            this.setState({
                productCoverImageFile: `${URL_API}/defaultPhoto/defaultCategory.png`,
                productCoverImageName: `Select Cover Image`,
                productCoverImageDB: undefined
            })
        }
    }

    productImage1Change = (e) => {
        if(e.target.files[0]) {
            this.setState({
                productImage1File: URL.createObjectURL(e.target.files[0]),
                productImage1Name: e.target.files[0].name,
                productImage1DB: e.target.files[0]
            })
        } else {
            this.setState({
                productImage1File: `${URL_API}/defaultPhoto/defaultCategory.png`,
                productImage1Name: `Select Product Image`,
                productImage1DB: undefined
            })
        }
    }

    productImage2Change = (e) => {
        if (e.target.files[0]) {
            this.setState({
                productImage2File: URL.createObjectURL(e.target.files[0]),
                productImage2Name: e.target.files[0].name,
                productImage2DB: e.target.files[0]
            })
        } else {
            this.setState({
                productImage2File: `${URL_API}/defaultPhoto/defaultCategory.png`,
                productImage2Name: `Select Product Image`,
                productImage2DB: undefined
            })
        }
    }

    selectedCategoryInProduct = () => {
        let categoryProduct = document.getElementById('categoryInProduct')
        let selectedOptions = categoryProduct.options[categoryProduct.selectedIndex]
        this.setState({
            categoryProductSelectedInProduct: parseInt(selectedOptions.value),
            categoryProductNameSelectedInProduct: selectedOptions.innerHTML,
            subCategoryProductNameSelectedInProduct: '',
            subCategoryProductSelectedInProduct: null
        })
    }

    selectedSubCategoryInProduct = () => {
        let subCategoryProduct = document.getElementById('subCategoryInProduct')
        let selectedOptions = subCategoryProduct.options[subCategoryProduct.selectedIndex]
        this.setState({
            subCategoryProductSelectedInProduct: parseInt(selectedOptions.value),
            subCategoryProductNameSelectedInProduct: selectedOptions.innerHTML
        })
    }

    renderCategoryProduct = () => {

        return this.props.categoryProduct.map((val, index) =>
            <option
                key={index}
                value={val.id} >
                {val.name}
            </option>
        )
    }

    renderSubCategoryProduct = (id) => {
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

    checkInput = (e) => {
        if (e.keyCode === 189) {
            e.preventDefault();
        }
    }

    handleAddProduct = (e) => {
        e.preventDefault();
        
        let objAddProduct = {
            productName: this.ProductName.value,
            productCategory: this.state.categoryProductSelectedInProduct,
            productSubCategory: this.state.subCategoryProductSelectedInProduct,
            sizeS: parseInt(this.SizeS.value),
            sizeM: parseInt(this.SizeM.value),
            sizeL: parseInt(this.SizeL.value),
            sizeXL: parseInt(this.SizeXL.value),
            productPrice: parseInt(this.ProductPrice.value),
            productDescription: this.DescriptionProduct.value,
            productCoverImageDB: this.state.productCoverImageDB,
            productImage1DB: this.state.productImage1DB,
            productImage2DB: this.state.productImage2DB,
            categoryName: this.state.categoryProductNameSelectedInProduct,
            subCategoryName: this.state.subCategoryProductNameSelectedInProduct
        }

        console.log(objAddProduct)

        this.props.adminAddProduct(objAddProduct)
    }

    renderModalAddProduct = (params) => {
        if(params) {
            return (
                <ModalMaCommerce 
                    idModal='modalProduct'
                    className='modal-lg'
                    modal={this.state.modalAddProduct}
                    toggle={this.toggle}
                    succesMessage={this.props.success}
                    errorMessage={this.props.error}
                    ModalHeader={'Add New Product'}
                    ModalBody={
                       this.renderFormAddProduct()
                    }
                    loading={this.props.loading}
                    buttonClickName={'Add New Product'}
                    colorOnClick="success"
                    onClickModal={this.handleAddProduct}
                    cancelButton="Cancel"
                />
            )
        }
    }

    renderFormAddProduct = () => {
        return (
            <form onSubmit={this.handleAddProduct} id='formAddProduct'>
                {this.backToTopModal(this.props.error, this.props.success)}
                <h4 className='text-info'>Product Image</h4>
                <div className='d-flex font-weight-bold mb-3 addNewProduct'>
                    <div>
                        <p>Product Cover Image</p>
                        <img src={`${this.state.productCoverImageFile}`}
                            className='userImage rounded'
                            alt='cover_product'
                        />
                        <CustomInput 
                        id='addc_p' 
                        type='file' 
                        label={`${this.state.productCoverImageName}`} 
                        className='mt-3' 
                        onChange={this.productImageCoverChange}
                        /> 
                    </div>   
                    <div>
                        <p>Product Image 1</p>
                        <img src={`${this.state.productImage1File}`}
                            className='userImage rounded'
                            alt='cover_product'
                        />
                        <CustomInput 
                            id='add_pi1' 
                            type='file' 
                            label={`${this.state.productImage1Name}`} 
                            className='mt-3' 
                            onChange={this.productImage1Change}
                        />
                    </div>   
                    <div>
                        <p>Product Image 2</p>
                        <img src={`${this.state.productImage2File}`}
                            className='userImage rounded'
                            alt='cover_product'
                        />
                        <CustomInput 
                            id='add_pi2' 
                            type='file' 
                            label={`${this.state.productImage2Name}`} 
                            className='mt-3' 
                            onChange={this.productImage2Change}
                        />
                    </div>          
                </div>
                <hr/>
                <div className='container'>
                   <div className="row">
                        <div className="col-10 offset-1 font-weight-bold">
                            <h4 className='text-info'>Product Detail</h4>
                            <p>Product Name</p>
                            <input ref={(ProductName) => { this.ProductName = ProductName }} type="text" className="form-control" placeholder="Product Name" />

                            <div className="form-row my-3">
                                <div className="col">
                                    <label>Category Parent</label>
                                    <select id="categoryInProduct" className="form-control mb-3" onChange={this.selectedCategoryInProduct}>
                                        <option value=''>Select Category</option>
                                        {this.renderCategoryProduct()}
                                    </select>
                                </div>
                                <div className="col">
                                    <label>Sub Category</label>
                                    {
                                        isNaN(this.state.categoryProductSelectedInProduct) === true ||
                                            this.state.categoryProductSelectedInProduct === null ?
      
                                        <select id="subCategoryInProduct" className="form-control">
                                            <option value=''>Select Sub Category</option>
                                        </select>

                                        : 
                                            <select id="subCategoryInProduct" className="form-control" onChange={this.selectedSubCategoryInProduct}>
                                                <option value=''>Select Sub Category</option>
                                                {this.renderSubCategoryProduct(this.state.categoryProductSelectedInProduct)}
                                            </select>
                                       
                                    }
                                </div>
                            </div>

                            <h4 className='text-info'>Stock Product</h4>
                            <div className='form-row mb-3'>
                                <div className="col">
                                    <label>Size S</label>
                                    <input type='number' ref={(SizeS) => { this.SizeS = SizeS }} min="0" className='form-control' onKeyDown={(e) => this.checkInput(e)} placeholder='Size S' />
                                </div>
                                <div className="col">
                                    <label>Size M</label>
                                    <input type='number' ref={(SizeM) => { this.SizeM = SizeM }} min="0" className='form-control' onKeyDown={(e) => this.checkInput(e)} placeholder='Size M' />
                                </div>
                                <div className="col">
                                    <label>Size L</label>
                                    <input type='number' ref={(SizeL) => { this.SizeL = SizeL }} min="0" className='form-control' onKeyDown={(e) => this.checkInput(e)} placeholder='Size L' />
                                </div>
                                <div className="col">
                                    <label>Size XL</label>
                                    <input type='number' ref={(SizeXL) => { this.SizeXL = SizeXL }} min="0" className='form-control' onKeyDown={(e) => this.checkInput(e)} placeholder='Size L' />
                                </div>
                            </div>
                            <label>Price</label>
                            <input type='number' ref={(ProductPrice) => { this.ProductPrice = ProductPrice }} min="0" className='form-control text-right mb-3' onKeyDown={(e) => this.checkInput(e)} placeholder='Product Price'/>
                            <label>Product Description</label>
                            <textarea ref={(DescriptionProduct) => this.DescriptionProduct = DescriptionProduct} placeholder='Product Description' className='form-control'></textarea>
                       </div>
                   </div>
                   <button type='submit' hidden className='align-items-end'></button>
                </div>
            </form>
        )
    }

    toggle = () => {
        if(this.state.modalAddProduct) {
            this.setState({
                modalAddProduct: !this.state.modalAddProduct
            })
        }
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-11">
                        {this.renderModalAddProduct(this.state.modalAddProduct)}
                        {
                            this.state.successStateProduct ?
                                <div className='alert alert-success font-weight-bold'>
                                    {this.state.successStateProduct}
                                </div>
                                :
                                null
                        }
                        <button 
                            className='alert-secondary form-control text-left font-weight-bold'
                            onClick={() => this.setState({modalAddProduct: true})}
                            >
                            <p><FontAwesomeIcon icon={faPlus}/> Add New Product</p>
                        </button>
                        <div className='table-responsive mt-5'>
                            <table className='table mt-5'>
                                <thead className="thead-dark text-center">
                                    <tr>
                                        <th scope="col">Nama Product</th>
                                        <th scope="col">Cover Image Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Popular Count</th>
                                        <th scope="col">Details</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.loading ?
                                            <tr>
                                                <td>
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            :
                                            null
                                    }
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({admin}) => {
    return {
        categoryProduct: admin.categoryProduct,
        subCatPro: admin.subCategoryProduct,
        loading: admin.loading,
        error: admin.error,
        success: admin.success
    }
}

export default connect(mapStateToProps, { adminAddProduct })(ProductList);