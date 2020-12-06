import React, {Component} from 'react'
import ITManagerContext from '../ITManagerContext'
import './CreateTask.css'
import config from '../config'

class CreateTask extends Component{

  static contextType = ITManagerContext

  state = { 
    userId: {
      value: '',
      touched: false
    },
    taskDetails: {
        value: '',
        touched: false
    },
    dueDate: {
      value: '',
      touched: false
    }
  }

  componentDidMount(){
    const users = this.context.users
    if(users.length !== 0){
      const search = this.props.location.search
      if(search !== ''){
        const params = JSON.parse('{"' + decodeURI(search).replace(/[?]/g, '').replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        const user = users.find(user => String(user.id) === params.userid)
        this.setState({
          userId: { value:user.id }
        })
      }else{
        this.props.history.push('/create-task')
      }
    }  
    else if(this.props.history){
      this.props.history.push('/dashboard')
    }
  }

  //Functions to update component state
  updateUserId(userId){
    this.setState({
      userId: {value: userId, touched: true}
    })
  }

  updateTaskDetails(taskDetails){
    this.setState({
      taskDetails: {value: taskDetails, touched: true}
    })
  }

  updateDueDate(dueDate){
    this.setState({
      dueDate: {value: dueDate, touched: true}
    })
  }

  displayError(err){
    alert(err)
}

  //Functions to validate users input
  validateUserId(){
    if(this.state.userId.value === 'Select User...'){
      return <p className='form-error-msg'>{'Select a User from the list'}</p>  
    }
  }

  validateTaskDetails(){
    const taskDetails = this.state.taskDetails.value.trim()
    if(taskDetails.length === 0){
        return <p className='form-error-msg'>{'Task Details are required'}</p>  
    }
  }

  validateDueDate(){
    const dueDate = this.state.dueDate.value.trim()
    if(dueDate.length === 0){
        return <p className='form-error-msg'>{'Due Date is required'}</p>  
    }
  }

  //POST new task to database and update IT Manager context
  handleSubmit(event, callback){
    event.preventDefault()

    const user_id = this.state.userId.value
    const task_details = this.state.taskDetails.value
    const status_code = 1
    const due_date = this.state.dueDate.value

    const task = { user_id, task_details, status_code, due_date}
    const options = {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    }

    fetch(`${config.API_ENDPOINT}api/tasks`, options)
    .then(response => {
        if(!response.ok){
          throw new Error('Something went wrong')
        }
        return response
      })
      .then(response => response.json())
      .then(data => {
        callback(data)
        this.setState(
            {
                userId:{value:''},
                taskDetails:{value:''},
                dueDate:{value:''},
            }
        )
        this.props.history.push(`/user/${user_id}`)
        }
      )
      .catch(err => this.displayError(err))
  }

  render(){

    const users = this.context.users.map((user) => {
      const userId = user.id
      const userName = `${user.first_name} ${user.last_name}`
      return(
          <option key={`${user.first_name}-${user.last_name}-${userId}`} value={`${userId}`}>{userName}</option>
      )
    })

    //Renders date input on form with min date
    const date = new Date()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    const year = date.getFullYear()
    const minDate = `${year}-${month}-${day}`

    return(
      <ITManagerContext.Consumer>
            {(context) => (
            <div className='CreateTask'>
                <h1>Create Task</h1>
                <form className='task-form' onSubmit={e => this.handleSubmit(e, context.createTask)}>
                    
                        <label htmlFor='userId'>Choose an user:</label>
                        <select 
                            name='userId' 
                            id='userId'
                            onChange={e => this.updateUserId(e.target.value)}
                            value={this.state.userId.value}
                            className={`${this.state.userId.touched && this.validateUserId() ? 'form-error' : ''}`}>
                            <option key={'select-userid'} id='select-userid'>Select User...</option>
                            {users}
                        </select> 
                    
                        <label htmlFor='taskDetails'>Task Details</label>
                        <textarea  
                        id='taskDetails'
                        value={this.state.taskDetails.value}
                        onChange={e => this.updateTaskDetails(e.target.value)}
                        className={`${this.state.taskDetails.touched && this.validateTaskDetails() ? 'form-error' : ''}`}>
                        </textarea>
                    
                        <label htmlFor='dueDate'>Choose a date:</label>
                        <input 
                            type='date'
                            name='dueDate' 
                            id='dueDate'
                            min={minDate}
                            onChange={e => this.updateDueDate(e.target.value)}
                            value={this.state.dueDate.value}
                            className={`${this.state.dueDate.touched && this.validateDueDate() ? 'form-error' : ''}`}
                            /> 
                    <button 
                        type='submit'
                        disabled={
                            this.validateUserId() ||
                            this.validateTaskDetails() ||
                            this.validateDueDate()
                        }
                        >
                        Create Task
                    </button>
                    <button type='reset'
                    onClick={() => this.props.history.push('/dashboard')}
                    >Cancel
                    </button>

                    <div>
                        {this.state.userId.touched && this.validateUserId()}
                        {this.state.taskDetails.touched && this.validateTaskDetails()}
                        {this.state.dueDate.touched && this.validateDueDate()}
                    </div>
                </form>
            </div>
            )}
        </ITManagerContext.Consumer>
    )
  } 
  
}

export default CreateTask