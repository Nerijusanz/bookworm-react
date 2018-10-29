import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import TopDashboardNavigation from './TopDashboardNavigation';

const Navigation = ({isAuthenticatedToken}) => (

    isAuthenticatedToken && <TopDashboardNavigation/>
);

Navigation.propTypes={

    isAuthenticatedToken: propTypes.bool.isRequired

}


function mapStateToProps(state){


    return{
        isAuthenticatedToken: !!state.auth.token
    }
}

export default connect(mapStateToProps,{})(Navigation);
