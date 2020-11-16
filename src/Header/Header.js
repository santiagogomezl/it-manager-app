import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ITManagerContext from '../ITManagerContext'
import './Header.css'

class Header extends Component{

  static contextType = ITManagerContext

  //Main menu togggle button on mobile devices
  toggleMenu(){
    const toggleButton = document.querySelector('.header-toggle-menu')
    const headerMenu = document.querySelector('.header-menu')

    toggleButton.classList.toggle('clicked-toggle')
    headerMenu.classList.toggle('display-menu')
  }

  render(){

    //Due tasks marker on Header component
    const dueTasks = this.context.tasks ? this.context.tasks.length : ''
    const tasksMarker = <span className='tasks-marker'>{dueTasks} </span>

    return(
      <header className='Header'>
          <nav className='header-navbar'>
            <div className='header-branding'>
              <span><Link to={'/'}>IT Manager App</Link></span>
            </div>
            <div className='header-menu'>
              <ul>
                <li>
                  <div>
                    {dueTasks ? tasksMarker : ''}
                    <Link to={'/dashboard'}>Dashboard</Link>
                  </div>
                </li>
                <li><Link to={'/add-user'}>Add User</Link></li>
                <li><Link to={'/create-task'} onClick={this.handleClick}>Create Task</Link></li>
              </ul>
            </div>
            <div className='header-toggle-menu' role='button' onClick={this.toggleMenu}>
              <span className='menu-dash'></span>
              <span className='menu-dash'></span>
              <span className='menu-dash'></span>
            </div>
          </nav>
      </header>
    )
  } 

}

export default Header