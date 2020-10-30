import React, {Component} from 'react'
import ITManagerContext from '../ITManagerContext'
import './CreateTask.css'
import { v4 as uuidv4 } from 'uuid';

class CreateTask extends Component{

  static contextType = ITManagerContext;

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
    else{
      this.props.history.push('/dashboard')
    }
  }


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
    alert(err);
}

  validateUserId(){
    if(this.state.userId.value === 'Select User...'){
      return <p className='form-error-msg'>{'Select a User from the list'}</p>  
    }
  }

  validateTaskDetails(){
    const taskDetails = this.state.taskDetails.value.trim();
    if(taskDetails.length === 0){
        return <p className='form-error-msg'>{'Task Details are required'}</p>  
    }
  }

  validateDueDate(){
    const dueDate = this.state.dueDate.value.trim();
    if(dueDate.length === 0){
        return <p className='form-error-msg'>{'Due Date is required'}</p>  
    }
  }

  handleSubmit(event, callback){
    event.preventDefault();
    //const modified = new Date().toISOString();

    const id = uuidv4()
    const userId = this.state.userId.value
    const taskDetails = this.state.taskDetails.value
    const statusCode = 1
    const dueDate = this.state.dueDate.value

    // const workstationId = Number(this.state.workstation.id)

    const task = { id, userId, taskDetails, statusCode, dueDate}
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify(note),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${config.API_KEY}`
    //   }
    // };

    // fetch(`${config.API_ENDPOINT}api/notes`, options)
    // .then(response => {
    //     if(!response.ok){
    //       throw new Error('Something went wrong');
    //     }
    //     return response;
    //   })
    //   .then(response => response.json())
      // .then(data => {
        callback(task);
        this.setState(
            {
                userId:{value:''},
                taskDetails:{value:''},
                dueDate:{value:''},
            }
        );
        this.props.history.push(`/user/${userId}`);
      //   }
      // )
      // .catch(err => this.displayError(err));
  }

  render(){

    const users = this.context.users.map((user) => {
      const userId = user.id
      const userName = `${user.firstName} ${user.lastName}`
      return(
          <option key={`${user.firstName}-${user.lastName}-${userId}`} value={`${userId}`}>{userName}</option>
      )
    })

    const date = new Date()
    const month = date.getUTCMonth() + 1
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()
    const minDate = `${year}-${month}-${day}`

    return(
      <ITManagerContext.Consumer>
            {(context) => (
            <div className='CreateTask'>
                <h1>Create Task</h1>
                <form className='task-form' onSubmit={e => this.handleSubmit(e, context.createTask)}>
                    <div className={`form-fieldset
                        ${this.state.userId.touched && this.validateUserId() ? 'form-error' : ''}`}
                    >
                        <label htmlFor='userId'>Choose an user:</label>
                        <select 
                            name='userId' 
                            id='userId'
                            onChange={e => this.updateUserId(e.target.value)}
                            value={this.state.userId.value}>
                            <option key={'select-userid'} id='select-userid'>Select User...</option>
                            {users}
                        </select> 
                    </div>
                    <div className={`form-fieldset 
                        ${this.state.taskDetails.touched && this.validateTaskDetails() ? 'form-error' : ''}`}
                    >
                        <label htmlFor='taskDetails'>Task Details</label>
                        <textarea  
                        id='taskDetails'
                        value={this.state.taskDetails.value}
                        onChange={e => this.updateTaskDetails(e.target.value)}>
                        </textarea>
                    </div>
                    <div className={`form-fieldset
                        ${this.state.dueDate.touched && this.validateDueDate() ? 'form-error' : ''}`}
                    >
                        <label htmlFor='dueDaue'>Choose an user:</label>
                        <input 
                            type='date'
                            name='dueDaue' 
                            id='dueDaue'
                            min={minDate}
                            onChange={e => this.updateDueDate(e.target.value)}
                            value={this.state.dueDate.value}/> 
                    </div>        
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