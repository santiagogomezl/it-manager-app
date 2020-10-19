import React, {Component} from 'react'
import './AddUser.css'

class AddUser extends Component{

  render(){
    return(
      <div className='AddUser'>
          <form className='add-user-form'>
              Add User
              <input type='text'/>
              <input type='submit'/>
          </form>
      </div>
    )
  } 

}

export default AddUser