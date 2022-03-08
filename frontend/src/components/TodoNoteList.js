const UserItem = ({ todoNote }) => {
    return (
        <tr>
            <td>
                {todoNote.text}
            </td>
            <td>
                {todoNote.projectId}
            </td>
            <td>
                {todoNote.userId}
            </td>
        </tr>
    )
}


const TodoNoteList = ({ todoNotes }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Text
                    </th>
                    <th>
                        ProjectId
                    </th>
                    <th>
                        UserId
                    </th>
                </tr>
            </thead>
            <tbody>
                {todoNotes.map((todoNote) => <UserItem todoNote={todoNote} />)}
            </tbody>
        </table>
    )
}

export default TodoNoteList