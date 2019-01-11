import React from 'react';
import propTypes from 'prop-types';
import gravatarUrl from 'gravatar-url';
import {Link} from 'react-router-dom';
import {Menu, Dropdown,DropdownItem,Image, DropdownMenu, MenuItem} from 'semantic-ui-react';

const TopDashboardNavigation = ({auth,logout}) => (
    // <TopDashboardNavigation auth={auth} logout={this.logout}
    <Menu secondary pointing>

        <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>

        <Menu.Menu position="right">
            <MenuItem><Link to="dashboard_userbooks">MyBooks</Link></MenuItem>
            <MenuItem><Link to="dashboard_books">BooksAPI</Link></MenuItem>
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

export default (TopDashboardNavigation);