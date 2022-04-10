import './ProjectList.css';
import { Link } from 'react-router-dom';

const ProjectItem = ({ project, deleteProject }) => {
    return (
            <tr>
                <td>
                    <Link to={`${project.id}`}>{project.name}</Link>
                </td>
                <td>
                    {project.repoLink}
                </td>
                <td>
                    <button 
                        type='button'
                        className='project_delete_btn'
                        onClick={() => deleteProject(project.id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
    )
}


const ProjectList = ({ projects, deleteProject }) => {
    return (
        <section>
        <Link to='/projects/create'>Create Project</Link>
        <table>
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Repo link
                    </th>
                    <th className='project_delete_btn'>
                        Delete
                    </th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem 
                    project={project} 
                    deleteProject={deleteProject}/>)}
            </tbody>
        </table>
        </section>
    )
}

export default ProjectList