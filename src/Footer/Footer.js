import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'

class Footer extends Component{

  render(){
    return(
      <footer className='Footer'>
        <div className='footer-branding'>
          <span><Link to={'/'}>IT Manager App</Link></span>
          <p>© 2020 Santiago Gomez. All Rights Reserved.</p>
        </div>
      </footer>
    )
  } 

}

export default Footer