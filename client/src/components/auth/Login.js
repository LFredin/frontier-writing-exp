import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {loginUser} from '../../actions/authActions';

class Login extends React.Component {
    
    state = {
        email : "",
        password : "",
        errors : {}
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/homepage');
        }

        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/homepage'); //if user is logged in send to home page instead
        }
    }
    
    onChange = (event)=>{
        this.setState({
            [event.target.id] : event.target.value
        });
    }
    onSubmit = (event)=>{
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData);
        console.log(userData);
    }

    render(){

        const errors = this.state.errors;

        return(
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link
                            to="/"
                            className="btn-flat waves-effect"
                        >
                            <i className="material-icons left">keyboard_backspace</i>
                            Home
                        </Link>
                        <div className="col s12">
                            <h4>Log in </h4>
                            <p>Don't have an account yet? Register: </p>
                            <Link to="/register">Register</Link>
                        </div>

                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                    type="email"
                                    id="email"
                                    className={classnames('', {
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />
                                <label htmlFor="email">E-Mail</label>
                                <span className=""red-text>
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    type="password"
                                    id="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                    className={classnames('',{
                                        invalid: errors. password || errors.passwordincorrect
                                    })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className=""red-text>
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Log in 
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{loginUser})(Login);