import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {signUp} from '../../Store/Actions/authActions'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'



class SignUp extends Component {

    state = {
        email: '',
        password: '',
        firstName:'',
        lastName:'',
        isOrg: false,
        organisation:''

    }
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
    this.props.signUp(this.state)
    }

    render() {
        const {auth, authError} = this.props;

        if (auth.uid) return <Redirect to='/dashboard' />
        return (
           
                <div className="col-md-6 login-form-2">
                    <h3>Single User</h3>
                    <form onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <input type="email" id="email" onChange={this.handleChange} className="form-control" placeholder="Your Email *" />
                        </div>
                        <div className="form-group">
                            <input type="text" id="firstName" onChange={this.handleChange} className="form-control" placeholder="Your First Name *" />
                        </div>
                        <div className="form-group">
                            <input type="text" id="lastName" onChange={this.handleChange} className="form-control" placeholder="Your Last Name *" />
                        </div>
                        <div className="form-group">
                            <input type="password" id="password" onChange={this.handleChange}  className="form-control" placeholder="Your Password *" />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" />
                        </div>
                        <div className="form-group">
                            <Link to='/signin' className="ForgetPwd">Already have an account?</Link>
                            <div className="center red-text">
                                
                                {authError ? <p className="error-message">{authError}</p> : null}
                            </div>
                        </div>
                    </form>
                </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
