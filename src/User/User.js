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
        const trade = this.context.trades.find(trade => trade.id === user.tradeId)
        const role = this.context.roles.find(role => role.id === user.roleId)
        const workstation = this.context.workstations.find(workstation => workstation.id === user.workstationId)
        this.setState({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            trade: trade.name,
            role: role.title,
            workstation:{
                id: workstation.id,
                hostName: workstation.hostName,
                os: workstation.os,
                version: workstation.version,
                memory: workstation.memory,
                freeSpace: workstation.freeSpace,
                hotfixId: workstation.hotfixId,
                hotfixInfo: workstation.hotfixInfo,
                hotfixDate: workstation.hotfixDate
            },
      })
      const tasks = this.context.tasks.filter((task) => String(task.userId) === String(user.id))
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
        <li key={`hotfix-${i}`}>{`${hotfixInfo} compleated on: ${hotfixDates[i]}`}</li>
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