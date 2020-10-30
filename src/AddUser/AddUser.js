import React, {Component} from 'react'
import './AddUser.css'
import UserForm from '../UserForm/UserForm'

class AddUser extends Component{
 
  render(){
    return(
      <div className='AddUser'>
        <UserForm
          header={'Add User'} 
          history={this.props.history} 
          match={this.props.match}/>
      </div>
    )
  } 
}

export default AddUser