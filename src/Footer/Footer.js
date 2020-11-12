import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'

class Footer extends Component{

  render(){
    return(
      <footer className='Footer'>
        <div className='footer-branding'>
          <div className='footer-logo'>
            <Link to={'/'}><img src={'./img/itm-logo.png'} alt={'IT Manager App Site Logo'}/></Link>
          </div>
          <div className='footer-copyright'>
            <p>© 2020 Santiago Gomez. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    )
  } 

}

export default Footer