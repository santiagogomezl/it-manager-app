import React, {Component} from 'react'
import './EditUser.css'
import UserForm from '../UserForm/UserForm'

class EditUser extends Component{
  
  render(){
      return(
        <div className='EditUser'>
          <UserForm
            header={'Edit User'} 
            history={this.props.history} 
            match={this.props.match}/>
        </div>
      )
    }   
}

export default EditUser