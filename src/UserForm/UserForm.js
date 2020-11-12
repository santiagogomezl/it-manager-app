import React, {Component} from 'react'
import ITManagerContext from '../ITManagerContext'
import './UserForm.css'
import config from '../config'


class UserForm extends Component{

static contextType = ITManagerContext;

state = { 
    id: '',
    firstName: {
      value: '',
      touched: false
    },
    lastName: {
        value: '',
        touched: false
    },
    email:{
        value:'',
        touched: false
    },
    tradeId: {
      value: '',
      touched: false
    },
    roleId: {
        value: '',
        touched: false
    },
    workstation: {
      id:'',
      hostName: '',
      os: '',
      version: '',
      memory: '',
      freeSpace: '',
      touched: false
    }
}

componentDidMount(){
    const user = this.context.users.find(user => this.props.match.params.id === String(user.id))
    if(user){
        const workstation = this.context.workstations.find(workstation => workstation.id === user.workstation_id)
        this.setState({
            id: user.id,
            firstName: {value: user.first_name},
            lastName: {value: user.last_name},
            email: {value: user.email},
            tradeId: {value: user.trade_id},
            roleId: {value: user.role_id},
            workstation:{
                id: workstation.id,
                hostName: workstation.host_name,
                os: workstation.os,
                version: workstation.version,
                memory: workstation.memory,
                freeSpace: workstation.free_space,
            }
      })
    }
}


updateFirstName(firstName){
    this.setState({
        firstName: {value: firstName, touched: true}
    })
  }

updateLastName(lastName){
    this.setState({
        lastName: {value: lastName, touched: true}
    })
}

updateEmail(email){
    this.setState({
        email: {value: email, touched: true}
    })
}

updateTrade(tradeId){
    this.setState({
        tradeId: {value: tradeId, touched: true}
    })
}

updateRole(roleId){
    this.setState({
        roleId: {value: roleId, touched: true}
    })
}

updateWorkstation(workstationId){
    if(workstationId !== 'Select Workstation...'){
        const workstation = this.context.workstations.find(workstation => Number(workstationId) === workstation.id)
        this.setState({
            workstation: {
                id: Number(workstation.id), 
                hostName: workstation.host_name,
                os: workstation.os,
                version: Number(workstation.version),
                memory: Number(workstation.memory),
                freeSpace: Number(workstation.free_space),
                touched: true
            }
        })
    }else{
        this.setState({
            workstation: {
                id: '', 
                hostName: '',
                os: '',
                version: '',
                memory: '',
                freeSpace: '',
                touched: true
            }
        })
    }
}

displayError(err){
    alert(err);
}

validateFirstName(){
    const firstName = this.state.firstName.value.trim();
    if(firstName.length === 0){
        return <p className='form-error-msg'>{'First Name is required'}</p>  
    }
}

validateLastName(){
    const lastName = this.state.lastName.value.trim();
    if(lastName.length === 0){
        return <p className='form-error-msg'>{'Last Name is required'}</p>  
    }
}

validateEmail(){
    const email = this.state.email.value.trim();
    const re = /\S+@\S+\.\S+/;
    if(!re.test(email)){
        return <p className='form-error-msg'>{'Email is required. Make sure it is a valid email format'}</p>  
    }
}

validateTrade(){
    if(this.state.tradeId.value === 'Select Trade...'){
        return <p className='form-error-msg'>{'Select a Trade from the list'}</p>  
    }
}

validateRole(){
    if(this.state.roleId.value === 'Select Role...'){
        return <p className='form-error-msg'>{'Select a Role from the list'}</p>  
    }
}

validateWorkstation(){
    if(this.state.workstation.id === ''){
        return <p className='form-error-msg'>{'Select a Workstation from the list'}</p>  
    }
}

handleSubmit(event, callback){
    event.preventDefault();

    const first_name = this.state.firstName.value
    const last_name = this.state.lastName.value
    const email = this.state.email.value
    const trade_id = Number(this.state.tradeId.value)
    const role_id = Number(this.state.roleId.value)
    const workstation_id = Number(this.state.workstation.id)

    if(this.props.header === 'Add User'){

        const method = 'POST'
        const user = { first_name, last_name, email, trade_id, role_id, workstation_id}
        const path = `${config.API_ENDPOINT}api/users`

        const options = {
            method: method,
            body: JSON.stringify(user),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`
            }
          };
      
          fetch(path, options)
          .then(response => {
              if(!response.ok){
                throw new Error('Something went wrong');
              }
              return response;
            })
            .then(response => response.json())
            .then(data => {
              callback(data);
              this.setState(
                  {
                      id:'',
                      folderId:{value:''},
                      lastName:{value:''},
                      email:{value:''},
                      tradeId:{value:''},
                      roleId:{value:''},
                      workstation:{
                        id:'',
                        hostName: '',
                        os: '',
                        version: '',
                        memory: '',
                        freeSpace: '',
                      },
                  }
              );
              this.props.history.push(`/dashboard`);
              }
            )
            .catch(err => this.displayError(err));


    }else if(this.props.header === 'Edit User'){

        const id = Number(this.state.id)
        const method = 'PATCH'
        const user = { id, first_name, last_name, email, trade_id, role_id, workstation_id}
        const path = `${config.API_ENDPOINT}api/users/${id}`


        const options = {
            method: method,
            body: JSON.stringify(user),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`
            }
          };
      
        fetch(path, options)
        .then(response => {
            if(!response.ok){
                throw new Error('Something went wrong');
            }
            callback(user);
            this.setState(
                {
                    id:'',
                    folderId:{value:''},
                    lastName:{value:''},
                    email:{value:''},
                    tradeId:{value:''},
                    roleId:{value:''},
                    workstation:{
                    id:'',
                    hostName: '',
                    os: '',
                    version: '',
                    memory: '',
                    freeSpace: '',
                    },
                }
            );
            this.props.history.push(`/dashboard`);
            }
        )
        .catch(err => this.displayError(err));
    }
  }

handleDelete(id, callback){

        const method = 'DELETE'
        const path = `${config.API_ENDPOINT}api/users/${id}`

        const options = {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`
            }
          };
      
          fetch(path, options)
          .then(response => {
            if(!response.ok){
                throw new Error('Something went wrong');
            }
            callback(id);
            this.setState(
                {
                    id:'',
                    folderId:{value:''},
                    lastName:{value:''},
                    email:{value:''},
                    tradeId:{value:''},
                    roleId:{value:''},
                    workstation:{
                    id:'',
                    hostName: '',
                    os: '',
                    version: '',
                    memory: '',
                    freeSpace: '',
                    },
                }
            );
            this.props.history.push(`/dashboard`);
            }
        )
        .catch(err => this.displayError(err));

}

render(){
    const trades = this.context.trades.map((trade) => {
        const tradeId = trade.id
        const tradeName = trade.name
        return(
            <option key={`${tradeName}-${tradeId}`} value={`${tradeId}`}>{tradeName}</option>
        );
    });
    const roles = this.context.roles.map((role) => {
        const roleId = role.id
        const roleTitle = role.title
        return(
            <option key={`${roleTitle}-${roleId}`} value={`${roleId}`}>{roleTitle}</option>
        );
    });
    const workstations = this.context.workstations.map((workstation) => {
        const workstationId = workstation.id
        const hostName = workstation.host_name
        return(
            <option key={`${hostName}-${workstationId}`} value={`${workstationId}`}>{hostName}</option>
        );
    });

    return(
        <ITManagerContext.Consumer>
            {(context) => (
            <div className='UserForm'>
                <h1>{this.props.header}</h1>
                <form className='user-form' onSubmit={e => 
                    this.handleSubmit(e, this.props.header === 'Add User' ? context.addUser : context.editUser)
                }>
            
                        <label htmlFor='firstName'>First Name</label>
                        <input  
                        id='firstName'
                        value={this.state.firstName.value}
                        onChange={e => this.updateFirstName(e.target.value)}
                        className={`${this.state.firstName.touched && this.validateFirstName() ? 'form-error' : ''}`}/>
                    
                        <label htmlFor='lastName'>Last Name</label>
                        <input  
                        id='lastName'
                        value={this.state.lastName.value}
                        onChange={e => this.updateLastName(e.target.value)}
                        className={`${this.state.lastName.touched && this.validateLastName() ? 'form-error' : ''}`}/>
                    
                        <label htmlFor='email'>Email</label>
                        <input  
                        id='email'
                        value={this.state.email.value}
                        onChange={e => this.updateEmail(e.target.value)}
                        className={`${this.state.email.touched && this.validateEmail() ? 'form-error' : ''}`}/>
                    
                        <label htmlFor='trade'>Choose a trade:</label>
                        <select 
                            name='trade' 
                            id='trade'
                            onChange={e => this.updateTrade(e.target.value)}
                            value={this.state.tradeId.value}
                            className={`${this.state.tradeId.touched && this.validateTrade() ? 'form-error' : ''}`}>
                            <option key={'select-trade'} id='select-trade'>Select Trade...</option>
                            {trades}
                        </select>

                        <label htmlFor='role'>Choose a role:</label>
                        <select 
                            name='role' 
                            id='role'
                            onChange={e => this.updateRole(e.target.value)}
                            value={this.state.roleId.value}
                            className={`${this.state.roleId.touched && this.validateRole() ? 'form-error' : ''}`}>
                            <option key={'select-role'} id='select-role'>Select Role...</option>
                            {roles}
                        </select>  

                        <label htmlFor='workstation'>Choose a workstation:</label>
                        <select 
                            name='workstation' 
                            id='workstation'
                            onChange={e => this.updateWorkstation(e.target.value)}
                            value={this.state.workstation.id}
                            className={`${this.state.workstation.touched && this.validateWorkstation() ? 'form-error' : ''}`}>
                            <option key={'select-workstation'} id='select-workstation'>Select Workstation...</option>
                            {workstations}
                        </select> 
                        <ul className='workstation-details'>
                            <li><strong>OS: </strong>{this.state.workstation.os}</li>
                            <li><strong>Version: </strong>{this.state.workstation.version}</li>
                            <li><strong>Memory: </strong>{this.state.workstation.memory ? `${this.state.workstation.memory}GB`: ''}</li>
                            <li><strong>Free Space: </strong>{this.state.workstation.freeSpace ? `${this.state.workstation.freeSpace}GB`: ''}</li>
                        </ul>
                    <button 
                        type='submit'
                        disabled={
                            this.validateFirstName() ||
                            this.validateLastName() ||
                            this.validateEmail() ||
                            this.validateTrade() ||
                            this.validateRole() ||
                            this.validateWorkstation()
                        }
                        >
                        {this.props.header === 'Edit User' ? 'Confirm':'Add User'}
                    </button>
                    <button type='reset'
                    onClick={() => this.props.history.push('/dashboard')}
                    >Cancel
                    </button>

                    {this.props.header === 'Edit User' ?
                    <button type='button'
                        onClick={() => this.handleDelete(Number(this.state.id), context.deleteUser)}
                        >Delete
                    </button>
                    : '' 
                    }
                    <div>
                        {this.state.firstName.touched && this.validateFirstName()}
                        {this.state.lastName.touched && this.validateLastName()}
                        {this.state.email.touched && this.validateEmail()}
                        {this.state.tradeId.touched && this.validateTrade()}
                        {this.state.roleId.touched && this.validateRole()}
                        {this.state.workstation.touched && this.validateWorkstation()}
                    </div>
                </form>
            </div>
            )}
        </ITManagerContext.Consumer>
    )}
}

export default UserForm