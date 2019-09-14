import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { UncontrolledCollapse, Button } from 'reactstrap';

import {sendPaymentSlipToAdmin} from '../redux/actions';
import Header from '../components/header';
import Footer from '../components/footer';
import { URL_API } from '../helpers/Url_API';
import { CustomInput } from 'reactstrap';

class PaymentPage extends Component {

    state = {
        paymentImageFile: `${URL_API}/defaultPhoto/defaultCategory.png`,
        paymentImageName: 'Select Image',
        paymentImageDB: undefined,

        errorState: '',
        successState: '',
    }

    componentDidMount() {
        this.setState({
            paymentImageFile: `${URL_API}/defaultPhoto/defaultCategory.png`,
            paymentImageName: 'Select Image',
            paymentImageDB: undefined,

            errorState: '',
            successState: '',
        })

        if (this.props.location.search || !this.props.transactionUserSelected) {
            return <Redirect to='/' />
        }
    }

    paymentImageChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                paymentImageFile: URL.createObjectURL(e.target.files[0]),
                paymentImageName: e.target.files[0].name,
                paymentImageDB: e.target.files[0]
            })
        } else {
            this.setState({
                paymentImageFile: `${URL_API}/defaultPhoto/defaultCategory.png`,
                paymentImageName: 'Select Image',
                paymentImageDB: undefined,
            })
        }
    }

    componentWillReceiveProps(newProps) {
        if(this.props.transactionUserSelected !== newProps.transactionUserSelected) {
            this.setState({
                errorState: '',
                successState: 'Success Kirim Bukti Pembayaran',
                loading: false
            })
        }
    }

    sendPaymentSlip = (id) => {
        if(!this.state.paymentImageDB) {
            this.setState({
                errorState: 'Harap Masukkan Bukti Pembayaran'
            })
        } else {
            this.setState({loading: true}, () => {
                this.props.sendPaymentSlipToAdmin(id, this.state.paymentImageDB)
            })
        }
    }

    renderTransactionHistory = () => {
        if (this.props.transactionUserSelected) {
            if (this.props.transactionUserSelected.length !== 0) {
                return this.props.transactionUserSelected.map((val, id) => {
                    return (
                        <div className='card-body' key={id}>
                            {
                                this.state.errorState ?
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.errorState}
                                    </div>
                                    :
                                    null
                            }
                            {
                                this.state.successState ?
                                    <div className="alert alert-success" role="alert">
                                        {this.state.successState}
                                    </div>
                                    :
                                    null
                            }
                            <div className='font-weight-bold text-center'>
                                <h5>
                                    Payment For User {this.props.username}
                                </h5>
                                <p>Payment Code: {val.kodeTransaksi}</p>
                                
                            </div>
                            <p>Nomor Rekening MaCommerce: 1234567890</p>
                            {
                                val.status === 0 ?
                                    <p>Status: <span className='text-danger'>Belum Membayar</span></p>
                                    : 
                                    null
                            }
                            {
                                val.status === 1 ?
                                    <p>Status: <span className='text-info'>Menunggu Konfirmasi dari Admin</span></p>
                                    :
                                    null
                            }
                            {
                                val.status === 2 ?
                                    <p>Status: <span className='text-success'>Pembayaran telah dikonfirmasi, menunggu Produk dikirim</span></p>
                                    :
                                    null
                            }
                            {
                                val.status === 3 ?
                                    <p>Status: <span className='text-secondary'>Produk telah dikirim, menunggu konfirmasi dari penerima produk</span></p>
                                    :
                                    null
                            }
                            {
                                val.status === 9 ?
                                    <p>Status: <span className='text-danger'>Bukti Pembayaran Anda Di Tolak, Silahkan kirim lagi bukti pembayaran.</span></p>
                                    :
                                    null
                            }
                            <Button className='btn btn-warning mb-1' id={`transactionUser-${val.id}`}>
                               Transaction Detail
                            </Button>
                            <UncontrolledCollapse toggler={`#transactionUser-${val.id}`}>
                                <table class="table">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Size</th>
                                            <th scope='col'>Qty</th>
                                            <th scope='col'>Total Qty</th>
                                            <th scope='col'>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.transactionDetail.map((val2, id2) => {
                                                return (
                                                    <tr key={id2}>
                                                        <td>
                                                            {val2.productName}
                                                        </td>
                                                        <td>
                                                            {val2.small !== 0 ? `S` : null}
                                                            {val2.medium !== 0 ? ` M` : null}
                                                            {val2.large !== 0 ? ` L` : null}
                                                            {val2.xlarge !== 0 ? ` XL` : null}
                                                        </td>
                                                        <td>
                                                            {val2.small !== 0 ? `Size S: ${val2.small}` : null}
                                                            {val2.medium !== 0 ? ` Size M: ${val2.medium}` : null}
                                                            {val2.large !== 0 ? ` Size L: ${val2.large}` : null}
                                                            {val2.xlarge !== 0 ? ` Size XL: ${val2.xlarge}` : null}
                                                        </td>
                                                        <td>
                                                            {val2.small + val2.medium + val2.large + val2.xlarge}
                                                        </td>
                                                        <td>
                                                            {val2.total_price}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </UncontrolledCollapse>
                            {
                                val.status === 0 ?
                                
                                   <div>
                                        
                                        <CustomInput id='psend_a' type='file' label={this.state.paymentImageName} onChange={this.paymentImageChange} />
                                        <img src={`${this.state.paymentImageFile}`} alt="payment-user" className='userImage my-3' />
                                        {
                                            this.state.loading ?
                                                <button className='btn btn-success form-control my-3' disabled>
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </button>
                                            :
                                                <button className='btn btn-success form-control my-3' onClick={() => this.sendPaymentSlip(val.id)}>
                                                    Kirim Bukti Pembayaran
                                                </button>
                                        }
                                   </div>
                                : null
                            }
                            {
                                val.status === 1 ?
                                    <p>Menunggu konfirmasi dari Admin</p>
                                    :
                                    null
                            }
                            {
                                val.status === 9 ?
                                    <button className='btn btn-success form-control my-3' onClick={() => this.sendPaymentSlip(val.date_created)}>
                                        Kirim Bukti Pembayaran
                                    </button>
                                    : null
                            }
                            <small>
                                Date Created: {val.date_created}
                            </small>
                            <p><small>Note: Jika direfresh anda akan kembali ke halaman home, namun data transaksi telah tersimpan di menu transaksi user</small></p>
                        </div>
                    )
                })
            } else {
                
                return <Redirect to='/' />
            }
            
        }

       
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
        return (
            <div>
                <Header statusPage='paymentPage' />

                {
                    this.props.auth ?

                        this.props.role === 'User' || this.props.role === 'Admin' ?
                            <div className='container py-3'>
                                <div className='row py-3'>
                                    <div className="offset-2 col-8 py-3">
                                        <div className="card px-3">
                                            {this.renderTransactionHistory()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :

                           <Redirect to='/' />
                        :

                        null
                }
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = ({ transaction, register }) => {
    return {
        role: register.role,
        loading: register.loading,
        auth: register.authChecked,
        username: register.username,
        transactionUserSelected: transaction.transaction_selected,
        transactionDetail: transaction.transaction_detail
    }
}

export default connect(mapStateToProps, { sendPaymentSlipToAdmin})(PaymentPage);

