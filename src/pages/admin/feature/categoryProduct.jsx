import React, { Component } from 'react'
import { connect } from 'react-redux';
import { adminGetCategoryProduct } from '../../../redux/actions'

class AdminCategoryProduct extends Component {
    state = {
        categoryProductSelected: null
    }
    
    componentDidMount() {
        this.props.adminGetCategoryProduct();
    }

    selectedCategory = (e) => {
        let categoryProduct = document.getElementById('categoryProduct')
        let selectedOptions= categoryProduct.options[categoryProduct.selectedIndex].value
        this.setState({categoryProductSelected: parseInt(selectedOptions)})
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
            if(val.parentId === id) {
                return (
                    <option
                        key={index}
                        value={parseInt(val.idsubcategory)} >
                        {val.subcategory}
                    </option>
                )
                
            }
        })
    }

    render() {
        return (
            <div>
                <div className="col-4">
                    <label for="inputState">Category Product</label>
                    <select id="categoryProduct" className="form-control mb-3" onChange={this.selectedCategory}>
                        <option value='' selected>Select Category</option>
                        {this.renderCategoryProduct()}
                    </select>
                    {
                        this.state.categoryProductSelected !== null ?
                           <div>
                                <label for="inputState">Sub Category Product</label>
                                <select id="subCategoryProduct" className="form-control">
                                    <option value='' selected>Select Sub Category</option>
                                    {this.renderSubCategoryProduct(this.state.categoryProductSelected)}
                                </select>
                           </div>
                        :
                        null
                    }
                </div>
            </div>
        )
    }   
}

const mapStateToProps = (state) => {
    return {
        loading: state.register.loading,
        categoryProduct: state.admin.categoryProduct,
        subCatPro: state.admin.subCategoryProduct,
    }
}


export default connect(mapStateToProps, { adminGetCategoryProduct })(AdminCategoryProduct);