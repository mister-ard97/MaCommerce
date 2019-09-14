import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

import {getUserTransaction, getTransactionDetail} from '../redux/actions'

import Header from '../components/header';
import Footer from '../components/footer';
import { URL_API } from '../helpers/Url_API';

class TransactionList extends Component {
    state = {
        link: null
    }

    componentDidMount() {
       this.props.getUserTransaction()
    }

    transactionDetail = (id) => {
        this.props.getTransactionDetail(id)
    }

    componentDidUpdate() {
        if(this.props.transactionDetail.length !== 0) {
            this.setState({
                link: 'GoToPayment'
            })
        }
    }

    renderTransactionHistoryList = () => {
        if(this.props.transactionUser) {
            if(this.props.transactionUser.length !== 0) {
                return this.props.transactionUser.map((val, id) => {
                    return (
                        <tr key={id}>
                            <td>
                                {val.kodeTransaksi}
                            </td>
                            <td>
                                {
                                    val.transactionImage === null ?
                                    'Belum ada bukti pembayaran'
                                    :
                                    <img src={`${URL_API}${val.transactionImage}`} className='img-fluid' alt={val.kodeTransaski+'-Slip'}/>
                                }
                            </td>
                            <td>
                                {
                                    val.status === 0 ?
                                        <p>Status: <span className='text-danger'>Belum Membayar</span></p>
                                        :
                                        null
                                }
                                {
                                    val.status === 1 ?
                                        <p>Status: <span className='text-secondary'>Menunggu Konfirmasi dari Admin</span></p>
                                        :
                                        null
                                }
                            </td>
                            <td className='text-center'>
                                <button
                                    className='btn btn-info alert alert-info'
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Transaction Detail"
                                    onClick={() => this.transactionDetail(val.id)}
                                >
                                    <FontAwesomeIcon icon={faBookOpen} />
                                </button>
                            </td>
                        </tr>
                    )
                })
            } else {
                return (
                    <tr>
                        <td colSpan='4' className='text-center'>
                            Tidak ada transaksi untuk {this.props.username}
                        </td>
                    </tr>
                )
            }
        }

        return (
            <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    render() {
        if (this.state.link === 'GoToPayment') {
            return <Redirect to='/payment' />
        }
        if (this.props.loading) {
            return (
                <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        } 

        return (
            <div>
                <Header statusPage='transactionList' />
                {
                    this.props.auth ?

                        this.props.role === 'User' || this.props.role === 'Admin' ?
                            <div className='container d-flex mb-5 pb-5'>
                                <div className='offset-1 col-10 my-5 pb-5'>
                                    <div className="card">
                                        <div className="card-body d-flex justify-content-between">
                                            <table class="table">
                                                <thead class="thead-dark">
                                                    <tr>
                                                        <th scope="col">Transaction Code</th>
                                                        <th scope="col">Payment Slip</th>
                                                        <th scope='col'>Status</th>
                                                        <th scope='col'>Transaction Detail /<br /> Upload Payment</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.renderTransactionHistoryList()}
                                                </tbody>
                                            </table>
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

const mapStateToProps = ({register, transaction }) => {
    return {
        role: register.role,
        loading: register.loading,
        auth: register.authChecked,
        username: register.username,

        transactionUser: transaction.transaction,
        transactionDetail: transaction.transaction_detail
    }
}

export default connect(mapStateToProps, {getUserTransaction, getTransactionDetail})(TransactionList);