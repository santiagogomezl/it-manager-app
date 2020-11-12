import React, {Component} from 'react'
import './Dashboard.css'
import ITManagerContext from '../ITManagerContext'
import UserSummary from '../UserSummary/UserSummary'

class Dashboard extends Component{


  constructor(props) {
    super(props);
    this.state = {
      users: [],
      trades: [],
      roles:[],
      workstations: [],
      tasks: [],
    }
  }

  static contextType = ITManagerContext;

  componentDidMount(){
      this.setState({
        users: this.context.users,
        trades: this.context.trades,
        roles:this.context.roles,
        workstations: this.context.workstations,
        tasks: this.context.tasks
      })
  }

  render(){

    let content = []
    
    if(this.context.users.length !== 0){
      content = [content, this.state.users.map((user) => {
        const key = `user-${user.id}`
        const trade = this.state.trades.find( trade => trade.id === user.trade_id)
        const role = this.state.roles.find( role => role.id === user.role_id)
        const workstation = this.state.workstations.find( workstation => workstation.id === user.workstation_id)
        return(<UserSummary key={key} {...user} trade={trade.name} role={role.title} workstation={workstation}/>)
        })
      ]
    }else if(this.props.history){
      this.props.history.push(`/`);
    }

    return(
      <div className='Dashboard'>
        <div className='dashboard-header'>
            <h1>Dashboard</h1>
            <ul className='user-details-header'>
                    <li>First Name</li>
                    <li>Last Name</li>
                    <li className='email'>Email</li>
                    <li>Trade</li>
                    <li>Role</li>
                    <li>OS</li>
                    <li>Version</li>
                    <li>Memory</li>
                    <li>Free Space</li>
            </ul>
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