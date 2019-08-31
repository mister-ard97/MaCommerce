import Axios from 'axios';
import {
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    VERIFICATION_SUCCESS,
    VERIFICATION_FAILED,
    AUTH_LOADING_FINISHED,
    ALL_CATEGORY,
    ADMIN_LOADING,
    ADMIN_LOADING_FINISHED, 
    ADMIN_LOADING_ERROR,
    ADMIN_CLEAN
} from './types';
import { URL_API } from '../../helpers/Url_API';

export const adminRegister = (data) => {
    let {
        username,
        password,
        confPassword,
        FirstName,
        LastName,
        email,
        address
    } = data

    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_LOADING });
        if (username === '' ||
            password === '' ||
            confPassword === '' ||
            FirstName === '' ||
            LastName === '' ||
            email === '' ||
            address === '') {

            dispatch({
                type: AUTH_LOGIN_ERROR, payload: {
                    error: 'Semua Form Input Harus Diisi',
                }
            })
        } else if (!(password === confPassword)) {
            dispatch({
                type: AUTH_LOGIN_ERROR, payload: {
                    error: 'Password dan Confirmation Password Harus Sama',
                }
            })
        } else {

            delete data.confPassword;

            Axios.post(URL_API + '/admin/adminRegister', data)
                .then((res) => {
                    let { FirstName, LastName, username, email, token, status, role } = res.data
                    localStorage.setItem('token', token);
                    dispatch({
                        type: USER_LOGIN_SUCCESS, payload: {
                            FirstName,
                            LastName,
                            username,
                            email,
                            token,
                            status,
                            role,
                            justRegister: true,
                            loginChecked: true,
                            NextPage: true
                        }
                    })
                })
                .catch((err) => {
                    dispatch({
                        type: AUTH_LOGIN_ERROR, payload: {
                            error: err.response.data.message,
                        }
                    })
                })
        }
    }      
}

export const adminLogin = (username, password) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_LOADING });

        Axios.post(URL_API + '/admin/adminLogin', {
            username, password
        })
            .then((res) => {
                let { FirstName, LastName, username, email, token, status, role } = res.data
                localStorage.setItem('token', token);
                dispatch({
                    type: USER_LOGIN_SUCCESS, payload: {
                        FirstName,
                        LastName,
                        username,
                        email,
                        token,
                        status,
                        role,
                        loginChecked: true
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: AUTH_LOGIN_ERROR, payload: {
                        error: err.response.data.message,
                    }
                })
            })
    }
}


export const resendAdminEmailVerification = (username, email) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_LOADING });

        Axios.post(URL_API + '/admin/adminResendEmailVerification', {
            username,
            email
        })
            .then((res) => {
                let { FirstName, LastName, username, email, token, status, role } = res.data
                localStorage.setItem('token', token);
                dispatch({
                    type: USER_LOGIN_SUCCESS, payload: {
                        FirstName,
                        LastName,
                        username,
                        email,
                        token,
                        status,
                        role,
                        justRegister: true,
                        loginChecked: true
                    }
                })
                dispatch({ type: VERIFICATION_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: VERIFICATION_FAILED });
            })
    }
}

export const adminEmailVerification = () => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_LOADING });
        const token = localStorage.getItem('token');
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        Axios.put(URL_API + '/admin/adminEmailVerification', {}, options)
            .then((res) => {
                let { FirstName, LastName, username, email, token, status, role } = res.data
                localStorage.setItem('token', token);
                dispatch({
                    type: USER_LOGIN_SUCCESS, payload: {
                        FirstName,
                        LastName,
                        username,
                        email,
                        token,
                        status,
                        role,
                        justRegister: true,
                        loginChecked: true
                    }
                })
                dispatch({ type: VERIFICATION_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: VERIFICATION_FAILED });
            })
    }
}

export const adminGetCategoryProduct = () => {
    return (dispatch) => {
        dispatch({ type: ADMIN_LOADING })
        Axios.get(URL_API + '/admin/getCategory')
        .then((res) => {
            dispatch({
                type: ALL_CATEGORY, payload: {
                    categoryProduct: res.data.categoryParent,
                    subCategoryProduct: res.data.subCategory,
                    loading: false
                }
            })
        })
        .catch((err) => {
            dispatch({
                type: ADMIN_LOADING_ERROR, payload: {
                    error: err.response.data.message,
                }
            })
        })
    }
}

export const adminAddCategoryProduct = (datacategory) => {
    let {
        categoryName,
        categoryImage
    } = datacategory
    return (dispatch) => {
        dispatch({ type: ADMIN_LOADING })
        if (categoryName === '' & !categoryImage) {
            dispatch({
                type: ADMIN_LOADING_ERROR, payload: {
                    error: 'Category Name tidak boleh kosong',
                }
            })
        } else if (!categoryImage) {
            dispatch({
                type: ADMIN_LOADING_ERROR, payload: {
                    error: 'Gambar tidak boleh kosong',
                }
            })
        } else if (categoryName === '') {
            dispatch({
                type: ADMIN_LOADING_ERROR, payload: {
                    error: 'Category Name tidak boleh kosong',
                }
            })
        } else {
            const token = localStorage.getItem('token');
            
            let formData = new FormData();
            let options = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }

            formData.append('categoryImage', categoryImage)

            delete datacategory.categoryImage

            formData.append('dataCategory', JSON.stringify(datacategory))

            Axios.post(URL_API + '/admin/addCategory', formData, options)
                .then((res) => {
                    dispatch({
                        type: ALL_CATEGORY, payload: {
                            categoryProduct: res.data.categoryParent,
                            success: 'Category berhasil ditambahkan',
                            loading: false
                        }
                    })
                })
                .catch((err) => {
                    dispatch({
                        type: ADMIN_LOADING_ERROR, payload: {
                            error: err.response.data.message,
                        }
                    })
                })
        }
    }
}

export const adminAddSubCategoryProduct = (objSubCategory) => {
    let {
        parentCategoryId,
        subCategoryName
    } = objSubCategory

    return (dispatch) => {
        dispatch({ type: ADMIN_LOADING })
        if (subCategoryName === '') {
            dispatch({
                type: ADMIN_LOADING_ERROR, payload: {
                    error: 'Nama Sub Category harus diisi',
                }
            })
        } else {
            const token = localStorage.getItem('token');

            let options = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
            Axios.post(URL_API + '/admin/addSubCategory', { parentCategoryId, subCategoryName }, options)
                .then((res) => {
                    dispatch({
                        type: ALL_CATEGORY, payload: {
                            subCategoryProduct: res.data.subCategory,
                            success: 'Sub Category berhasil ditambahkan',
                            loading: false
                        }
                    })
                })
                .catch((err) => {
                    dispatch({
                        type: ADMIN_LOADING_ERROR, payload: {
                            error: err.response.data.message,
                        }
                    })
                })
        }        
    }
}


export const adminEditCategoryProduct = (dataEditCategory) => {
    let {
        categoryId,
        categoryImage
    } = dataEditCategory

    return(dispatch) => {
        dispatch({ type: ADMIN_LOADING })

            let formData = new FormData();
            const token = localStorage.getItem('token');

            let options = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }

            formData.append('categoryImage', categoryImage);

            delete dataEditCategory.categoryImage

            formData.append('dataCategory', JSON.stringify(dataEditCategory))

            Axios.put(URL_API + '/admin/editCategory/' + categoryId, formData, options)
                .then((res) => {
                    dispatch({
                        type: ALL_CATEGORY, payload: {
                            categoryProduct: res.data.categoryParent,
                            success: 'Category berhasil diupdate',
                            loading: false
                        }
                    })
                })
                .catch((err) => {
                    dispatch({
                        type: ADMIN_LOADING_ERROR, payload: {
                            error: err.response.data.message,
                        }
                    })
                })     
    }
}

export const adminEditSubCategoryProduct = (objSubCategory) => {
    let {subCategoryId} = objSubCategory;

    return (dispatch) => {
        dispatch({ type: ADMIN_LOADING })

        const token = localStorage.getItem('token');

        let options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.put(URL_API + '/admin/editSubCategory/' + subCategoryId, objSubCategory, options)
            .then((res) => {
                dispatch({
                    type: ALL_CATEGORY, payload: {
                        subCategoryProduct: res.data.subCategory,
                        success: 'Sub Category berhasil diupdate',
                        loading: false
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: ADMIN_LOADING_ERROR, payload: {
                        error: err.response.data.message,
                    }
                })
            })
    }
}

export const adminDeleteCategoryProduct = (categoryName) => {
    return (dispatch) => {

        dispatch({ type: ADMIN_LOADING })
        const token = localStorage.getItem('token');
        let options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        console.log(options)

        Axios.delete(URL_API + '/admin/deleteCategory/' + categoryName, options)
        .then((res) => {
            dispatch({
                type: ALL_CATEGORY, payload: {
                    categoryProduct: res.data.categoryParent,
                    success: 'Category berhasil dihapus',
                    loading: false
                }
            })
        })
        .catch((err) => {
            dispatch({
                type: ADMIN_LOADING_ERROR, payload: {
                    error: err.response.data.message,
                }
            })
        })

    }
}

export const adminDeleteSubCategoryProduct = (subCategoryName) => {

    return (dispatch) => {
        dispatch({ type: ADMIN_LOADING })
        const token = localStorage.getItem('token');
        let options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.delete(URL_API + '/admin/deleteSubCategory/' + subCategoryName, options)
            .then((res) => {
                dispatch({
                    type: ALL_CATEGORY, payload: {
                        subCategoryProduct: res.data.subCategory,
                        success: 'Sub Category berhasil dihapus',
                        loading: false
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: ADMIN_LOADING_ERROR, payload: {
                        error: err.response.data.message,
                    }
                })
            })

    }
}

export const cleanErrorSuccess = () => {
    return {
        type: ADMIN_CLEAN
    }
}