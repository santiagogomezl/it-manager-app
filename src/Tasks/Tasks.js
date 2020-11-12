import React, {Component} from 'react'
import ITManagerContext from '../ITManagerContext'
import './Tasks.css'
import config from '../config'

class Tasks extends Component{

    static contextType = ITManagerContext;

    state = {
        tasks: [],
        disabled: true
    }

    componentDidMount(){
        this.setState({
            tasks: this.props.tasks
        })
    }

    updateStatus(newStatusCode, taskId){
        let tasks = this.state.tasks 
        const taskIndex = tasks.indexOf(tasks.find(task => String(task.id) === String(taskId)))
        
        tasks[taskIndex].status_code = Number(newStatusCode)
        this.setState({
            tasks: tasks,
            disabled: false
        })
        
      }
      
      getStatus(taskId){
          const task = this.state.tasks.find(task => task.id === taskId)
          return task.status_code
      }

      handleSubmit(event, callback){
        event.preventDefault();
        const tasks = this.state.tasks

        tasks.forEach(task => {
                    
            let method
            task.status_code !== 3 ? method = 'PATCH' : method = 'DELETE'

            const options = {
                method: method,
                body: JSON.stringify(task),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.API_KEY}`
                }
            }
        
            fetch(`${config.API_ENDPOINT}api/tasks/${task.id}`, options)
            .then(response => {
                if(!response.ok){
                    throw new Error('Something went wrong');
                }
            })
            .catch(err => this.displayError(err));
        })

        callback(tasks);
        const updatedTasks = tasks.filter(task => task.status_code !== 3)
        this.setState(
            { 
                tasks: updatedTasks,
                disabled: true,
            }
        );
        //this.props.history.push(`/user/${this.state.id}`);

      }
    

    render(){

    let tasks
    if(this.state.tasks && this.state.tasks.length !== 0){
        tasks = this.state.tasks.map((task, i) => {
            
            return(
                <div className='form-fieldset user-task' key={`task-${task.id}`}>
                    <label htmlFor={`task-${task.id}`}>
                        <span>{`${task.task_details} due on ${task.due_date.substring(0, 10)} `}</span>
                    </label>
                    <select 
                        name={`task-${task.id}`} 
                        id={`task-${task.id}`}
                        onChange={e => this.updateStatus(e.target.value, task.id)}         
                        value={this.getStatus(task.id)}
                        >
                        <option value={1}>New</option>
                        <option value={2}>In progress</option>
                        <option value={3}>Completed</option>
                    </select>
                </div>
            )
        })
    }
    
    return(
        <ITManagerContext.Consumer>
        {(context) => (
            <div className='Tasks'>
                <form className='tasks-form' onSubmit={e => this.handleSubmit(e, context.updateTask)}>
                    {tasks}
                    <button type='submit' disabled={this.state.disabled}>
                        Save
                    </button>
                    <button type='reset'onClick={() => this.props.history.push('/dashboard')}>
                        Cancel
                    </button>

                </form>
            </div>
        )}
        </ITManagerContext.Consumer>

    )
  } 

}

export default Tasks