import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../actions/Auth';


class HomePage extends Component {

    state

    render() {
      return (
        <div>
            <h1>HomePage</h1>
            {
            this.props.isAuthenticated ? 
                <button onClick={()=>this.props.logout()}>logout</button> : 
                
                <p><Link to="/login">Login</Link>
                <span>or</span>
                <Link to="/signup">signup</Link></p>
            }
        </div>
      )
    }
  }


HomePage.propTypes={
    isAuthenticated: propTypes.bool.isRequired,
    logout: propTypes.func.isRequired,

}


function mapStateToProps(state){
    return{
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps,{logout})(HomePage);
