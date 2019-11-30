import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoutes = ({component: Component, auth, ...rest})=>(
    <Route
        {...rest}
        render = {
            (props) => auth.isAuthenticated === true ? 
            (<Component{...props}/>) : (<Redirect to="/login"/>)
        }
    />
);

PrivateRoutes.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state)=>({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoutes);