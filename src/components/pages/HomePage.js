import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../actions/Auth';

class HomePage extends Component {


    render() {
      return (
        <div>
            <h1>HomePage</h1>
            {this.props.isUserAuthenticated ? 
                <button onClick={()=>this.props.logout()}>logout</button> : 
                
                <p><Link to="/login">Login</Link>
                <span>or</span>
                <Link to="/signup">signup</Link></p>}
        </div>
      )
    }
  }

HomePage.propTypes={
    isUserAuthenticated: propTypes.bool.isRequired,
    logout: propTypes.func.isRequired,

}


function mapStateToProps(state){
    return{
        isUserAuthenticated: !!state.auth.token     // format: boolean
    }
}

export default connect(mapStateToProps,{logout})(HomePage);
