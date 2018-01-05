import React, { PropTypes } from 'react';
import styles from './Nav.css';
import { Link } from 'react-router';

const Nav = () => {
  return (
    <div className={styles.nav}>
      <Link to='/home'>
        Home
      </Link>
      <Link to='/'>
        Posts
      </Link>
      <Link to='/about'>
        About
      </Link>
    </div>
  );
};

export default Nav;
