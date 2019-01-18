import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import { IntlProvider } from 'react-intl';
import Loader from 'react-loader';

// -------------------redux thunk actions--------------------------------------
import {setAuthorizationHeader,authenticationCheck,logout} from './actions/Auth';
import { setLocale } from './actions/Locale';
// ----------------------------------------------------------------------------

// ---------------internationalize locale lang messages-----------------
import { initLocales } from './config/locale/locales';
import langMessages from './config/locale/langMessages';
// ---------------------------------------------------------------------

// --------------APP ROUTE-----------------------------------------
import AppRoute from './routes/AppRoute';
// ----------------------------------------------------------------

// -------------------------Components----------------------------------------------
import TopDashboardNavigation from './components/navigation/TopDashboardNavigation';
import FlashMessage from './components/messages/flash/FlashMessage';

// ----------------------------------------------------------------------------------

class App extends Component {

  componentDidMount(){

    this.initApp();

  }

  setLocale = (lang) => {
    // TopDashboardNavigation clicked lang link
    this.props.setLocale(lang);

  }

  initApp = () => {
    
    initLocales();  // ./config/locale/locales;

    // -------------set locale ---------------------------------
    if( localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_LOCALE_LANG) )
      this.props.setLocale( localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_LOCALE_LANG) );
    
    
    if( localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN) )
      setAuthorizationHeader( localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN) );

    // note: Call ajax to server-side; got user authenticated: succes or false;
    // if server-side return auth token, that`s mean user is authenticated
    this.props.authenticationCheck();

  }

  logout = (logoutToken) => {

    this.props.logout(logoutToken);

  }

  render() {

    // ----------------state variables ------------------------
    const {isAuthenticated,auth,locale} = this.props;  // REDUX props
    //---------------------------------------------------------

    const appTopDashboardNavigation = <TopDashboardNavigation isAuthenticated={isAuthenticated} auth={auth} logout={this.logout} setLocale={this.setLocale} />

    const APPRoute = !auth.loading && <AppRoute location={this.props.location} isAuthenticated={isAuthenticated} />

    return (    
      <React.Fragment>

        <IntlProvider locale={locale.lang} messages={langMessages[locale.lang]}>
          <Loader loaded={!auth.loading}>
            {appTopDashboardNavigation}
            <div className="ui container">

              <FlashMessage/>
              
              {APPRoute}

            </div>
          </Loader>
        </IntlProvider>

      </React.Fragment>     
    )
  }
}

App.propTypes={
  isAuthenticated: propTypes.bool.isRequired,

  location: propTypes.shape({
    pathname: propTypes.string.isRequired
  }).isRequired,

  auth: propTypes.shape({
    loading: propTypes.bool.isRequired,
  }).isRequired,

  locale: propTypes.shape({
    lang: propTypes.string.isRequired,
  }).isRequired,

  authenticationCheck: propTypes.func.isRequired,
  logout: propTypes.func.isRequired,
  setLocale: propTypes.func.isRequired,
}


function mapStateToProps(state){

  return {
    isAuthenticated: !!state.auth.token,  // check auth.token exists status; return true or false;
    auth: state.auth,
    locale: state.locale
  }
}

export default connect(mapStateToProps,{authenticationCheck,setLocale,logout})(App);