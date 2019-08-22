import React, { Component } from 'react';
import queryString from 'query-string';
import { checkBg } from '../helpers/stylefunction';
import { connect } from 'react-redux';
import { EmailVerification } from '../redux/actions';


class VerifiedPage extends Component {
    componentDidMount() {
        checkBg('VerifiedPage', 'bg-light');
        
        this.props.EmailVerification()
    }
    render() {
        return(
            <div id='VerifiedPage'>
                <div className='container py-1'>
                    <div className='row py-1'>
                        <div className="offset-2 offset-md-3 col-8 col-md-6 py-3">
                            <div className='py-3 text-center'>
                                <Link to='/' className='navbar-brand text-dark'>
                                    <span>Ma</span>Commerce
                                 </Link>
                            </div>
                            <div className="card p-3 font-weight-bold">
                                {
                                    this.props.loading ?
                                        <p className='text-warning'>Kami sedang memverification account anda...</p>
                                    :
                                    null
                                }

                                {
                                    this.props.statusVer === 'Success' ?
                                        <p className='text-success'>Verification Success. Thanks for your patience :)</p>
                                        :
                                        null
                                }

                                {
                                    this.props.statusVer === 'Failed' ?
                                        <p className='text-danger'>Verification Failed. Please refresh your page</p>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.register.loading,
        statusVer: state.register.statusVerification
    }
}

export default connect(mapStateToProps, {EmailVerification})(VerifiedPage);