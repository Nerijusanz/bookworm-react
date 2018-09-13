import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../actions/Auth';

const HomePage = ({ isAuthenticated,logout }) => (
    <div>
        <h1>HomePage</h1>
        {isAuthenticated ? <button onClick={()=>logout()}>logout</button>:<Link to="/login">Login</Link>}
    </div>
);

HomePage.propTypes={
    isAuthenticated: propTypes.bool.isRequired
}


function mapStateToProps(state){
    return{
        isAuthenticated: !!state.user.token,
        logout: propTypes.func.isRequired
    }
}

export default connect(mapStateToProps,{logout})(HomePage);
