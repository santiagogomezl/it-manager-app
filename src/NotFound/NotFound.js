import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './NotFound.css'

class NotFound extends Component{


  render(){
    return(
      <div className='NotFound'>
        <div>
          <img src='img/notfound-image.png' alt={'Something went wrong. Page not found'}></img>
          <h1>Oh no! Something went wrong</h1>
          <p>Go back to the <Link to='/'>landing page</Link></p>
        </div>
      </div>
    )
  } 

}

export default NotFound