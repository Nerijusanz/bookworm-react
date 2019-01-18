import React from 'react';
import propTypes from 'prop-types';
import gravatarUrl from 'gravatar-url';
import {Link} from 'react-router-dom';
import {Menu, Dropdown,DropdownItem,Image, DropdownMenu, MenuItem, Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';

const TopDashboardNavigation = ({ isAuthenticated,auth,logout,setLocale }) => (

    // <TopDashboardNavigation isAuthenticated={isAuthenticated} auth={auth} logout={this.logout} />
    
    isAuthenticated ? (<Menu secondary pointing>

        <Menu.Item as={Link} to="/dashboard">
            <FormattedMessage id="nav_item_brand_dashboard" />
        </Menu.Item>

        <Menu.Menu position="right">
            <MenuItem><Link to="dashboard_userbooks"><FormattedMessage id="nav_item_mybooks" /></Link></MenuItem>
            <MenuItem><Link to="dashboard_books"><FormattedMessage id="nav_item_booksapi" /></Link></MenuItem>
            <MenuItem>
                <Button basic color='grey' onClick={()=>setLocale('lt')}>LT</Button>
                <Button basic color='grey' onClick={()=>setLocale('en')}>EN</Button>
                <Button basic color='grey' onClick={()=>setLocale('ru')}>RU</Button>
            </MenuItem>

            <Dropdown trigger={<Image avatar src={gravatarUrl(auth.user.email)}/>}>
                <DropdownMenu>
                    <DropdownItem onClick={()=>logout(auth.logoutToken)}><FormattedMessage id="nav_item_logout" /></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Menu.Menu>
    </Menu>

    ) : (

    <Menu secondary pointing>

        <Menu.Item as={Link} to="/">
            <FormattedMessage id="nav_item_brand_main" />
        </Menu.Item>

        <Menu.Menu position="right">
            <MenuItem><Link to="signup"><FormattedMessage id="nav_item_signup" /></Link></MenuItem>
            <MenuItem><Link to="login"><FormattedMessage id="nav_item_login" /></Link></MenuItem>

            <MenuItem>
                <Button basic color='grey' onClick={()=>setLocale('lt')}>LT</Button>
                <Button basic color='grey' onClick={()=>setLocale('en')}>EN</Button>
                <Button basic color='grey' onClick={()=>setLocale('ru')}>RU</Button>
            </MenuItem>

        </Menu.Menu>
    </Menu>)
    
);

TopDashboardNavigation.propTypes={
    isAuthenticated: propTypes.bool.isRequired,
    auth: propTypes.shape({
        user: propTypes.shape({
            email: propTypes.string
        }).isRequired,
        logoutToken: propTypes.string.isRequired,
    }).isRequired,
    setLocale: propTypes.func.isRequired,
    logout: propTypes.func.isRequired,
  
  }

export default (TopDashboardNavigation);