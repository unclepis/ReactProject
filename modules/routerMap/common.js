import React from 'react'
import NavLink from './navLink'
import styles from '../../css/index.css'
import { IndexLink } from 'react-router'
export default class Common extends React.Component{
    render() {
        return (
            <div>
                <ul role="nav" className='navClass'>
                    <li><IndexLink to="/" activeClassName={styles.nav}>Home</IndexLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/repos">Repos</NavLink></li>
                    <li><NavLink to="/repos/reactjs/reactRouter">react router</NavLink></li>
                    <li><NavLink to="/repos/facebook/react">react</NavLink></li>
                </ul>
                <h1>welcome to React Router Tutorial</h1>
            </div >
        )
    }
}
