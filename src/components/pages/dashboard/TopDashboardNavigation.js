import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import gravatarUrl from 'gravatar-url';
import {Menu, Dropdown,DropdownItem,Image, DropdownMenu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import * as actions from '../../../actions/Auth';


const TopDashboardNavigation = ({auth,logout}) => (

    <Menu secondary pointing>
        <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>

        <Menu.Menu position="right">
            <Dropdown trigger={<Image avatar src={gravatarUrl(auth.user.email)}/>}>
                <DropdownMenu>
                    <DropdownItem onClick={()=>logout(auth.logoutToken)}>Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Menu.Menu>

    </Menu>

);


TopDashboardNavigation.propTypes={
    auth: propTypes.shape({
        user: propTypes.shape({
            email: propTypes.string.isRequired,
        }).isRequired,
        logoutToken: propTypes.string.isRequired,
  
    }).isRequired,
    logout: propTypes.func.isRequired,
  
  }
  
  
function mapStateToProps(state){

    return {
        auth: state.auth
    }
}
    
export default connect(mapStateToProps,{logout:actions.logout})(TopDashboardNavigation);
