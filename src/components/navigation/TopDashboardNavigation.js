import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import gravatarUrl from 'gravatar-url';
import {Link} from 'react-router-dom';
import {Menu, Dropdown,DropdownItem,Image, DropdownMenu, MenuItem} from 'semantic-ui-react';

import { logout } from '../../actions/Auth';


class TopDashboardNavigation extends Component {

    logout = (logoutToken) => {
        this.props.logout(logoutToken);
    }

  render() {

    const {auth} = this.props;

    return (
        <React.Fragment>
            <Menu secondary pointing>

                <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>

                <Menu.Menu position="right">
                    <MenuItem><Link to="dashboard_userbooks">MyBooks</Link></MenuItem>
                    <MenuItem><Link to="dashboard_books">BooksAPI</Link></MenuItem>
                    <Dropdown trigger={<Image avatar src={gravatarUrl(auth.user.email)}/>}>
                        <DropdownMenu>
                            <DropdownItem onClick={()=>this.logout(auth.logoutToken)}>Logout</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
      </React.Fragment>
    )
  }
}

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
    
export default connect(mapStateToProps,{logout})(TopDashboardNavigation);
