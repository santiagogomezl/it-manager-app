import React, {Component} from 'react'
import './Dashboard.css'
import ITManagerContext from '../ITManagerContext'
import UserSummary from '../UserSummary/UserSummary'
import { Link } from 'react-router-dom';

class Dashboard extends Component{

  static contextType = ITManagerContext;

  render(){
    let content = []

    content = [content, this.context.users.map((user) => {
      const key = `user-${user.id}`
      const trade = this.context.trades.find( trade => trade.id === user.tradeId)
      const role = this.context.roles.find( role => role.id === user.roleId)
      const workstation = this.context.workstations.find( workstation => workstation.id === user.workstationId)
      return(<UserSummary key={key} {...user} trade={trade.name} role={role.title} workstation={workstation}/>)
    })
  ]

    return(
      <div className='Dashboard'>
        <div className='dashboard-header'>
            <h1>IT Manager</h1>
            <div className='dashboard-filter'>
                <form>
                Filter Results Form
                </form>
            </div>
            <div className='dashboard-add-button'>
              <Link to={'/add-user'}><button>Add User</button></Link>
            </div>
        </div>
        <div className='dashboard-body'>
          {content}
        </div>
        <div>

        </div>
      </div>
    )
  } 

}

export default Dashboard