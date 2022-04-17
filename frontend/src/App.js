import React from 'react';
import './App.css';
import UserList from './components/UserList/UserList'
import Menu from './components/Menu/Menu'
import Footer from './components/Footer/Footer'
import ProjectList from './components/ProjectList/ProjectList';
import TodoNoteList from './components/TodoNoteList';
import TodoNoteForm from './components/TodoNoteForm';
import ProjectForm from './components/ProjectForm';
import axios from 'axios';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';


const NotFound = () => {
    let location = useLocation();
    return (
        <div>
            Page {location.pathname} not found
        </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todoNotes': [],
            'token': '',
            'firstname': '',
            'userId': null
        }
    }

    getToken(login, password) {
        axios
            .post('http://127.0.0.1:8000/api-token-auth/',
                {
                    username: login,
                    password: password
                }
            )
            .then(response => {
                localStorage.setItem('token', response.data['token'])
                this.setState({ token: response.data['token'] },
                    () => {
                        this.getData()
                        this.getFirstname(login)
                    })
            })
            .catch(error => console.log(error))
    }

    logOut() {
        this.setState({ token: '' }, this.getData)
        localStorage.setItem('token', '')
    }

    getHeader() {
        if (this.isAuth()) {
            return {
                'Authorization': `Token ${this.state.token}`
            }
        }
        return {}
    }

    getFirstname(login) {
        const headers = this.getHeader()
        axios
            .get(`http://localhost:8000/api/users/?username=${login}`, { headers })
            .then(response => {
                this.setState({ 'firstname': response.data.results[0].firstName,
                                'userId':  response.data.results[0].id})
            })
    }

    getData() {
        const headers = this.getHeader()
        axios
            .get('http://127.0.0.1:8000/api/users/', { headers })
            .then(response => {
                const users = response.data.results
                this.setState({
                    'users': users
                })

            })
            .catch(error => {
                this.setState({ 'users': [] })
                console.log(error)
            })
        axios
            .get('http://127.0.0.1:8000/api/projects/', { headers })
            .then(response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects
                })

            })
            .catch(error => {
                this.setState({ 'projects': [] })
                console.log(error)
            })
        axios
            .get('http://127.0.0.1:8000/api/todo_notes/', { headers })
            .then(response => {
                const todoNotes = response.data.results
                this.setState({
                    'todoNotes': todoNotes
                })

            })
            .catch(error => {
                this.setState({ 'todoNotes': [] })
                console.log(error)
            })
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({ 'token': token }, this.getData)
    }

    isAuth() {
        return !!this.state.token
    }

    deleteNote(id){
        const headers = this.getHeader()
        axios.delete(`http://127.0.0.1:8000/api/todo_notes/${id}/`, { headers })
            .then(response => {
                this.setState({todoNotes: this.state.todoNotes.filter((note)=>
                    note.id !== id)})
                })
            .catch(error => console.log(error))
    }

    deleteProject(id){
        const headers = this.getHeader()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, { headers })
            .then(response => {
                this.setState({projects: this.state.projects.filter((project)=>
                    project.id !== id)})
                })
            .catch(error => console.log(error))
    }

    createNote(text, project) {
        let headers = this.getHeader()
        let data = {
            closed: false,
            text: text, 
            projectId: project,
            userId: this.state.userId
        }
        axios.post('http://127.0.0.1:8000/api/todo_notes/', data, { headers })
        .then(response => {
            let newNote = response.data
            this.setState({todoNotes: [...this.state.todoNotes, newNote]})
        .catch(error => console.log(error))
        })
    }

    createProject(name, repoLink, usersId) {
        let headers = this.getHeader()
        let data = {
            name: name,
            repoLink: repoLink,
            userId: usersId
        }
        axios.post('http://127.0.0.1:8000/api/projects/', data, { headers })
        .then(response => {
            let newProject = response.data
            this.setState({projects: [...this.state.projects, newProject]})
        .catch(error => console.log(error))
        })
    }

    render() {
        return (
            <div className="Wrapper">
                <BrowserRouter>
                    <Menu
                        isAuthenticated={() =>
                            this.isAuth()}
                        login={(login, password) =>
                            this.getToken(login, password)}
                        logout={() => this.logOut()}
                        firstname={this.state.firstname} />
                    <div className="Content">
                        <Routes>
                            <Route
                                exact path='/'
                                element={this.isAuth() ?
                                    <UserList
                                        users={this.state.users} /> :
                                    <p>Please authorize</p>} />
                            <Route
                                exact path='projects'
                                element={this.isAuth() ?
                                    <ProjectList
                                        projects={this.state.projects} 
                                        deleteProject={(id) => this.deleteProject(id)}/> :
                                    <p>Please authorize</p>} />
                            <Route
                                exact path='notes'
                                element={this.isAuth() ?
                                    <TodoNoteList
                                        todoNotes={this.state.todoNotes} 
                                        deleteNote={(id) => this.deleteNote(id)}/> :
                                    <p>Please authorize</p>} />
                            <Route path='*' element={<NotFound />} />
                            <Route
                                exact path='/projects/:id'
                                element={this.isAuth() ?
                                    <TodoNoteList
                                        todoNotes={this.state.todoNotes} 
                                        deleteNote={(id) => this.deleteNote(id)}/> :
                                    <p>Please authorize</p>} />
                            <Route path='*' element={<NotFound />} />
                            <Route 
                                exact path='/notes/create' 
                                element = {<TodoNoteForm 
                                                createNote={(text, project) => 
                                                    this.createNote(text, project)}
                                                projects={this.state.projects}
                                            />}
                            />
                            <Route 
                                exact path='/projects/create' 
                                element = {<ProjectForm 
                                                createProject={(name, repoLink, usersId) => 
                                                    this.createProject(name, repoLink, usersId)}
                                                users={this.state.users}
                                            />}
                            />
                        </Routes>
                    </div>
                </BrowserRouter>
                <Footer className="Footer" />
            </div>
        )
    }
}

export default App;
