import React, {Component} from 'react'
import './AddUser.css'
import UserForm from '../UserForm/UserForm'

class AddUser extends Component{
 
  //Renders UserForm to add user to database
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