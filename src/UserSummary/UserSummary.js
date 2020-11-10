import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './UserSummary.css'
import ITManagerContext from '../ITManagerContext'

class UserSummary extends Component{

  static contextType = ITManagerContext;

  state = {
    tasks: []
  }

  componentDidMount(){
    const tasks = this.context.tasks.filter(task => task.user_id === this.props.id)
    if(tasks){
      this.setState({
        tasks: tasks
      })
    }
  }

  render(){
    const { id, first_name, last_name, email, trade, role } = this.props
    const { os, version, memory, free_space } = this.props.workstation
    return(
      <div className={`UserSummary ${this.state.tasks.length !== 0 ? 'hasTasks' : ''}`}>
          <div className='usersum-details'>
                <ul>
                    <li><strong>First Name: </strong></li>
                    <li><strong>Last Name: </strong></li>
                    <li><strong>Email: </strong></li>
                    <li><strong>Trade: </strong></li>
                    <li><strong>Role: </strong></li>
                    <li><strong>OS: </strong></li>
                    <li><strong>Version: </strong></li>
                    <li><strong>Memory: </strong></li>
                    <li><strong>Free Space: </strong></li>
                </ul>
                <ul>
                    <li>{first_name}</li>
                    <li>{last_name}</li>
                    <li className='email'>{email}</li>
                    <li>{trade}</li>
                    <li>{role}</li>
                    <li>{os}</li>
                    <li>{version}</li>
                    <li>{`${memory}GB`}</li>
                    <li>{`${free_space}GB`}</li>
                </ul>
            </div>
            <div className='view-user-button'>
                <Link to={`/user/${id}`}><button>View</button></Link>
            </div>              
      </div>
    )
  } 

}

export default UserSummary