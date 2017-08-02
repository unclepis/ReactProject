import React from 'react'
import NavLink from './routerMap/navLink'
import { IndexLink } from 'react-router'
export default React.createClass({
  render() {
    return (
      <div>
        <ul role="nav" className='navClass'>
          <li><IndexLink to="/" activeClassName='nav'>Home</IndexLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/repos">Repos</NavLink></li>
          <li><NavLink to="/repos/reactjs/reactRouter">react router</NavLink></li>
          <li><NavLink to="/repos/facebook/react">react</NavLink></li>
        </ul>
        <h1>React Router Tutorial</h1>
        {this.props.children || <Home />}
      </div >
    )
  }
})
