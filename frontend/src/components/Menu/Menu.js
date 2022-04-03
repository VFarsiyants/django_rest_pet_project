import './Menu.css';
import { Link } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import { useState } from 'react';

const Menu = (props) => {
    const [loginFormVisible, setLoginForomVisible] = useState(false)
    function toogleLoginForm() {
        setLoginForomVisible(prevState => !prevState)
    }
    return (
        <div className="Menu">
            {props.isAuthenticated() ?
                <div className='MenuHeader'>
                    <p>Hello,</p>
                    <h1>{props.firstname}</h1>
                </div>
                :
                <div className='MenuHeader'>
                    <h1>Vladislav Farsiyants'</h1>
                    <h2>pet project</h2>
                </div>
            }
            <nav className='MenuLinks'>
                <li><Link to='/' className='MenuLink'>Users</Link></li>
                <li><Link to='/projects' className='MenuLink'>Projects</Link></li>
                <li><Link to='/notes' className='MenuLink'>ToDo notes</Link></li>
                <li className='MenuLink LoginLink'>
                    <button onClick={props.isAuthenticated() ?
                        props.logout :
                        toogleLoginForm}>
                        {props.isAuthenticated() ? 'Logout' : 'Login'}
                    </button>
                    {loginFormVisible && !props.isAuthenticated() &&
                        <LoginForm
                            login={props.login} />}
                </li>
            </nav>
        </div>
    )
}

export default Menu
