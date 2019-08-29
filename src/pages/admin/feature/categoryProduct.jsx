import React, { Component } from 'react'
import { connect } from 'react-redux';
import { 
    adminGetCategoryProduct,
    adminAddCategoryProduct,
    adminAddSubCategoryProduct,
    cleanErrorSuccess
} from '../../../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ModalMaCommerce from '../../../components/modal';
import { URL_API } from '../../../helpers/Url_API';
import { CustomInput } from 'reactstrap';

class AdminCategoryProduct extends Component {
    state = {
        categoryProductSelected: null,
        subCategoryProductSelected: null,
        categoryProductSelectedForSubCat: null,
        categoryName: '',
        modalAddCategory: false,
        modalAddSubCategory: false,
        modalEditCategory: false,
        categoryImageFile: `${URL_API}/defaultPhoto/defaultCategory.png`,
        categoryImageName: 'Select Image' ,
        categoryImageDB: undefined,
        errorState: ''
    }
    
    componentDidMount() {
        this.props.adminGetCategoryProduct();
    }

    addCategory = () => {
        let objCategory = {
            categoryName: this.CategoryProduct.value,
            categoryImage: this.state.categoryImageDB
        }

        this.props.adminAddCategoryProduct(objCategory)
        this.CategoryProduct.value = ''
        this.setState({
            categoryImageFile: `${URL_API}/defaultPhoto/defaultCategory.png`,
            categoryImageName: 'Select Image',
            categoryImageDB: undefined,
            categoryProductSelected: null
        })
    }
    
    addSubCategory = () => {
        let objSubCategory = {
            parentCategoryId: this.state.categoryProductSelectedForSubCat,
            subCategoryName: this.subCategoryProduct.value,
        }

        this.props.adminAddSubCategoryProduct(objSubCategory)
        this.subCategoryProduct.value = ''
        this.setState({
            categoryProductSelectedForSubCat: null,
        })
    }

    onBtnEditCatOrSubCat = () => {
        console.log(this.state.categoryProductSelected, this.state.subCategoryProductSelected)
        if (isNaN(this.state.categoryProductSelected) === true || this.state.categoryProductSelected === null) {
            this.setState({
                errorState: 'Harap pilih category yang ingin diubah'
            })
        } else if (this.state.subCategoryProductSelected === 'Select Sub Category') {
            this.setState({
                subCategoryProductSelected: false,
                errorState: '',
                modalEditCategory: true
            })
        } else {
            this.setState({
                errorState: '',
                modalEditCategory: true
            })
        }
    }

    componentDidUpdate() {
        console.log(this.props.categoryProduct)
    }

    categoryImageChange = (e) => {
        console.log(e.target.files)
        if (e.target.files[0]) {
            this.setState({
                categoryImageFile: URL.createObjectURL(e.target.files[0]),
                categoryImageName: e.target.files[0].name,
                categoryImageDB: e.target.files[0]
            })
        } else {
            this.setState({
                categoryImageFile: `${URL_API}/defaultPhoto/defaultCategory.png`,
                categoryImageName: `Select Image`,
                categoryImageDB: undefined
            })
        }
    }

    selectedCategory = () => {
        let categoryProduct = document.getElementById('categoryProduct')
        let selectedOptions= categoryProduct.options[categoryProduct.selectedIndex].value
        this.setState({categoryProductSelected: parseInt(selectedOptions)})
    }

    selectedSubCategory = () => {
        let subCategoryProduct = document.getElementById('subCategoryProduct')
        let selectedOptions = subCategoryProduct.options[subCategoryProduct.selectedIndex].innerHTML
        this.setState({ subCategoryProductSelected: selectedOptions })
    }

    getInnerCategory = () => {
        let categoryProduct = document.getElementById('getInnerCategory')
        this.setState({
            categoryProductSelectedForSubCat: parseInt(categoryProduct.options[categoryProduct.selectedIndex].value),
            categoryName: categoryProduct.options[categoryProduct.selectedIndex].innerHTML
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

    renderCategoryImage = (id) => {
        return this.props.categoryProduct.map((val, index) => {
            if(val.id === id) {
                return <img key={index} src={`${URL_API}${val.categoryImage}`} alt="user-default" className='userImage my-3' />
            }

            return null
        })
    }

    renderSubCategoryProduct = (id) => {
        return this.props.subCatPro.map((val, index) => {
            if(val.parentId === id) {
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

    renderModalAddCategory = (params) => {
        if(params) {
            return (
                <ModalMaCommerce 
                    modal={this.state.modalAddCategory}
                    toggle={this.toggle}
                    successMessage={this.props.success}
                    errorMessage={this.props.error}
                    ModalHeader={'Add Category'}
                    ModalBody={
                        <div>
                           <h3>New Category Name</h3>
                            <img src={`${this.state.categoryImageFile}`} alt="user-default" className='userImage my-3' />
                            <CustomInput id='addc' type='file' label={this.state.categoryImageName} onChange={this.categoryImageChange} />
                            
                            <input ref={(CategoryProduct) => this.CategoryProduct = CategoryProduct} 
                                    type="text" 
                                    className="form-control mt-3" 
                                    id="CategoryProduct" 
                                    placeholder="Enter New Category" 
                             />
                        </div>
                    }
                    loading={this.props.loading}
                    buttonClickName={'Add New Category'}
                    onClickModal={this.addCategory}
                />
            )
        }
    }

    renderModalAddSubCategory = (params) => {
        if (params) {
            return (
                <ModalMaCommerce
                    modal={this.state.modalAddSubCategory}
                    toggle={this.toggle}
                    successMessage={this.props.success}
                    errorMessage={this.props.error}
                    ModalHeader={'Add New Sub Category'}
                    ModalBody={
                        <div>
                            <h4>Select Category</h4>
                            <select id="getInnerCategory" className="form-control mb-3" onChange={this.getInnerCategory}>
                                <option value=''>Select Category</option>
                                {this.renderCategoryProduct()}
                            </select>
                            <h4>New Sub Category Name For: {this.state.categoryName === 'Select Category' ? '' : this.state.categoryName}</h4>

                            <input ref={(subCategoryProduct) => this.subCategoryProduct = subCategoryProduct}
                                type="text"
                                className="form-control mt-3"
                                id="subCategoryProduct"
                                placeholder="Enter New Sub Category"
                            />
                        </div>
                    }
                    loading={this.props.loading}
                    buttonClickName={'Add New Sub Category'}
                    onClickModal={this.addSubCategory}
                />
            )
        }
    }

    renderModalEdit = (params) => {
        if(params) {
            return (
                <ModalMaCommerce
                    modal={this.state.modalEditCategory}
                    toggle={this.toggle}
                    successMessage={this.props.success}
                    errorMessage={this.props.error}
                    ModalHeader={
                        this.state.subCategoryProductSelected ?
                            'Edit Sub Category'
                            :
                            'Edit Category'
                    }
                    ModalBody={
                        <div>
                            <h3>
                                {
                                    this.state.subCategoryProductSelected ?
                                    'Edit Sub Category'
                                    :
                                    'Edit Category'
                                }
                            </h3>
                                {
                                    this.state.subCategoryProductSelected ?
                                    <input type="text" className='form-control' disabled value={this.state.subCategoryProductSelected} />
                                    :
                                    null
                                }
                                {
                                    this.state.subCategoryProductSelected ?
                                    null 
                                    :
                                    <div>
                                        <img src={`${this.state.categoryImageFile}`} alt="user-default" className='userImage my-3' />
                                        <CustomInput id='editc' type='file' label={this.state.categoryImageName} onChange={this.categoryImageChange} />
                                    </div>
                                }

                                {
                                    this.state.subCategoryProductSelected ?
                                    <input ref={(EditSubCategoryProduct) => this.EditSubCategoryProduct = EditSubCategoryProduct}
                                        type="text"
                                        className="form-control mt-3"
                                        id="EditSubCategoryProduct"
                                        placeholder="Enter New Name Sub Category"
                                    />
                                    :
                                    <input ref={(EditCategoryProduct) => this.EditCategoryProduct = EditCategoryProduct}
                                        type="text"
                                        className="form-control mt-3"
                                        id="EditCategoryProduct"
                                        placeholder="Enter New Name Category"
                                    />
                                }
                        </div>
                    }
                    loading={this.props.loading}
                    buttonClickName={'Add New Category'}
                    onClickModal={this.addCategory}
                />
            )
        }
    }

    toggle = () => {
        this.props.cleanErrorSuccess();
        if (this.state.modalAddCategory) {
            this.setState({
                modalAddCategory: !this.state.modalAddCategory,
                
            });
        } 
        if (this.state.modalAddSubCategory){
            this.setState({
                modalAddSubCategory: !this.state.modalAddSubCategory,

            });
        }
        if(this.state.modalEditCategory) {
            this.setState({
                modalEditCategory: !this.state.modalEditCategory,
            });
        }
       
    }

    render() {
        return (
            <div>
              <div className="container-fluid">
                    <div className="col-10">
                        {this.renderModalAddCategory(this.state.modalAddCategory)}
                        <button className="alert alert-secondary mr-3" role="alert" onClick={() => this.setState({ modalAddCategory: true})}>
                            <p><FontAwesomeIcon icon={faPlus} /> Add New Category</p>
                        </button>
                        {this.renderModalAddSubCategory(this.state.modalAddSubCategory)}
                        {this.renderModalEdit(this.state.modalEditCategory)}
                        <button className="alert alert-secondary" role="alert" onClick={() => this.setState({ modalAddSubCategory: true })}>
                            <p><FontAwesomeIcon icon={faPlus} /> Add New Sub Category</p>
                        </button>
                        {
                            this.state.errorState ? 
                                <div className='alert alert-danger'>
                                    {this.state.errorState}
                                </div>
                                :
                                null
                        }
                        <table className="table">
                            <thead className="thead-dark text-center">
                                <tr>
                                    <th scope="col">Category</th>
                                    <th scope="col">Image Category</th>
                                    <th scope="col">Sub Category</th>
                                    <th scope="col" colSpan='2'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <select id="categoryProduct" className="form-control mb-3" onChange={this.selectedCategory}>
                                            <option value=''>Select Category</option>
                                            {this.renderCategoryProduct()}
                                        </select>
                                    </td>
                                    <td style={{display: 'block', width: '200px'}}>
                                        {
                                            this.state.categoryProductSelected !== null ?

                                                this.renderCategoryImage(this.state.categoryProductSelected)
                                                :
                                                <img src={`http://localhost:2002/defaultPhoto/defaultCategory.png`} alt="user-default" className='userImage my-3' />
                                        }
                                    </td>
                                    <td>
                                        {
                                            this.state.categoryProductSelected !== null ?
                                                <select id="subCategoryProduct" className="form-control" onChange={this.selectedSubCategory}>
                                                    <option value=''>Select Sub Category</option>
                                                    {this.renderSubCategoryProduct(this.state.categoryProductSelected)}
                                                </select>
                                                :
                                                <select id="subCategoryProduct" className="form-control">
                                                    <option value=''>Select Sub Category</option>
                                                </select>
                                        }
                                    </td>
                                    <td className='text-center'>
                                        <button className='alert alert-info' onClick={this.onBtnEditCatOrSubCat}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </button>
                                    </td>
                                    <td className='text-center'>
                                        <button className='alert alert-danger'>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
              </div>
            </div>
        )
    }   
}

const mapStateToProps = (state) => {
    return {
        categoryProduct: state.admin.categoryProduct,
        subCatPro: state.admin.subCategoryProduct,   
        loading: state.admin.loading,
        error: state.admin.error,
        success: state.admin.success
    }
}


export default connect(mapStateToProps, {
    adminGetCategoryProduct,
    adminAddCategoryProduct,
    adminAddSubCategoryProduct,
    cleanErrorSuccess
})(AdminCategoryProduct);