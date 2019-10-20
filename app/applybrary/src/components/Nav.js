import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#" onClick={() => props.display_form('login')}>Login</a>
    </nav>
    
  );

  const logged_in_nav = (
      
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#" onClick={props.handle_logout}>Logout</a>
    </nav>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};