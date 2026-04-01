import { Code, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full transition hover:shadow-lg">
      <img 
        // Logic to grab the image from the backend if it's a local upload
        src={project.image?.startsWith('/uploads') 
          ? `http://localhost:5000${project.image}` 
          : (project.image || "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop")
        } 
        alt={project.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 flex-1 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map(tech => (
            <span key={tech} className="text-xs font-semibold px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">
              <Code size={16} className="mr-1" /> Code
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">
              <ExternalLink size={16} className="mr-1" /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}