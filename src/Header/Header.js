import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

class Header extends Component{

  render(){
    return(
      <header className='Header'>
          <nav className='header-navbar'>
            <div className='header-branding'>
              <span><Link to={'/'}>IT Manager App</Link></span>
            </div>
            <ul className='header-menu'>
              <li><Link to={'/dashboard'}>Dashboard</Link></li>
              <li><Link to={'/add-user'}>Add User</Link></li>
              <li><Link to={'/create-task'} onClick={this.handleClick}>Create Task</Link></li>
            </ul>
          </nav>
      </header>
    )
  } 

}

export default Header