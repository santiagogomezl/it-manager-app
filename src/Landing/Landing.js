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
                    <span>Add and manage users</span><br/>
                    Onboard new users and allocate IT resources such as computers, laptops and other devices
                  </p>
                </li>
                <li>
                  <FontAwesomeIcon className={'fa-icon'} icon={faLaptop}/>
                  <p>
                    <span>Allocate IT resources</span><br/>
                     Assign workstations to users and maximize their usage. This will allow you to manage your budget properly  
                  </p>
                </li>
                <li>
                  <FontAwesomeIcon className={'fa-icon'} icon={faTasks} />
                  <p>
                    <span>Schedule tasks</span><br/>
                    Create tasks to make sure all current requirements are maintained. Schedule security and software tasks
                  </p>
                </li>
                <li>
                  <FontAwesomeIcon className={'fa-icon'} icon={faWrench} />
                  <p>
                    <span>Keep workstations up to date</span><br/>
                    Perform periodic updates by keeping track of hardware and software for all workstations
                  </p>
                </li>
              </ul>
            
          </div>
          <div className='landing-app-layout'>
            <div className={'layout-image'}>
              <img src={'./img/app-layout.png'} alt={'App Layout'}/>
            </div>
            <p>
                <span>Cloud Based IT Management App</span><br/>
                Easily access your resources<br/> anywhere whether on your<br/> desktop or mobile device
            </p>
          </div>
         
      </div>
    )
  } 

}

export default Landing