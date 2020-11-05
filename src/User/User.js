import React, {Component} from 'react'
import ITManagerContext from '../ITManagerContext'
import {Link} from 'react-router-dom'
import Tasks from '../Tasks/Tasks'
import './User.css'

class User extends Component{

  static contextType = ITManagerContext;

  state = { 
    id: '',
    firstName: '',
    lastName: '',
    email:'',
    trade: '',
    role: '',
    workstation: {hotfixId:''},
    tasks: [],
    disabled: true
  }

  componentDidMount(){
    const user = this.context.users.find(user => this.props.match.params.id === String(user.id))
    if(user){
        const trade = this.context.trades.find(trade => trade.id === user.trade_id)
        const role = this.context.roles.find(role => role.id === user.role_id)
        const workstation = this.context.workstations.find(workstation => workstation.id === user.workstation_id)
        this.setState({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            trade: trade.name,
            role: role.title,
            workstation:{
                id: workstation.id,
                hostName: workstation.host_name,
                os: workstation.os,
                version: workstation.version,
                memory: workstation.memory,
                freeSpace: workstation.free_space,
                hotfixId: workstation.hotfix_id,
                hotfixInfo: workstation.hotfix_info,
                hotfixDate: workstation.hotfix_date
            },
      })
      const tasks = this.context.tasks.filter((task) => String(task.user_id) === String(user.id))
      if(tasks){this.setState({ tasks: tasks})}
    }else{
      this.props.history.push('/dashboard')
    }
  }

  render(){

    let hotFixes
    if(this.state.workstation.hotfixId.length !== 0){
      const hotfixInfos = this.state.workstation.hotfixInfo
      const hotfixDates = this.state.workstation.hotfixDate
      hotFixes = hotfixInfos.map((hotfixInfo,i) => {
        return(
        <li key={`hotfix-${i}`}>{`${hotfixInfo} compleated on: ${hotfixDates[i].substring(0, 10)}`}</li>
        )
      })
    }
  
    return(
      <div className='User'>
          <h1>{`${this.state.firstName} ${this.state.lastName}`}</h1>
          <section className='user-info'>
              <h2>User Info</h2>
              <div className='user-details'>
                <ul className='user-detail-type'>
                    <li>First Name:</li>
                    <li>Last Name:</li>
                    <li>Email:</li>
                    <li>Trade:</li>
                    <li>Role</li>
                </ul>
                <ul className='user-detail-data'>
                    <li>{this.state.firstName}</li>
                    <li>{this.state.lastName}</li>
                    <li>{this.state.email}</li>
                    <li>{this.state.trade}</li>
                    <li>{this.state.role}</li>
                </ul>
            </div>
          </section>
          
          {this.state.tasks.length !== 0 ?
          <section className='tasks-info'>
              <h2>Tasks</h2>
              <Tasks tasks={this.state.tasks} history={this.props.history}/> 
          </section>
          : ''
          }
          
          {this.state.workstation.hotfixId.length !== 0 ?
          <section className='tasks-history'>
            <h2>Tasks History</h2>
            <ul>
              {hotFixes}
            </ul>
          </section>
          : ''
          }
          <Link to={`/create-task?userid=${this.state.id}`}><button>Create Task</button></Link>               
          <Link to={`/edit-user/${this.state.id}`}><button>Edit User</button></Link>
      </div>
    )
  } 

}

export default User