import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../actions/auth';

export const Header = ({ startLogout, startLogin, displayName }) => (
  <header className="header">
    <div className="show-for-desktop content-container content-container--header">
      <div className="header__content">
          {
            displayName ? (
              <div  className="header__left-nav">
                <Link className="header__title" to="/dashboard">
                  <h1>Thought Collector</h1>
                </Link>
                <NavLink to="/dashboard" className="header__link" activeClassName="is-active" exact={true}>Dashboard</NavLink>
                <NavLink to="/public" className="header__link "activeClassName="is-active">Browse</NavLink>
              </div>
            ) : (
              <div  className="header__left-nav">
                <Link className="header__title" to="/dashboard">
                  <h1>Thought Collector</h1>
                </Link>
                <Link className="header__link" to="/public">
                  Browse
                </Link>
              </div>
            )
          }
        {
          displayName ? (
            <div className="header__right-nav">
              <div className="header__username">Signed in as {displayName}</div>
              <button className="button button--link logout" onClick={startLogout}>Logout</button>
            </div>
          ) : (
            <div className="header__right-nav">
              <button className="button login" onClick={startLogin}>Login</button>
            </div>
          )
        }
      </div>
    </div>
    <div className="show-for-mobile">
      <div  className="header_content--top">
        <Link className="header__title" to="/dashboard">
          <h1>Thought Collector</h1>
        </Link>
        {displayName && <div className="header__username">Signed in as {displayName}</div>}
      </div>
      {
        displayName ? (
          <div className="header_content--bottom">
            <div className="content-container--bottom-nav">
              <NavLink to="/dashboard" className="header__link" activeClassName="is-active" exact={true}>Dashboard</NavLink>
              <NavLink to="/public" className="header__link "activeClassName="is-active">Browse</NavLink>
              <button className="button button--link logout" onClick={startLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="header_content--bottom">
            <div className="content-container--bottom-nav">
              <Link className="header__link" to="/public">Browse</Link>
              <button className="button button--link login" onClick={startLogin}>Login</button>
            </div>
          </div>
        )
      }
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  startLogin: () => dispatch(startLogin()),
});


const mapStateToProps = (state) => {
  return {
    displayName: state.auth.displayName
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
