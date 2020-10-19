import React, {Component} from 'react'
import './CreateTask.css'

class CreateTask extends Component{

  render(){
    return(
      <div className='CreateTask'>
          <h1>Create Task</h1>
          <form>
              <input type='submit'/>
          </form>
      </div>
    )
  } 
  
}

export default CreateTask