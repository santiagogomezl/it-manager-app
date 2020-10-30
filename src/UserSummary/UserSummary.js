import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './UserSummary.css'

class UserSummary extends Component{

  render(){
    const { id, firstName, lastName, email, trade, role } = this.props
    const { os, version, memory, freeSpace } = this.props.workstation
    return(
      <div className='UserSummary'>
          <div className='user-details'>
                <ul className='user-detail-type'>
                    <li>First Name:</li>
                    <li>Last Name:</li>
                    <li>Email:</li>
                    <li>Trade:</li>
                    <li>Role</li>
                    <li>OS:</li>
                    <li>Version:</li>
                    <li>Memory:</li>
                    <li>Free Space:</li>
                </ul>
                <ul className='user-detail-data'>
                    <li>{firstName}</li>
                    <li>{lastName}</li>
                    <li>{email}</li>
                    <li>{trade}</li>
                    <li>{role}</li>
                    <li>{os}</li>
                    <li>{version}</li>
                    <li>{`${memory}GB`}</li>
                    <li>{`${freeSpace}GB`}</li>
                </ul>
            </div>
                <Link to={`/user/${id}`}><button>View</button></Link>
                <Link to={`/edit-user/${id}`}><button>Edit</button></Link>              
      </div>
    )
  } 

}

export default UserSummary