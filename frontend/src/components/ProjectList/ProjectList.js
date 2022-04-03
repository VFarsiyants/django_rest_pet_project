import './ProjectList.css';
import { Link } from 'react-router-dom';

const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>
                <Link to={`project_notes/${project.name}`}>{project.name}</Link>
            </td>
            <td>
                {project.repoLink}
            </td>
        </tr>
    )
}


const ProjectList = ({ projects }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Repo link
                    </th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} />)}
            </tbody>
        </table>
    )
}

export default ProjectList