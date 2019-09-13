import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { UncontrolledCollapse, Button } from 'reactstrap';
import Header from '../components/header';
import Footer from '../components/footer';

class PaymentPage extends Component {

    componentDidMount() {
        
        if (this.props.location.search || !this.props.transactionUserSelected) {
            return <Redirect to='/' />
        }
    }

    renderTransactionHistory = () => {
        if (this.props.transactionUserSelected) {
            if (this.props.transactionUserSelected.length !== 0) {
                return this.props.transactionUserSelected.map((val, id) => {
                    return (
                        <div className='card-body' key={id}>
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
                                    <p>Status: <span className='text-danger'>Menunggu Konfirmasi dari Admin</span></p>
                                    :
                                    null
                            }
                            {
                                val.status === 2 ?
                                    <p>Status: <span className='text-danger'>Pembayaran telah dikonfirmasi, menunggu Produk dikirim</span></p>
                                    :
                                    null
                            }
                            {
                                val.status === 3 ?
                                    <p>Status: <span className='text-danger'>Produk telah dikirim, menunggu konfirmasi dari penerima produk</span></p>
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
                            <button className='btn btn-success form-control my-3'>
                                Kirim Bukti Pembayaran
                            </button>
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

export default connect(mapStateToProps)(PaymentPage);

