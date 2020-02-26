import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../../Store/Actions/authActions'



class SignIn extends Component {

    state = {
        email: '',
        password: ''

    }
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);

        console.log('is org')
    }

    render() {
        return (
           
                <div className="col-md-6 login-form-1">
                    <h3>Organisation</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" id="email" className="form-control" onChange={this.handleChange} placeholder="Your Email *"  />
                        </div>
                        <div className="form-group">
                            <input type="password" id="password" className="form-control" onChange={this.handleChange} placeholder="Your Password *"  />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" />
                        </div>
                        <div className="form-group">
                        
                            <Link to='/reset-password' className="ForgetPwd">Forget Password?</Link>
                        </div>

                        <div className="form-group">
                            <Link to='/signup' className="ForgetPwd">Need to register?</Link>
                        </div>
                    </form>
                </div>
       
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

