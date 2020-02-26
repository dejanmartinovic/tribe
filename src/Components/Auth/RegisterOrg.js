import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {signUpOrg} from '../../Store/Actions/authActions'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'



class SignUpOrg extends Component {

    state = {
        email: '',
        password: '',
        firstName:'',
        lastName:'',
        organisation:'',
        isOrg:true
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmitOrg = (e) => {
        e.preventDefault();
        this.props.signUpOrg(this.state)
    }

    render() {

        const {auth, authErrorOrg} = this.props;

        if (auth.uid) return <Redirect to='/dashboard' />

        return (
           
                <div className="col-md-6 login-form-1">
                    <h3>Organisation</h3>
                    <form onSubmit={this.handleSubmitOrg} >
                    <div className="form-group">
                            <input type="text" id="organisation" onChange={this.handleChange} className="form-control" placeholder="Your Organisation *" />
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" onChange={this.handleChange} className="form-control" placeholder="Your Email *" />
                        </div>
                        <div className="form-group">
                            <input type="text" id="orgFirstName" onChange={this.handleChange} className="form-control" placeholder="Your First Name *" />
                        </div>
                        <div className="form-group">
                            <input type="text" id="orgLastName" onChange={this.handleChange} className="form-control" placeholder="Your Last Name *" />
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
                                
                                {authErrorOrg ? <p className="error-message">{authErrorOrg}</p> : null}

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
        authErrorOrg: state.authOrg.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUpOrg: (newUserOrg) => dispatch(signUpOrg(newUserOrg))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpOrg)
