import React from 'react';
import './App.css';
import UserList from './components/UserList/UserList'
import Menu from './components/Menu/Menu'
import Footer from './components/Footer/Footer'
import ProjectList from './components/ProjectList/ProjectList';
import TodoNoteList from './components/TodoNoteList';
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
            'firstname': ''
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
                this.setState({ 'firstname': response.data.results[0].firstName })
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
                                        projects={this.state.projects} /> :
                                    <p>Please authorize</p>} />
                            <Route
                                exact path='notes'
                                element={this.isAuth() ?
                                    <TodoNoteList
                                        todoNotes={this.state.todoNotes} /> :
                                    <p>Please authorize</p>} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </div>
                </BrowserRouter>
                <Footer className="Footer" />
            </div>
        )
    }
}

export default App;
