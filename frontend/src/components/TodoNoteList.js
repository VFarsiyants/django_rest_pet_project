import { Link, useParams } from "react-router-dom"

const NoteItem = ({ todoNote, deleteNote }) => {
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
            <td>
                <button 
                    type="button"
                    onClick={() => deleteNote(todoNote.id)}    
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}


const TodoNoteList = ({ todoNotes, deleteNote }) => {
    let { id } = useParams();
    let filteredNotes = id 
        ? 
        todoNotes.filter((note) => note.projectId == id && !note.closed) 
        :
        todoNotes.filter((note) => note.projectId == id)
    return (
        <div>
            <Link to='/notes/create'>Create Note</Link>
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
                        <th>
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredNotes.map((todoNote) => 
                        <NoteItem 
                            todoNote={todoNote} 
                            deleteNote={deleteNote}
                        />)}
                </tbody>
            </table>
        </div>
    )
}

export default TodoNoteList