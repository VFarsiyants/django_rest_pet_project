import React from 'react'
import { MultiSelect } from 'react-multi-select-component'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            repoLink: '',
            participants: []
        }
    }

    getUsersOptions(){
        let options = []
        for (let user of this.props.users){
            options.push({
                label: `${user.firstName} ${user.lastName}`,
                value: user.id
            })
        }
        return options
    }

    handleChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleSubmit(event) {
        event.preventDefault()
        let usersId = []
        for (let user of this.state.participants){
            usersId.push(user.value)
        }
        this.props.createProject(
            this.state.name, 
            this.state.repoLink,
            usersId
        )
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className='form-group'>
                    <label for="name">name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name"
                        value={this.state.name} 
                        onChange={(event)=>this.handleChange(event)} 
                    />
                </div>
                <div className='form-group'>
                    <label for="repoLink">repo link</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="repoLink"
                        value={this.state.repoLink} 
                        onChange={(event)=>this.handleChange(event)} 
                    />
                </div>
                <div className="form-group">
                    <label for="project">Project participants</label>
                    <MultiSelect
                        options={this.getUsersOptions()}
                        value={this.state.participants}
                        onChange={(event) => this.setState({participants: event})}
                        labelledBy="Select"
                        showSelectedItems="false"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        )
    }
}

export default ProjectForm