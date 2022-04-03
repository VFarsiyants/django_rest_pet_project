import './Menu.css';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="Menu">
            <div className='MenuHeader'>
                <h1>Vladislav Farsiyants'</h1>
                <h2>pet project</h2>
            </div>
            <nav className='MenuLinks'>
                <li><Link to='/' className='MenuLink'>Users</Link></li>
                <li><Link to='/projects' className='MenuLink'>Projects</Link></li>
                <li><Link to='/notes' className='MenuLink'>ToDo notes</Link></li>
            </nav>
        </div>
    )
}

export default Menu
