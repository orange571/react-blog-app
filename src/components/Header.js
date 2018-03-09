import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../actions/auth';

export const Header = ({ startLogout, startLogin, displayName }) => (
  <header className="header">
    <div className=" content-container content-container--header">
      <div className="header__content">
        <div className="header__left-nav">
          <Link className="header__title" to="/dashboard">
            <h1>Thought Collector</h1>
          </Link>
          {
            displayName ? (
              <div>
                <NavLink to="/dashboard" className="header__link" activeClassName="is-active" exact={true}>Dashboard</NavLink>
                <NavLink to="/public" className="header__link "activeClassName="is-active">Community Posts</NavLink>
              </div>
            ) : (
              <Link className="header__link" to="/public">
                Community Posts
              </Link>
            )
          }
        </div>

        {
          displayName ? (
            <div className="header__right-nav">
              <div className="header__username">Signed in as {displayName}</div>
              <button className="button button--link" onClick={startLogout}>Logout</button>
            </div>
          ) : (
            <div className="header__right-nav">
              <button className="button" onClick={startLogin}>Login</button>
            </div>
          )
        }
      </div>
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
