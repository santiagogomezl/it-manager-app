import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptop, faTasks, faUsersCog, faWrench } from '@fortawesome/free-solid-svg-icons'
import './Landing.css'

class Landing extends Component{

  render(){
    return(
      <div className='Landing'>
          <div className='landing-hero'>
            <div className='hero'>
              <h1>Manage your IT resources with ease<br/>No more spreadsheets</h1>
            </div>
          </div>
          <div className='landing-features'>
            {/* <h2>Features</h2> */}
              <ul>
                <li>
                  <FontAwesomeIcon className={'fa-icon'} icon={faUsersCog}/>
                  <p>
                    <strong>Add and manage users</strong><br/>
                    Onboard new users and allocate IT resources such as computers, laptops and other devices
                  </p>
                </li>
                <li>
                  <FontAwesomeIcon className={'fa-icon'} icon={faLaptop}/>
                  <p>
                    <strong>Allocate IT resources</strong><br/>
                     Asign workstations to users and maximize their usage. This will allow you to manage your budget properly  
                  </p>
                </li>
                <li>
                  <FontAwesomeIcon className={'fa-icon'} icon={faTasks} />
                  <p>
                    <strong>Schedule tasks</strong><br/>
                    Create task to make sure all current requirements are maintained. Schedule security and software tasks
                  </p>
                </li>
                <li>
                  <FontAwesomeIcon className={'fa-icon'} icon={faWrench} />
                  <p>
                    <strong>Keep workstations up to date</strong><br/>
                    Perform periodic updates by keeping track of hardware and software for all workstations
                  </p>
                </li>
              </ul>
            
          </div>
          <div className='landing-app-layout'>
            <img src={'./img/app-layout.png'} />
            <p>
                <span>Cloud Based Management App</span><br/>
                Easily access your resources<br/> anywhere whether on your<br/> mobile device or desktop
            </p>
          </div>
         
      </div>
    )
  } 

}

export default Landing