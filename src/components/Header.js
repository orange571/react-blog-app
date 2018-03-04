import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout, displayName }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Blog</h1>
        </Link>
        <div className="header__right-nav">
          <div className="header__username">Signed in as {displayName}</div>
          <button className="button button--link" onClick={startLogout}>Logout</button>
        </div>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});


const mapStateToProps = (state) => {
  return {
    displayName: state.auth.displayName
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
