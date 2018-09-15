import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../actions/Auth';

const HomePage = (props) => (
    <div>
        <h1>HomePage</h1>
        {props.isUserAuthenticated ? 
            <button onClick={()=>props.logout()}>logout</button> : 
            <p><Link to="/login">Login</Link>
            <span>or</span>
            <Link to="/signup">signup</Link></p>}
    </div>
);

HomePage.propTypes={
    isUserAuthenticated: propTypes.bool.isRequired,
    logout: propTypes.func.isRequired
}


function mapStateToProps(state){
    return{
        isUserAuthenticated: !!state.user.token     // format: boolean
    }
}

export default connect(mapStateToProps,{logout})(HomePage);
