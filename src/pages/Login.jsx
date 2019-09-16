import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin, cleanError } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { checkBg } from '../helpers/stylefunction';

class Login extends Component {

    componentDidMount() {
        checkBg('LoginPage', 'bg-light')
        this.props.cleanError();
    }

    handleSubmitLogin = (e) => {
        e.preventDefault();

        this.props.userLogin(this.Username.value, this.Password.value);
    }

    renderButtonLogin = () => {
        if (this.props.loading) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }

        return <button type="submit" className="btn btn-primary form-control">Login</button>
    }

    render() {
        if(localStorage.getItem('token') === null) {
            return (
                <div id='LoginPage' >
                    <div className='container py-3'>
                        <div className='row py-3'>
                            <div className="offset-2 offset-md-3 col-8 col-md-6 py-3">
                                <div className='py-3 text-center'>
                                    <Link to='/' className='navbar-brand text-dark'>
                                        <span>Ma</span>Commerce
                                 </Link>
                                </div>
                                <div className="card px-3">
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">Login Page</h5>
                                        {
                                            this.props.error.length > 0 ?
                                                <div className="alert alert-danger" role="alert">
                                                    {window.scrollTo(0, 0)}
                                                    {this.props.error}
                                                </div>
                                            : 
                                            null
                                        }
                                        <form onSubmit={this.handleSubmitLogin}>
                                            <div className="form-group">
                                                <FontAwesomeIcon icon={faUser} /> <label>Username</label>
                                                <input ref={ (Username) => this.Username = Username } type="text" className="form-control" id="usernameLogin" placeholder="Enter Your Username" required />
                                            </div>
                                            <div className="form-group">
                                                <FontAwesomeIcon icon={faKey} /> <label>Password</label>
                                                <input ref={ (Password) => this.Password = Password } type="password" className="form-control" id="passwordLogin" placeholder="Password" maxLength='16' minLength='6' required />
                                            </div>
                                            {this.renderButtonLogin()}
                                        </form>

                                        <hr />
                                        <p className='mt-3'>Belum Register?  <Link to='/register'>Register Now!</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return <Redirect to='/' />
    }

}

const mapStateToProps = (state) => {
    return {
        loading: state.register.loading,
        error: state.register.error
    }
}

export default connect(mapStateToProps, { userLogin, cleanError })(Login);
