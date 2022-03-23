import './UserList.css';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';


const UserItem = ({ user }) => {
    return (
        <tr>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}


const UserList = ({ users }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        First name
                    </th>
                    <th>
                        Last name
                    </th>
                    <th>
                        email
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => <UserItem user={user} key={nanoid()} />)}
            </tbody>
        </table>
    )
}

export default UserList