import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList/UserList'
import Menu from './components/Menu/Menu'
import Footer from './components/Footer/Footer'
import ProjectList from './components/ProjectList/ProjectList';
import TodoNoteList from './components/TodoNoteList';
import axios from 'axios';
import { HashRouter, BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';


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
            'todoNotes': []
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results
                this.setState({
                    'users': users
                })

            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects
                })

            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/todo_notes/')
            .then(response => {
                const todoNotes = response.data.results
                this.setState({
                    'todoNotes': todoNotes
                })

            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="Wrapper">
                <BrowserRouter>
                    <Menu />
                    <div className="Content">
                        <Routes>
                            <Route exact path='/' element={<UserList users={this.state.users} />} />
                            <Route exact path='projects' element={<ProjectList projects={this.state.projects} />} />
                            <Route exact path='notes' element={<TodoNoteList todoNotes={this.state.todoNotes} />} />
                            {/* <Route path='projects/project_notes/:name' element={<ProjectTodoList todoNotes={this.state.todoNotes} />} /> */}
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
